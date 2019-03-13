import React from "react";
import Adapter from "enzyme-adapter-react-14";
import { shallow, mount, render, configure } from "enzyme";
import SudokuGenerator from "./sudokuGenerator";
configure({ adapter: new Adapter() });

describe("Test SudokuGenerator", () => {
  it("should not be null", () => {
    expect(SudokuGenerator.randomBoard).not.toBeNull();
  });
  it("should return a function", () => {
    expect(SudokuGenerator.randomBoard).isObject;
  });
});
