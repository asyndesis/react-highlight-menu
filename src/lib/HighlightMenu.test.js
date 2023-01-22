import React from "react";
import HighlightMenu from "./HighlightMenu";
import renderer from "react-test-renderer";

describe("HighlightMenu", () => {
  it("renders properly", () => {
    const tree = renderer.create(<HighlightMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
