import {useState, FormEvent} from 'react'
import { GetServerSideProps } from 'next'
import {getSession} from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './styles.module.scss'
import {FiPlus, FiCalendar, FiEdit2, FiTrash, FiX } from 'react-icons/fi'
import {format} from 'date-fns'

import { db } from '../../services/firebase'

type TaskList ={
    id:string;
    created:string | Date;
    createdFormated?:string;
    tarefa:string;
    userId:string;
    name:string
}
interface TaskProps{
    user:{
        id:string;
        name:string
    }
    data:string;

}

export default function Task({user, data}: TaskProps){

   const [input, setInput] = useState('')
   const [taskList, setTaskList] = useState<TaskList[ ]>(JSON.parse(data))
   const [taskEdit, setTaskEdit] = useState<TaskList | null>(null)


    async function handleAddTask(e: FormEvent){
        e.preventDefault()
        
        if(input ===""){
            alert("Escreva sua tarefa!")
            return
        }

        if(taskEdit){
            await db.collection('tarefas')
            .doc(taskEdit.id)
            .update({
                tarefa: input
            })
            .then(()=>{
                let data = taskList
                let taskIndex = taskList.findIndex(item => item.id === taskEdit.id)
                data[taskIndex].tarefa = input

                setTaskList(data)
                setTaskEdit(null)
                setInput("")
            })
            
            return;
        }

        await db.collection('tarefas')
        .add({
            created: new Date(),
            tarefa: input,
            userId: user.id,
            name: user.name
        })
        .then((doc: any)=>{
            console.log('Sua tarefa foi cadastrada!')
            let data ={
                id: doc.id,
                created:new Date(),
                createdFormated: format(new Date(), 'dd MMMM yyyy'),
                tarefa: input,
                userId: user.id,
                name:user.name
            };

            setTaskList([...taskList, data]);
            setInput("") 
        })
        .catch((err: any)=>{
            console.log("Erro ao Cadastrar:", err)
        })
    }

    async function handleDelete(id: string){
        await db.collection('tarefas').doc(id)
        .delete()
        .then(()=>{
            let taskDeleted = taskList.filter(item =>{
                return (item.id !== id)
            })

            setTaskList(taskDeleted)
        })
        .catch((error) =>{
            console.log(error)
        })
        
    }

    async function handleEdit(task: TaskList){
        setTaskEdit(task)
        setInput(task.tarefa)

    }

    function handleCancelEdit(){
        setInput('')
        setTaskEdit(null)
    }


    return(
       <>
       <Head>
        <title>Suas Tarefas</title>
       </Head>
       <main className={styles.taskContainer}>
            {taskEdit && (
                <span className={styles.editText}>
                    <button onClick={handleCancelEdit}>
                    <FiX size={30} color="#FF3636"/>
                    </button>
                    VOCÊ ESTÁ EDITANDO UMA TAREFA!
                </span>
            )}
            <form onSubmit={handleAddTask}>
                <input type="text" placeholder='Digite sua tarefa...' value={input} onChange={ (e) => setInput(e.target.value)}/>
                <button type="submit"><FiPlus size={25} color="#17181f"/></button>
            </form>

            <h1>Você tem {taskList.length} {taskList.length === 1? 'tarefa': "tarefas"}</h1>

            <div className="section">
                {taskList.map(task =>(
                    <article key={task.id} className={styles.taskList}>
                        <Link href={`/task/${task.id}`}>
                            <p>{task.tarefa}</p>
                        </Link>
                        <div className={styles.taskButtons}>
                            <div>
                                <div>
                                    <FiCalendar size={20} color="#2de93d"/>
                                    <time>{task.createdFormated}</time>
                                </div>
                                    <button onClick={() => handleEdit(task)}>
                                        <FiEdit2 size={20} color="#3a86ff;"/>
                                        <span>Editar</span>
                                    </button>
                            </div>
                                <button onClick={() => handleDelete(task.id)}>
                                    <FiTrash size={20} color="#FF3636"/>
                                    <span>Excluir</span>
                                </button>
                        </div>
                    </article>
                ))}
                 
            </div>
       </main>
       </>
    
)}


export const getServerSideProps: GetServerSideProps = async ({req}) =>{
   const session = await getSession({req})
   
   console.log(session)

   if(!session){
    return{
        redirect:{
            destination:"/",
            permanent:false,
        },
    }
   }

   const tasks = await db.collection('tarefas').where('name', '==', session?.user.name)
   .orderBy('created', 'asc').get()

   const data = JSON.stringify(tasks.docs.map(doc =>{
    return {
        id: doc.id,
        createdFormated: format(doc.data().created.toDate(), 'dd MMMM yyyy'),
        ...doc.data()
    }
   }))

   console.log(data)
   const user ={
    name: session?.user.name,
    id: null
   }
    return{
        props:{user, data}
    }
}