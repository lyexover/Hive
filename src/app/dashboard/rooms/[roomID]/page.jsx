import SocketTest from '@/components/testIO'
import Header from '@/components/main/rooms/Header'
import { auth } from '../../../../../auth'
import { fetchNotes } from '@/lib/db/rooms'
import Notes from '@/components/main/rooms/Notes'
import styles from'@/css-modules/main/rooms.module.css'
import Tasks from '@/components/main/rooms/Tasks'


export default async function roomPage({params}){

    const {roomID} = await params
    const {user}= await auth()

    const notes = await fetchNotes(roomID)
    

    return (

        <div className={styles.roomContainer}>
          <Header roomID={roomID} userID={user.id} />
          <Notes initialNotes={notes} roomID={roomID} userID={user.id} />
          <Tasks/>
        </div>

    )
}