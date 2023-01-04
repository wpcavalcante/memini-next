
# Memini
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/wpcavalcante/memini-next/blob/main/license) 

# Sobre o projeto

https://memini-next.vercel.app/

Memini é um todo app desenvolvido com React, NextJS e Typescript. Com a aplicação você pode cadastrar uma atividade, editar e excluir. As informações da atividade são guardadas em um banco de dados Firebase e as atividades são filtradas por usuário. A aplicação também utiliza o NextAuth para realizar o login via GitHub do usuário e sua autenticação.




## Layout

### Home com descrição do app e instruções de como utilizá-lo
![Web 1](https://github.com/wpcavalcante/Assets/blob/main/mem1.png)

### Header antes de logar com o GitHub. Nessa aplicação é necessário estar logado para poder cadastrar uma tarefa. Se um usuário não logado tentar acessar o menu de tarefas, ele será direcionado de volta a home.
![Web 2](https://github.com/wpcavalcante/Assets/blob/main/mem2.png)

### Header Logado
![Web 3](https://github.com/wpcavalcante/Assets/blob/main/mem3.png)

### Página de tarefas. Quando logado, o usuário pode cadastrar tarefas, editá-las e excluí-las da forma que quiser.
![Web 4](https://github.com/wpcavalcante/Assets/blob/main/mem4.png)

### Tarefas cadastradas. As tarefas tem id único e quando cadastradas são jogadas no bando de dados do Firebase, limitando os usuários a só poderem acessar suas próprias tarefas.
![Web 5](https://github.com/wpcavalcante/Assets/blob/main/mem5.png)

### Botão de editar tarefa ativado. O valor da tarefa e mandado por input permitindo o usuário editá-la a bel-prazer
![Web 6](https://github.com/wpcavalcante/Assets/blob/main/mem6.png)

### A tarefa "Estudar programação" é substituida por "Estudar React" quando editado
![Web 7](https://github.com/wpcavalcante/Assets/blob/main/mem7.png)




# Tecnologias utilizadas


- ReactJS
- NextJS
- NextAuth
- Typescript
- SASS
- Firebase



# Criador

Willian Cavalcante

https://www.linkedin.com/in/willian-cavalcante-b51482157/
