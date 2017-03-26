import _ from "lodash";

import {
  UndefinedVariable,
  InvalidScope,
  InexistingPicture
} from "./errors";

import primitives from "../primitives";
import evaluate from "./evaluate";
import parameters from "./parameters";

const isPrimitive = _.curry(_.has)(primitives);

export function buildPictureSpec(pictures, pictureName, params={}) {

  if (isPrimitive(pictureName)) {
    return params;
  } else if (!pictures.has(pictureName)) {
    throw new InexistingPicture({ name: pictureName });
  }

  const picture = pictures.get(pictureName);

  // evaluate variables

  const { variables } = evaluate(picture, params);

  // then pass variables on to create pictures

  return picture.get("pictures").map((picture) => {

    const override = picture.get("override").toJS();
    const nestedPictureName = picture.get("picture");
    const scopeName = picture.get("scope");
    const scopes = getScopes(variables, scopeName);
    const paramsCollection = parameters(override, variables, scopes);
    const collection = paramsCollection.map((params) => {
      const prop = isPrimitive(nestedPictureName) ? "params" : "children";
      return {
        instance: nestedPictureName,
        [prop]: buildPictureSpec(pictures, nestedPictureName, params)
      };
    });

    return {
      picture: nestedPictureName,
      collection
    };

  }).toJS();
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
