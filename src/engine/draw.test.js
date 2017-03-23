import draw from "./draw";

it("should draw a single primitive", () => {
  const params = {
    x: 0,
    y: 0,
    width: 50,
    height: 50
  };
  expect(draw([], "rect", params)).toEqual({
    picture: "rect",
    params
  });
});

it("should draw a primitive in a picture", () => {

});

it("should draw a primitives from scope in a picture", () => {

});

it("should draw nested pictures", () => {
  
});
