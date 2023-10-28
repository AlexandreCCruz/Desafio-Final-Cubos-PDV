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


CREATE TABLE produtos(
  id SERIAL PRIMARY KEY UNIQUE,
  descricao TEXT NOT NULL UNIQUE,
  quantidade_estoque INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  categoria_id INTEGER NOT NULL REFERENCES categorias (id)
);

CREATE TABLE clientes(
id SERIAL PRIMARY KEY UNIQUE,
nome text NOT NULL,
email TEXT  NOT NULL UNIQUE,
cpf CHAR(11) NOT NULL UNIQUE,
cep INTEGER,
rua TEXT,
numero INTEGER,
bairro TEXT,
cidade TEXT,
estado CHAR(2)
);