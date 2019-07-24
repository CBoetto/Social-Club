import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Auth from "../../../client/components/auth/auth";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Testpage Component", () => {
    it("should render without throwing an error", () => {
        const authTest = shallow(
            <Provider store={store}>
                <Auth />
            </Provider>
        );
        expect(authTest).toMatchSnapshot()
    });
});