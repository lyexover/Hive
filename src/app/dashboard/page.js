import { auth } from '../../../auth'; // Adjust the path to your auth config

export default async function DashboardPage(){

    const session = await auth();
    console.log(session)

    return (
       <>
         dashboard
         
       </> 
    )
}