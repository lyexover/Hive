import SocketTest from '@/components/testIO'
import Header from '@/components/main/rooms/Header'
import { auth } from '../../../../../auth'



export default async function roomPage({params}){

    const {roomID} = await params
    const {user}= await auth()


    return (

        <div>
          <Header roomID={roomID} userID={user.id} />
          {roomID}
        </div>

    )
}