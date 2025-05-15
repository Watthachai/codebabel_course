import UseFetch from "../hooks/useFetch";

export default function userList() {
    const { data: users, isLoading } = UseFetch('/users');

    if (isLoading) return <div>Loading..</div>

    return(
        <ul>
            {users.map((users) => (
                <li key={users.id}>{users.email}</li>
            ))}
        </ul>
    )

}