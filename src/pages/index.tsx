import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/styles.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Memini - Lembre-se de Suas Tarefas!</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="./images/logo.png" alt="Ferramenta Board" />

        <section className={styles.hero}>
          <h1>Com o Memini, você pode salvar, editar e excluir qualquer tarefa que precise fazer no dia a dia!</h1>
  
          <p>Para começar, logue sua conta clicando no <span>botão do cabeçalho</span>!</p>
        </section>
        
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () =>{

  return{
    props:{
    },
    revalidate: 60 * 60 * 24
  }
}