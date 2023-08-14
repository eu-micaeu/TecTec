-- Cria a tabela Usuário
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nickname TEXT NOT NULL,
	senha TEXT NOT NULL,
    telefone TEXT NOT NULL,
    data_nasc TIMESTAMP NOT NULL,
    tecnologia TEXT NOT NULL
);

-- Cria a tabela Tecnologia
CREATE TABLE tecnologia (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    ano INTEGER NOT NULL,
    finalidade TEXT NOT NULL,
    criadores TEXT NOT NULL
);

-- Cria a tabela Postagem
CREATE TABLE postagem (
    id SERIAL PRIMARY KEY,
    texto TEXT NOT NULL,
    data_post TIMESTAMP NOT NULL,
    curtidas INTEGER NOT NULL,
    usuario_id INTEGER REFERENCES usuario(id)
);

-- Cria a tabela Comentário
CREATE TABLE comentario (
    id SERIAL PRIMARY KEY,
    texto TEXT NOT NULL,
    data_post TIMESTAMP NOT NULL,
    curtidas INTEGER NOT NULL,
    postagem_id INTEGER REFERENCES postagem(id)
);

-- Cria a tabela Sessão
CREATE TABLE sessao (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuario(id),
    data_entrada TIMESTAMP NOT NULL,
    data_saida TIMESTAMP
);

