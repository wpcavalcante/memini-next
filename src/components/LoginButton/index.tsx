import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./styles.module.scss"
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'

export default function LoginButton(){
 
    const{data: session} = useSession()

    
    return session ?(
        <button type="button" className={styles.loginButton} >

            <img src={session.user.image} alt="Foto do Usuário" />
            <span>Olá, {session.user.name}</span>
            <FiX className={styles.closeButton} onClick={() => signOut()}/>
            
        </button>
    ):(
        <button type="button" className={styles.loginButton} onClick={() => signIn('github')}>
        <FaGithub/>
        <span>Entrar com GitHub</span>
    </button>
    )
}