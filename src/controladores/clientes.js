const knex = require('../conexao')

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const emailEncontrado = await knex("clientes").where({ email }).first();

        if (emailEncontrado) {
            return res.status(400).json("O email já existe");
        }

        const cpfEncontrado = await knex("clientes").where({ cpf }).first();

        if (cpfEncontrado) {
            return res.status(400).json("Já existe um cliente com cpf informado");
        }

        const cliente = await knex("clientes")
            .insert({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            }).returning("*");

        if (!cliente) {
            return res.status(400).json("O cliente não foi cadastrado.");
        }

        return res.status(200).json(cliente[0]);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message);
    }
}

const alterarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    const { id } = req.params;

    try {
        const idEncontrado = await knex("clientes").where({ id }).first();
        if (!idEncontrado) {
            return res.status(404).json("Não existe um cliente para o id informado");
        }
        await knex("clientes").where({ id })
            .update({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            })
        return res.status(200).json("Cliente Atualizado com Sucesso!")
    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({ mensagem: "Erro na atualização" })
    }
}

const listarClientes = async (req, res) => {
    clientes = await knex('clientes')
    return res.status(200).json(clientes);
}

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    const clienteEncontrado = await knex('clientes').where({ id }).first();

    if (!clienteEncontrado) {
        return res.status(404).json("Não existe um cliente para o id informado");
    }
    return res.status(200).json(clienteEncontrado)
}

module.exports = {
    cadastrarCliente,
    alterarCliente,
    listarClientes,
    detalharCliente
}