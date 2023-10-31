const knex = require('../conexao')


const cadastrarClientes = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        await knex('clientes')
            .insert({
                nome,
                email,
                cpf,
                cep: cep || null,
                rua: rua || null,
                numero: numero || null,
                bairro: bairro || null,
                cidade: cidade || null,
                estado: estado || null
            }).debug();

        let objetoFormatado = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }

        return res.status(200).json(objetoFormatado)
    } catch (erro) {
        return res.status(400).json(erro.message)
    };
}

const alterarClientes = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    const { id } = req.params;
    console.log(numero);
    try {
        await knex('clientes').where('id', id)
            .update({
                nome: nome || null,
                email: email || null,
                cpf: cpf || null,
                cep: cep || null,
                rua: rua || null,
                numero: numero || null,
                bairro: bairro || null,
                cidade: cidade || null,
                estado: estado || null
            })
        return res.status(200).json("Cliente Atualizado com Sucesso!")
    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({ mensagem: "Erro na atualização" })
    }
}
module.exports = {
    cadastrarClientes, alterarClientes
}