# lojaMagica
Grupo: Valentina, Lara e Pedro Costa
Turma 2AM
 
As informações necessárias estão nos seguintes arquivos:
1. Banco de dados = backend/lojaMagicaBD
2. API e server = backend/server.js


Pacotes Node utilizados: cors, dotenv, express, mysql2, nodemon


As explicações sobre cada rota está nos comentários do server.js. Segue abaixo exemplos de como utilizar as APIs.

Rota de adicionar usuário:
    Método: POST
    Rota: http://localhost:3006/usuario/cadastrar
    Body: "{
        "name": "Valentina",
        "email": "exemplo@gmail.com",
        "password": "senhaForte"
    }"

Rota de fazer login de usuário:
    Método: POST
    Rota: http://localhost:3006/usuario/login
    Body: "{
        "email": "exemplo@gmail.com",
        "password": "senhaForte"
    }"

Rota de listar usuários:
    Método: GET
    Rota: http://localhost:3006/usuario/listar

Rota de editar usuário:
    Método: PUT
    Rota: http://localhost:3006/usuario/editar/1
    Body: "{
        "name": "Lara"
    }"

Rota de deletar usuário:
    Método: DELETE
    Rota: http://localhost:3006/usuario/delete/1
    Body:

Rota de adicionar produto:
    Método: POST
    Rota: http://localhost:3006/produto/cadastrar
    Body: "{
        "nome": "Flor",
        "descricao": "Uma flor para alegrar seu dia!",
        "valor": 10,
        "src": "/assets/flor.png"
    }"

Rota de listar produtos:
    Método: GET
    Rota: http://localhost:3006/produto/listar

Rota de editar produto:
    Método: PUT
    Rota: http://localhost:3006/produto/editar/1
    Body: "{
        "valor": 5
    }"

Rota de deletar produto:
    Método: DELETE
    Rota: http://localhost:3006/produto/delete/1

Rota de adicionar produto ao carrinho:
    Método: POST
    Rota: http://localhost:3006/usuario/1/carrinho
    Body: "{
        "produto":1,
        "quantidade": 2
    }"

Rota de remover produto do carrinho:
    Método: DELETE
    Rota: http://localhost:3006/usuario/1/carrinho/deletar
    Body: "{
        "produto":1
    }"

Rota de adicionar produto aos favoritos:
    Método: POST
    Rota: http://localhost:3006/usuario/1/favorito
    Body: "{
        "produto": 1
    }"

Rota de remover produto dos favoritos:
    Método: DELETE
    Rota: http://localhost:3006/usuario/1/favoritos/deletar
    Body: "{
        "produto": 1
    }"