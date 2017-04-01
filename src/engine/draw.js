import _ from "lodash";

import {
  UndefinedVariable,
  InvalidScope,
  InexistingPicture
} from "./errors";

import primitives from "../pictures/primitives";
import evaluate from "./evaluate";
import parameters from "./parameters";

const isPrimitive = _.curry(_.has)(primitives);

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
        return { type: subpictureName, params };
      } else if (!pictures.has(subpictureName)) {
        throw new InexistingPicture({ name: subpictureName });
      } else {
        const picture = pictures.get(subpictureName);
        const { variables } = evaluate(picture, params);
        return buildPictureSpec(pictures, subpictureName, variables);
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
