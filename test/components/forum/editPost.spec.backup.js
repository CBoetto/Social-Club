// import React from "react";
// import { shallow } from "enzyme";
// import { MockedProvider } from 'react-apollo/test-utils'
// import EditPost, { EDIT_POST_MUTATION, DELETE_POST_MUTATION } from "../../client/components/forum/editPost";

//     /*
//       declare the token variable in a scope accessible
//       by the entire test suite
//     */
//    let token;

//    beforeAll((done) => {
//      request(app)
//        .post('/graphql')
//        .send({
//          username: 'test',
//          password: '123',
//        })
//        .end((err, response) => {
//          token = response.body.token; // save the token!
//          done();
//        });
//    });
 



// describe('<EditPost />', () => {
//     it('should render loading state initially', () => {

//         const deletePost = {
//             deletePost: [1]
//         }

//         const editPost = {
//             editPost: [1]
//         }

//         const mocks = [
//             {
//                 request: {
//                     query: DELETE_POST_MUTATION,
//                     variables: { id: 1 },
//                 },
//                 result: {
//                     data: { deletePost }
//                 }
//             },
//             {
//                 request: {
//                     query: EDIT_POST_MUTATION,
//                     variables: { id: 1, content: 'hello there'}
//                 },
//                 response: {
//                     data: { editPost }
//                 }
//             },
//         ];

//         const wrapper = mount(
//             <MockedProvider mocks={mocks} addTypename={false}>
//                 <EditPost />
//             </MockedProvider>,
//         );

//         // find the button and simulate a click
//         wrapper.find('.mutation-button').at(0).simulate('click');

//         const tree = wrapper.toJSON();
//         expect(tree.children).toContain('Loading...');
//     });
// })
