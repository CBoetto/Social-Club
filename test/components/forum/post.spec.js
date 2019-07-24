import React from "react";
import { shallow } from "enzyme";
import Post from "../../../client/components/forum/post";
import { MockedProvider } from 'react-apollo/test-utils'


const postProp = {
    content: 'hello there',
    user: {
        id: 1
    }
}

const userProp = 1


describe('<Post />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(
            <Post post={postProp} />
        );
        expect(wrapper.prop('post')).toEqual(postProp)
    });
    it('should render one <li>', () => {
        const wrapper = shallow(
            <Post post={postProp} />
        );
        expect(wrapper.find('li')).toHaveLength(1);
    });
    it('should not render <button> if userId does not match post id', () => {
        const wrapper = shallow(
            <Post post={postProp} />
        );
        expect(wrapper.find('button')).toHaveLength(0);
    });
    it('should render <button> if userId DOES match post id', () => {
        const wrapper = shallow(
            <Post post={postProp} userId={userProp} />
        );
        expect(wrapper.find('button')).toHaveLength(1);
    })
    it('should render <EditPost /> if the edit button is clicked', () => {
        const wrapper = mount(
            <MockedProvider mocks={[]}>
                <Post post={postProp} userId={userProp} />
            </MockedProvider>
        );
        wrapper.find('button').simulate('click');
        expect(wrapper.find('EditPost')).toHaveLength(1);
    })

})
