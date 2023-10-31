const express = require("express");
const rotas = express();
const validarCorpoRequisicao = require("./intermediarios/corpoReq");

const {
  cadastrarUsuario,
  detalharPerfilUsuario,
  atualizarPerfilUsuario,
} = require("./controladores/usuarios");

const { listarCategorias } = require("./controladores/categorias");

<<<<<<< HEAD
const {
  cadastrarClientes,
  alterarClientes,
} = require("./controladores/clientes");
=======

const {
  cadastrarCliente,
  alterarCliente,
  listarClientes,
  detalharCliente
} = require("./controladores/clientes")
>>>>>>> 5a0783e273a9a5e5628cbcb1b5937aa0d28b7cfa

const login = require("./controladores/login");
const verificaUsuarioLogado = require("./intermediarios/validarLogin");
const { schemaCorpoUsuario } = require("./schemas/usuarios");
const { schemaCorpoProdutos } = require("./schemas/produtos");
const { schemaCorpoCliente } = require("./schemas/clientes");

const {
  cadastrarProdutos,
  listarProdutos,
  detalharProduto,
  excluirProduto,
  atualizarProduto,
} = require("./controladores/produtos");

const { validarQueryCategoriaProduto } = require("./intermediarios/produtos");

<<<<<<< HEAD
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
=======
rotas.post("/usuario", validarCorpoRequisicao(schemaCorpoUsuario), cadastrarUsuario);
>>>>>>> 5a0783e273a9a5e5628cbcb1b5937aa0d28b7cfa

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

<<<<<<< HEAD
rotas.put(
  "/cliente/:id",
  validaNome,
  validaEmail,
  validaCPF,
  nomeEmailCpfExiste,
  alterarClientes
);

rotas.post("/cliente", validaNome, validaEmail, validaCPF, cadastrarClientes);
=======
rotas.post("/cliente", validarCorpoRequisicao(schemaCorpoCliente), cadastrarCliente)

rotas.put("/cliente/:id", validarCorpoRequisicao(schemaCorpoCliente), alterarCliente)

rotas.get("/cliente", listarClientes)

rotas.get("/cliente/:id", detalharCliente)
>>>>>>> 5a0783e273a9a5e5628cbcb1b5937aa0d28b7cfa

module.exports = rotas;
