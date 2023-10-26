CREATE DATABASE pdv

CREATE TABLE usuarios(
  id SERIAL PRIMARY KEY,
  nome TEXT,
  email TEXT UNIQUE,
  senha TEXT
);

CREATE TABLE categorias(
  id SERIAL PRIMARY KEY,
  descricao TEXT
)


INSERT INTO 
categorias (descricao)
VALUES 
('Informática'), ('Celulares'), ('Beleza e Perfumaria'), ('Mercado'), 
('Livros e Papelaria'), ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');