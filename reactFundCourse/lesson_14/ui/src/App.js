import React from "react";

import PostList from "./api/postList";
import UserList from "./api/userList";
import axios from "axios";
import NoteApp from "./components/NoteApp";

axios.defaults.baseURL = process.env.REACT_APP_API_URL
export default function App() {

    return(
        <>
         <UserList></UserList>
         <PostList></PostList>
         <NoteApp></NoteApp>
        </>

    )
}