import UseFetch from "../hooks/useFetch";

export default function postList() {
    
    const { data: posts, isLoading } = UseFetch('/posts');

    if (isLoading) return <div>Loading...</div>

    return(
        <ul>
            {posts.map((posts) => (
                <li key={posts.id}>{posts.title}</li>
            ))}
        </ul>
    )
}