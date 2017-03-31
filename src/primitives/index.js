import React from "react";

import createPrimitive from "./create-primitive";

import rect from "./rect";
import circle from "./circle";

export default {
  "rect": createPrimitive(rect),
  "circle": createPrimitive(circle)
}
