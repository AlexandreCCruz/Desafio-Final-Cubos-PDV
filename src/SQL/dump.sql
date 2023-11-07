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
  descricao TEXT NOT NULL,
  quantidade_estoque INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  categoria_id INTEGER NOT NULL REFERENCES categorias (id)
);

CREATE TABLE clientes(
  id SERIAL PRIMARY KEY UNIQUE,
  nome TEXT NOT NULL,
  email TEXT  NOT NULL UNIQUE,
  cpf CHAR(11) NOT NULL UNIQUE,
  cep INTEGER,
  rua TEXT,
  numero INTEGER,
  bairro TEXT,
  cidade TEXT,
  estado CHAR(2)
);

CREATE TABLE pedidos (
	id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id) NOT NULL,
  observacao TEXT,
  valor_total INTEGER NOT NULL
);

CREATE TABLE pedido_produto (
	id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(id) NOT NULL,
	produto_id INTEGER REFERENCES produtos(id) NOT NULL,
  quantidade_produto INTEGER NOT NULL,
  valor_produto INTEGER NOT NULL,
);

ALTER TABLE produtos 
ADD COLUMN produto_imagem TEXT;