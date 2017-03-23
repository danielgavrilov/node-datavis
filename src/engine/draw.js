import _ from "lodash";

import {
  UndefinedVariable,
  InvalidScope,
  InexistingPicture
} from "./errors";

import primitives from "../primitives";
import evaluate from "./evaluate";
import parameters from "./parameters";


export default function draw(pictures, pictureName, params) {

  if (_.has(primitives, pictureName)) {
    return {
      picture: pictureName,
      params
    }
  } else if (!pictures.has(pictureName)) {
    throw new InexistingPicture({ name: pictureName });
  }

  const picture = pictures.get(pictureName);

  // evaluate variables

  const { variables } = evaluate(picture, { variables: params });

  // then pass variables on to create pictures

  return picture.get("pictures").map((picture) => {

    const override = picture.get("override").toJS();
    const pictureName = picture.get("picture");
    const scopeName = picture.get("scope");
    const scopes = getScopes(variables, scopeName);
    const paramsCollection = parameters(override, variables, scopes);

    const children = paramsCollection.map((params) => {
      return draw(pictures, pictureName, params);
    });

    return {
      picture: pictureName,
      children
    }

  });
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
