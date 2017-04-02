import _ from "lodash";
import React from "react";

import {
  UndefinedVariable,
  InvalidScope,
  InexistingPicture
} from "./errors";

import Group from "../pictures/group";

import primitives from "../pictures/primitives";
import evaluate from "./evaluate";
import parameters from "./parameters";

const isPrimitive = _.curry(_.has)(primitives);

export function specToSVG({ type, params, children }, key) {
  const childrenElems = children ? children.map((child, index) => {
    return specToSVG(child, index);
  }) : [];
  if (type === "group") {
    const transform = `translate(${ params.x || 0}, ${ params.y || 0 })`;
    return (
      <Group key={key} children={childrenElems} transform={transform} />
    )
  } else {
    return primitives[type].draw(params, key);
  }
}

export function buildPictureSpec(pictures, pictureName, params={}) {

  const picture = pictures.get(pictureName);

  const children = picture.get("subpicturesOrder").reverse().map((subpictureId) => {

    const subpicture = picture.getIn(["subpictures", subpictureId]);
    const override = subpicture.get("override").toJS();
    const subpictureName = subpicture.get("picture");
    const scopeName = subpicture.get("scope");
    const scopes = getScopes(params, scopeName);
    const paramsCollection = parameters(override, params, scopes);
    const children = paramsCollection.map((params) => {
      if (isPrimitive(subpictureName)) {
        const primitivePicture = primitives[subpictureName].picture;
        const { variables } = evaluate(primitivePicture, params);
        const combinedParams = _.assign({}, params, variables);
        return {
          type: subpictureName,
          params: combinedParams
        };
      } else if (pictures.has(subpictureName)) {
        const picture = pictures.get(subpictureName);
        const { variables } = evaluate(picture, params);
        const combinedParams = _.assign({}, params, variables);
        return buildPictureSpec(pictures, subpictureName, combinedParams);
      } else {
        throw new InexistingPicture({ name: subpictureName });
      }
    });

    return {
      type: "group",
      subpicture: subpictureId,
      params: {},
      children
    };

  }).toJS();

  return {
    type: "group",
    picture: pictureName,
    params,
    children
  };
}

function getScopes(variables, scopeName) {

  if (scopeName == null) {
    return [];
  } else if (!_.has(variables, scopeName)) {
    throw new UndefinedVariable({ name: scopeName });
  }

  const scopes = variables[scopeName];

  if (!_.isArray(scopes)) {
    throw new InvalidScope({
      name: scopeName,
      type: typeof scopes
    });
  }

  return scopes;
}
