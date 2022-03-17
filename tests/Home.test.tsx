import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import Input from "../components/forms/Input";
import Home from "./../pages";
import passwordValidation from "../helpers/passwordValidation";

describe("Test in <Input/>", () => {
  test("Should render Input", () => {
    const pass = passwordValidation("$mArt_158192");

    expect(pass).toBe(true);
  });
});
