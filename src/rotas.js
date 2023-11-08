const express = require("express");
const rotas = express();
const validarCorpoRequisicao = require("./intermediarios/corpoReq");

const { listarCategorias } = require("./controladores/categorias");

const {
  cadastrarUsuario,
  detalharPerfilUsuario,
  atualizarPerfilUsuario,
} = require("./controladores/usuarios");

const {
  cadastrarProdutos,
  listarProdutos,
  detalharProduto,
  excluirProduto,
  editarDadosProduto,
} = require("./controladores/produtos");

const {
  cadastrarCliente,
  editarDadosCliente,
  listarClientes,
  detalharCliente,
} = require("./controladores/clientes");

const { validarEditarDadosCliente } = require("./intermediarios/clientes");

const login = require("./controladores/login");
const verificaUsuarioLogado = require("./intermediarios/validarLogin");
const { schemaCorpoUsuario } = require("./schemas/usuarios");
const { schemaCorpoProdutos } = require("./schemas/produtos");
const { schemaCorpoCliente } = require("./schemas/clientes");

const { validarQueryCategoriaProduto } = require("./intermediarios/produtos");
const multer = require("./intermediarios/multer");

rotas.post(
  "/usuario",
  validarCorpoRequisicao(schemaCorpoUsuario),
  cadastrarUsuario
);

rotas.post("/login", login);

rotas.use(verificaUsuarioLogado);

rotas.get("/categoria", listarCategorias);

rotas.get("/usuario", detalharPerfilUsuario);

rotas.put(
  "/usuario",
  validarCorpoRequisicao(schemaCorpoUsuario),
  atualizarPerfilUsuario
);

rotas.post(
  "/produto",
  multer.single("produto_imagem"),
  validarCorpoRequisicao(schemaCorpoProdutos),
  cadastrarProdutos
);
//validarCorpoRequisicao(schemaCorpoProdutos)
rotas.get("/produto/:id", detalharProduto);

rotas.get("/produto", validarQueryCategoriaProduto, listarProdutos);

rotas.put("/produto/:id", multer.single("produto_imagem"), editarDadosProduto);

rotas.delete("/produto/:id", excluirProduto);

rotas.post(
  "/cliente",
  validarCorpoRequisicao(schemaCorpoCliente),
  cadastrarCliente
);

rotas.put(
  "/cliente/:id",
  validarCorpoRequisicao(schemaCorpoCliente),
  validarEditarDadosCliente,
  editarDadosCliente
);

rotas.get("/cliente", listarClientes);

rotas.get("/cliente/:id", detalharCliente);

module.exports = rotas;
