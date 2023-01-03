import Link from 'next/link'
import styles from './styles.module.scss'
import LoginButton from '../LoginButton'


export default function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.headerNav}>
                <Link href="/">
                <img src="/images/headerLogo.png" alt="Logo do Site" />
                </Link>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/task">Suas Tarefas</Link>
                </nav>
                </div>

                <LoginButton/>
            </div>
        </header>
    )
}