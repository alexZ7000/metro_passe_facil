import CounterButton from "@components/CounterButton";
import React from "react";
import renderer from "react-test-renderer";

describe("CounterButton Component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<CounterButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
