const express = require("express");
const rotas = express();
const validarCorpoRequisicao = require("./intermediarios/corpoReq");

const {
  cadastrarUsuario,
  detalharPerfilUsuario,
  atualizarPerfilUsuario,
} = require("./controladores/usuario");

const { listarCategorias } = require("./controladores/categorias");

const login = require("./controladores/login");
const verificaUsuarioLogado = require("./intermediarios/validarLogin");
const { schemaCorpoUsuario } = require("./schemas/usuario");

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

module.exports = rotas;
