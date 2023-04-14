import { gql } from "@apollo/client";

export const GET_BLOGPOSTS = gql`
  {
    blogPosts {
      id
      text
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($text: String) {
    updateTask(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const DELETE_BLOGPOST = gql`
  mutation DeleteBlogPost($id: String) {
    deleteBlogPost(id: $id) {
      id 
      text
    }
  }
`

export const EDIT_BLOGPOST = gql`
  mutation EditBlogPost($id: String, $text: String) {
    editBlogPost(id: $id, text: $text) {
      id 
      text
    }
  }
`