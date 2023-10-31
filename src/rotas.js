const express = require("express");
const rotas = express();
const validarCorpoRequisicao = require("./intermediarios/corpoReq");

const {
  cadastrarUsuario,
  detalharPerfilUsuario,
  atualizarPerfilUsuario,
} = require("./controladores/usuarios");

const { listarCategorias } = require("./controladores/categorias");


const {
  cadastrarCliente,
  alterarCliente,
  listarClientes,
  detalharCliente
} = require("./controladores/clientes")

const login = require("./controladores/login");
const verificaUsuarioLogado = require("./intermediarios/validarLogin");
const { schemaCorpoUsuario } = require("./schemas/usuarios");
const { schemaCorpoProdutos } = require("./schemas/produtos");
const { schemaCorpoCliente } = require("./schemas/clientes");

const {
  cadastrarProdutos,
  listarProdutos,
  detalharProduto
} = require("./controladores/produtos");

const {
  validarQueryCategoriaProduto
} = require('./intermediarios/produtos')

rotas.post("/usuario", validarCorpoRequisicao(schemaCorpoUsuario), cadastrarUsuario);

rotas.post("/login", login);

rotas.get("/categoria", listarCategorias);

rotas.use(verificaUsuarioLogado);

rotas.get("/usuario", detalharPerfilUsuario);

rotas.put("/usuario", validarCorpoRequisicao(schemaCorpoUsuario), atualizarPerfilUsuario);

rotas.post("/produto", validarCorpoRequisicao(schemaCorpoProdutos), cadastrarProdutos);

rotas.get("/produto/:id", detalharProduto)

rotas.get("/produto", validarQueryCategoriaProduto, listarProdutos);

rotas.post("/cliente", validarCorpoRequisicao(schemaCorpoCliente), cadastrarCliente)

rotas.put("/cliente/:id", validarCorpoRequisicao(schemaCorpoCliente), alterarCliente)

rotas.get("/cliente", listarClientes)

rotas.get("/cliente/:id", detalharCliente)

module.exports = rotas;
