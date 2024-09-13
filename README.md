# Instruções para execução local do projeto #
  - Faça o clone do projeto em sua máquina 
  `git clone git@github.com:johnatanivini/teste-brother-motos.git`
  - Acesse o diretorio app e execute o comando:
  `npm install`
  - Apos a instalação das dependencias execute o comando:
  `npm run start`

  # DEMO DO PROJETO #

   https://teste-brother-motos.vercel.app

  # Instruções via docker #
  ## Ainda em implementação ##
  - Caso deseje executar em ambiente docker com nginx, entre na raiz do projeto  e execute o comando 
  `docker compose up -d`  irá rodar em deamon

  - Caso queira ver os logs da aplicação execute:
  `docker logs app_todo <container_id>`

  - Caso queira parar a aplicação
  `docker compose down`
 
 # REQUISITOS #
  - Node  v21.7.3
  - ReactJs 13.4.0
  - Browser com suporte a Local Storage
  
  ## RECUSROS DA API ##

  ```javascript
    POST /atividade
    BODY 
    {
        "usuarioId": 1,
        "titulo": "Finalizar a documentação do projeto",
        "status": false
    }
    //Buscar todos os todos do usuario
    GET /atividade
    //Buscar todos especifico
    GET /atividade/1
    
    PUT /atividade/1
    {
        "userId": 1,
        "titulo": "Finalizar a documentação do projeto",
        "status": true
    }
    DELETE   /atividade/1
  ```

  ## User ##
  ```javascript
  GET   /usuario/1 HTTP/1.1
  POST   /usuario HTTP/1.1
  {
        "email": "johnatan.i@gmail.com",
        "senha": "12345",
        "nome": "John Doe"
  }
  PUT   /usuario/1 HTTP/1.1
   {
        "email": "johnatan.i@gmail.com",
        "senha": "12345",
        "nome": "John Doe"
  }
  //remove o usuário e toda lista relacionada
  DELETE   /usuario/1  HTTP/1.1
  ```


