import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import wait from 'waait'
import configureMockStore from "redux-mock-store";
import { MockedProvider } from 'react-apollo/test-utils';
import Login, { LOGIN_MUTATION } from "../../../client/components/auth/login";
import { watchFile } from "fs";
import { ApolloClient } from 'apollo-client';
import { client } from '../../../server/index'

const mockStore = configureMockStore();
const store = mockStore({});

describe("Testpage Component", () => {
    it("should render without throwing an error", () => {
        const loginTest = shallow(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(loginTest).toMatchSnapshot()
    });
    it('should render loading state initially', async () => {
        const loginUser = { userName: 'test', id: '10' };
        const mocks = [
            {
                request: {
                    query: LOGIN_MUTATION,
                    variables: { userName: 'test', password: '123' },
                },
                    result: { data: { login: { id: '10', userName: 'test' } } },
            },
        ];

        const wrapper = mount(
        <Provider store={store} >
            <MockedProvider client={mocks} addTypename={false}>
                <Login />
            </MockedProvider>
        </Provider>,
        );

        wrapper.find('#userNameForm').simulate('change', { target: { value: 'test'}})
        wrapper.find('#passwordForm').simulate('change', { target: { value: '123'}})


        // find the inputs and simulate change in value;

        // find the button and simulate a click
        wrapper.find('.mutation-button').simulate('click');

        await wait(0); // wait for the response


    });
});