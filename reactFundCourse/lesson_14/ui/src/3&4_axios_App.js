import React from "react";
import PostList from "./3&4_axios_PostList";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL
export default function App() {

    return(
        
        <PostList></PostList>
    )
}