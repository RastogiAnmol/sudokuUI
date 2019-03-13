import React from "react";
import ShowLoaderComponent from "./showLoader";
import Adapter from "enzyme-adapter-react-14";
import { shallow, mount, render, configure } from "enzyme";
configure({ adapter: new Adapter() });
describe("ShowLoaderComponent", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ShowLoaderComponent debug />);
    expect(component).toMatchSnapshot();
  });
});
