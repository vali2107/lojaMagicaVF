// Importar pacotes para a aplicação
const express = require('express');
const cors = require('cors');


// Definir a porta do express e instanciar o express
const port = 3006;
const app = express();

// Habilita o cors e json
app.use(express.json());
app.use(cors());

// Testar servidor
app.listen(port, () => console.log(`Rodando na porta ${port}`));

// Importar a conexão com o banco
const connection = require('./db_config')
const upload = require("./multer.js");

// Definir portas de usuário
app.post('/usuario/cadastrar', (req, res) => {
    let params = Array(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.cpf_number
    );
    let query = "INSERT INTO users(name, email, password, cpf_number) VALUES(?,?,?,?);";
    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});

app.post('/usuario/login', (req, res) => {
    let params = Array(
        req.body.email
    );    
    let query = "SELECT * FROM users WHERE email = ?;";

    connection.query(query, params, (err, results) => {
        if(results.length > 0) {
            let senhaDigitada = req.body.password;
            let senhaBanco = results[0].password;

            if (senhaDigitada === senhaBanco) {
                res
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results[0]
                })
            } else {
                res
                .status(400)
                .json({
                    success: false,
                    message: "Verifique sua senha!",
                })
            }
        } else {
            res
            .status(400)
            .json({
                success: false,
                message: "E-mail não cadastrado",
            })
        }
    })
});

app.get('/usuario/listar', (req, res) => {
    const query = "SELECT * FROM users";

    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});

app.put('/usuario/editar/:id', (req, res) => {
    let params = Array(
        req.body.name,
        req.params.id
    )
    let query = "UPDATE users SET name = ? WHERE id = ?";

    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});

app.delete('/usuario/delete/:id', (req, res) => {
    let params = Array(
        req.params.id
    )
    let query = "DELETE FROM users WHERE id = ?";

    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});

// Definir portas de produtos
// Cadastrar produto
app.post('/produto/cadastrar', upload.single('file'), (req, res) => {
    let params = Array(
        req.body.nome,
        req.body.descricao,
        req.body.valor,
        req.file.filename
    );
    
    let query = "INSERT INTO produtos(nome, descricao, valor, src) VALUES(?,?,?,?);";
    connection.query(query, params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});
// Listar produtos
app.use('/uploads', express.static(__dirname + '/public'))
app.get('/produto/listar', (req, res) => {
    const query = "SELECT * FROM produtos";

    connection.query(query, (err, results) => {
        if(results) {
            res
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});
// Editar produto
app.put('/produto/editar/:id', (req, res) => {
    let params = Array(
        req.body.valor,
        req.params.id
    )
    let query = "UPDATE produtos SET valor = ? WHERE id = ?";

    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});
// Deletar produto
app.delete('/produto/delete/:id', (req, res) => {
    let params = Array(
        req.params.id
    )
    let query = "DELETE FROM produtos WHERE id = ?";

    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});

// Definir portas de carrinho
// Adicionar no carrinho
app.post('/usuario/carrinho', (req, res) => {
    let params = Array(
        req.body.idUsuario,
        req.body.idProduto,
        req.body.quantidade
    );

    let query = "INSERT INTO carrinho(usuario, produto, quantidade) VALUES(?,?,?);";
    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});
// Listar carrinho
app.get('/carrinho/listar/:idUsuario', (req, res) => {
    let params = Array(
        req.params.idUsuario
    )
    const query = `
        SELECT 
            produtos.id AS idProduto, 
            produtos.nome, 
            produtos.descricao, 
            produtos.valor, 
            produtos.src, 
            carrinho.quantidade 
        FROM carrinho 
        JOIN produtos ON carrinho.produto = produtos.id 
        WHERE carrinho.usuario = ?;`;

    connection.query(query, params[0], (err, results) => {
        if(results) {
            res
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});
// Tirar do carrinho
app.delete('/usuario/carrinho/deletar', (req, res) => {
    let params = Array(
        req.body.idUsuario,
        req.body.idProduto
    )
    let query = "DELETE FROM carrinho WHERE usuario = ? AND produto = ?";

    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});

// Definir portas de favoritos
// Adicionar favoritos
app.post('/favoritos/adicionar', (req, res) => {
    let params = Array(
        req.body.idUsuario,
        req.body.idProduto,
    );

    let query = "INSERT INTO favoritos(usuario, produto) VALUES(?,?);";
    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});
// Tirar favoritos
app.delete('/favoritos/deletar', (req, res) => {
    let params = Array(
        req.body.idUsuario,
        req.body.idProduto
    )
    let query = "DELETE FROM favoritos WHERE usuario = ? AND produto = ?";

    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else if (err) {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        } else {
            res
                .status(404)
                .json({
                    sucess: false,
                    message: "Produto não encontrado nos favoritos",
                    data:results
                })

        }
    })
});
// Verificar se está nos favoritos
app.get('/favoritos/verificar/:idUsuario/:idProduto', (req, res) => {
    let params = Array(
        req.params.idUsuario,
        req.params.idProduto
    )
    const query = `
        SELECT * FROM favoritos WHERE usuario = ? AND produto = ?;`;

    connection.query(query, params, (err, results) => {
        if(results.length > 0) {
            res
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    favoritado: true,
                })
        } else if (err) {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        } else {
            res
                .status(200)
                .json({
                    success: true,
                    message: "Sem Sucesso",
                    favoritado: false
                })
        }
    })
});