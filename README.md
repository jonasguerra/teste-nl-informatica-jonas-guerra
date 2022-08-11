## teste-nl-informatica-jonas-guerra
 Sistema web desenvolvido como teste técnico para a NL informática
 
 Requisitos:
 Pacote yarn instalado globalmente.
 
 Para rodar o projeto:
 
 ### Fazer o clone do repositório.
 
 ### Acessar a pasta nl-todo-backend e executar:
 - yarn install
 - yarn start
 
 ### Abrir outra janela do terminal e acessar nl-todo-fronent e executar:
 - yarn install
 - yarn start
 

#### Por padrão, todas as requests aparecem no console do navegador, é possível alterar esse comportamento modificando para "false" a variável "REACT_APP_SHOW_RESPONSES_IN_CONSOLE" no arquivo ".env" da pasta nl-todo-frontend.


Tecnologias utilizadas no backend:
NestJS, Typescript, JWT auth, SQLite3, TypeORM, arquivos de ambiente.

Tecnologias utilizadas no frontend:
ReactJS, Typescript, MaterialUI, axios, redux toolkit, styled-components, react-hook-form, middlewares, arquivos de ambiente, hooks, theme-provider, yup para validação de formulários.

Ps: Os arquivos de ambiente foram commitados com o projeto por não conterem nenhuma chave relevante.
