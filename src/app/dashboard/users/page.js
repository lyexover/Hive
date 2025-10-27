
import AddUsers from "@/components/main/AddUsers";



export default async function UsersPage(props){

    const searchParams = await props.searchParams;
    const query = searchParams?.search || '';


    return (
        <>
            <h2>Users</h2>
            <AddUsers query={query}/>
        </>
    )
}