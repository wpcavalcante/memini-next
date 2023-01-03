import { GetServerSideProps } from "next"
import {getSession} from 'next-auth/react'
import { db } from "../../services/firebase"
import {format} from 'date-fns'
import styles from './detail.module.scss'
import Head from "next/head"
import {FiPlus, FiCalendar, FiEdit2, FiTrash, FiX } from 'react-icons/fi'

type Detail ={
    id:string;
    created: string | Date;
    createdFormated?:string;
    tarefa:string;
    userId:string;
    name:string;
}

interface TaskDetail {
    data:string
}

export default function TaskID({data}: TaskDetail){

    const detail = JSON.parse(data) as Detail


    return(
        <>
    <Head>
        <title>Sua Tarefa</title>
    </Head>
    <article className={styles.container}>
        <div className={styles.detail}>
            <div>
                <FiCalendar size={30} color="#FFF"/>
                <span>Sua Tarefa</span>
                <time>{detail.createdFormated}</time>
            </div>
        </div>
        <p>{detail.tarefa}</p>
    </article>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async({req,params})=>{
    const {id} = params;
    const session = await getSession({req})

   if(!session){
    return{
        redirect:{
            destination: '/task',
            permanent:false,

        }
    }
   }


   const data = await db.collection('tarefas')
   .doc(String(id))
   .get()
   .then((snapshot) =>{
    const data ={
        id:snapshot.id,
        created:snapshot.data().created,
        createdFormated: format(snapshot.data().created.toDate(), 'dd MMMM yyyy'),
        tarefa: snapshot.data().tarefa,
        userId: snapshot.data().userId,
        name: snapshot.data().name
    }

    return JSON.stringify(data)
   })

    return{
        props:{
            data
        }
    }
}