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
  cadastrarClientes,
  alterarClientes,
} = require("./controladores/clientes");

const login = require("./controladores/login");
const verificaUsuarioLogado = require("./intermediarios/validarLogin");
const { schemaCorpoUsuario } = require("./schemas/usuarios");

const {
  cadastrarProdutos,
  listarProdutos,
  detalharProduto,
  excluirProduto,
  atualizarProduto,
} = require("./controladores/produtos");

const { validarQueryCategoriaProduto } = require("./intermediarios/produtos");

const {
  validaCPF,
  validaEmail,
  validaNome,
  nomeEmailCpfExiste,
} = require("./intermediarios/validarNomeEmailCpf");

const { schemaCorpoProdutos } = require("./schemas/produtos");

rotas.post(
  "/usuario",
  validarCorpoRequisicao(schemaCorpoUsuario),
  cadastrarUsuario
);

rotas.post("/login", login);

rotas.get("/categoria", listarCategorias);

rotas.use(verificaUsuarioLogado);

rotas.get("/usuario", detalharPerfilUsuario);

rotas.put(
  "/usuario",
  validarCorpoRequisicao(schemaCorpoUsuario),
  atualizarPerfilUsuario
);

rotas.post(
  "/produto",
  validarCorpoRequisicao(schemaCorpoProdutos),
  cadastrarProdutos
);

rotas.get("/produto/:id", detalharProduto);

rotas.put("/produto/:id", atualizarProduto);

rotas.delete("/produto/:id", excluirProduto);

rotas.get("/produto", validarQueryCategoriaProduto, listarProdutos);

rotas.put(
  "/cliente/:id",
  validaNome,
  validaEmail,
  validaCPF,
  nomeEmailCpfExiste,
  alterarClientes
);

rotas.post("/cliente", validaNome, validaEmail, validaCPF, cadastrarClientes);

module.exports = rotas;
