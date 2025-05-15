import React, { useState, useEffect} from "react";
import axios from 'axios';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true)
            const { data } = await axios.get('/posts');

            setIsLoading(false)
            setPosts(data)
        }

        fetchPosts();
    }, [])

    if(isLoading) return <div>Loading...</div>
    return(
        {/*
            3. การใช้ useEffect และ useState เพื่อดึงข้อมูลจาก API

        */},
        
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    {post.title}
                </li>
            ))}
        </ul>
    );
}