const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Definições das opções do Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de E-commerce',
        version: '1.0.0',
        description: 'Documentação da API de E-commerce',
      },
      servers: [
        {
          url: 'http://localhost:3006', // Atualize conforme necessário
        },
      ],
      components: {
        schemas: {
          Usuario: {
            type: 'object',
            required: ['name', 'email', 'password', 'cpf_number'],
            properties: {
              id: {
                type: 'integer',
                description: 'ID do usuário',
                example: 1,
              },
              name: {
                type: 'string',
                description: 'Nome do usuário',
                example: 'João Silva',
              },
              email: {
                type: 'string',
                description: 'Email do usuário',
                example: 'joao@example.com',
              },
              password: {
                type: 'string',
                description: 'Senha do usuário',
                example: 'senha123',
              },
              cpf_number: {
                type: 'string',
                description: 'CPF do usuário',
                example: '123.456.789-00',
              },
            },
          },
          Produto: {
            type: 'object',
            required: ['nome', 'descricao', 'valor', 'file'],
            properties: {
              id: {
                type: 'integer',
                description: 'ID do produto',
                example: 1,
              },
              nome: {
                type: 'string',
                description: 'Nome do produto',
                example: 'Camiseta',
              },
              descricao: {
                type: 'string',
                description: 'Descrição do produto',
                example: 'Camiseta de algodão',
              },
              valor: {
                type: 'number',
                description: 'Valor do produto',
                example: 49.99,
              },
              src: {
                type: 'string',
                description: 'Caminho da imagem do produto',
                example: 'caminho/para/imagem.jpg',
              },
            },
          },
          Carrinho: {
            type: 'object',
            required: ['idUsuario', 'idProduto', 'quantidade'],
            properties: {
              id: {
                type: 'integer',
                description: 'ID do item no carrinho',
                example: 1,
              },
              idUsuario: {
                type: 'integer',
                description: 'ID do usuário',
                example: 1,
              },
              idProduto: {
                type: 'integer',
                description: 'ID do produto',
                example: 2,
              },
              quantidade: {
                type: 'integer',
                description: 'Quantidade do produto no carrinho',
                example: 3,
              },
            },
          },
          Favorito: {
            type: 'object',
            required: ['idUsuario', 'idProduto'],
            properties: {
              id: {
                type: 'integer',
                description: 'ID do favorito',
                example: 1,
              },
              idUsuario: {
                type: 'integer',
                description: 'ID do usuário',
                example: 1,
              },
              idProduto: {
                type: 'integer',
                description: 'ID do produto',
                example: 2,
              },
            },
          },
        },
      },
      tags: [
        {
          name: 'Usuários',
          description: 'Operações relacionadas a usuários',
        },
        {
          name: 'Produtos',
          description: 'Operações relacionadas a produtos',
        },
        {
          name: 'Carrinho',
          description: 'Operações relacionadas ao carrinho de compras',
        },
        {
          name: 'Favoritos',
          description: 'Operações relacionadas aos favoritos',
        },
      ],
    },
    apis: ['./swagger.js'], // Caminho para as anotações Swagger neste arquivo
  };

// Inicializa o Swagger JSDoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Função para configurar o Swagger no Express
function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;


 /**
  * @swagger
  * /usuario/cadastrar:
  *   post:
  *     summary: Cadastrar um novo usuário
  *     tags: [Usuários]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Usuario'
  *     responses:
  *       201:
  *         description: Usuário cadastrado com sucesso
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                 message:
  *                   type: string
  *                 data:
  *                   type: object
  *       400:
  *         description: Erro no cadastro do usuário
  */

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro no login
 */

/**
 * @swagger
 * /usuario/listar:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro ao listar usuários
 */

/**
 * @swagger
 * /usuario/editar:
 *   put:
 *     summary: Editar um usuário existente
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro ao atualizar usuário
 */

/**
 * @swagger
 * /usuario/delete/{id}:
 *   delete:
 *     summary: Deletar um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro ao deletar usuário
 */

/**
 * @swagger
 * /produto/cadastrar:
 *   post:
 *     summary: Cadastrar um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - valor
 *               - file
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               valor:
 *                 type: number
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro no cadastro do produto
 */

/**
 * @swagger
 * /produto/listar:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro ao listar produtos
 */

/**
 * @swagger
 * /produto/editar:
 *   put:
 *     summary: Editar um produto existente
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - valor
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               valor:
 *                 type: number
 *               file:
 *                 type: string
 *                 format: binary
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro ao atualizar produto
 */

/**
 * @swagger
 * /produto/delete/{idProduto}:
 *   delete:
 *     summary: Deletar um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: idProduto
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto a ser deletado
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro ao deletar produto
 */

/**
 * @swagger
 * /usuario/carrinho:
 *   post:
 *     summary: Adicionar um item ao carrinho
 *     tags: [Carrinho]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - idProduto
 *               - quantidade
 *             properties:
 *               idUsuario:
 *                 type: integer
 *               idProduto:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item adicionado ao carrinho com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro ao adicionar item ao carrinho
 */

/**
 * @swagger
 * /carrinho/listar/{idUsuario}:
 *   get:
 *     summary: Lista os itens do carrinho de um usuário
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de itens no carrinho
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idProduto:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   descricao:
 *                     type: string
 *                   valor:
 *                     type: number
 *                   src:
 *                     type: string
 *                   quantidade:
 *                     type: integer
 *       400:
 *         description: Erro ao listar itens do carrinho
 */

/**
 * @swagger
 * /usuario/carrinho/deletar:
 *   delete:
 *     summary: Remover um item do carrinho
 *     tags: [Carrinho]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - idProduto
 *             properties:
 *               idUsuario:
 *                 type: integer
 *               idProduto:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item removido do carrinho com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro ao remover item do carrinho
 */

/**
 * @swagger
 * /favoritos/adicionar:
 *   post:
 *     summary: Adicionar um produto aos favoritos
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - idProduto
 *             properties:
 *               idUsuario:
 *                 type: integer
 *               idProduto:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto adicionado aos favoritos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro ao adicionar produto aos favoritos
 */

/**
 * @swagger
 * /favoritos/deletar:
 *   delete:
 *     summary: Remover um produto dos favoritos
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - idProduto
 *             properties:
 *               idUsuario:
 *                 type: integer
 *               idProduto:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto removido dos favoritos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro ao remover produto dos favoritos
 *       404:
 *         description: Produto não encontrado nos favoritos
 */

/**
 * @swagger
 * /favoritos/verificar/{idUsuario}/{idProduto}:
 *   get:
 *     summary: Verificar se um produto está nos favoritos de um usuário
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *       - in: path
 *         name: idProduto
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Resultado da verificação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 favoritado:
 *                   type: boolean
 *       400:
 *         description: Erro na verificação
 */

/**
 * @swagger
 * /favoritos/listar/{idUsuario}:
 *   get:
 *     summary: Lista os produtos favoritos de um usuário
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de produtos favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro ao listar produtos favoritos
 */
