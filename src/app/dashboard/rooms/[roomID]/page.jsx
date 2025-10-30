import SocketTest from '@/components/testIO'

export default async function roomPage({params}){

    const {roomID} = await params



    return (

        <>
          {roomID}
          <SocketTest/>
        </>

    )
}