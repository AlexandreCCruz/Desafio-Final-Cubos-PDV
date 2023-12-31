const knex = require('../conexao')

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    if (cpf.length != 11) {
        return res.status(400).json("Deve ser informado um cpf válido");
    }

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

const editarDadosCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    const { id } = req.params;
    const { idEncontrado } = req

    try {

        const atualizarCliente = await knex("clientes").where({ id })
            .update({
                nome: nome || idEncontrado.nome,
                email: email || idEncontrado.email,
                cpf: cpf || idEncontrado.cpf,
                cep: cep || idEncontrado.cep,
                rua: rua || idEncontrado.rua,
                numero: numero || idEncontrado.numero,
                bairro: bairro || idEncontrado.bairro,
                cidade: cidade || idEncontrado.cidade,
                estado: estado || idEncontrado.estado
            }).returning('*')
        return res.status(200).json(atualizarCliente);
    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({ mensagem: "Erro na atualização" });
    }
}

const listarClientes = async (req, res) => {
    clientes = await knex('clientes')
    return res.status(200).json(clientes);
}

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const clienteEncontrado = await knex('clientes').where({ id }).first();

        if (!clienteEncontrado) {
            return res.status(404).json("Não existe um cliente para o id informado");
        }
        return res.status(200).json(clienteEncontrado);
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    cadastrarCliente,
    editarDadosCliente,
    listarClientes,
    detalharCliente
}