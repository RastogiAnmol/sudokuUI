import React from "react";
import MainPageComponent from "./MainPage";
import Adapter from "enzyme-adapter-react-14";
import { shallow, mount, render, configure } from "enzyme";
configure({ adapter: new Adapter() });
describe("MainPageComponent", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<MainPageComponent debug />);

    expect(component).toMatchSnapshot();
  });
});
