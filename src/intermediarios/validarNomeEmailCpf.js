const knex = require('../conexao')

const validaNome = async (req, res, next) => {
    const nome = req.body.nome;
    if (!nome || nome.length <= 1) {
        return res.status(400).json({ mensagem: "Nome inválido" })
    }
    return next();
}

const validaEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ mensagem: "E-mail inválido" })
        }

        function verificaEmail(email) {
            const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return regexEmail.test(email);
        }

        if (verificaEmail(email)) {
            return next();
        }
        return res.status(400).json({ mensagem: "E-mail inválido" })
    } catch (erro) {
        console.log(erro.mensagem)
        return res.status(400).json({ mensagem: "E-mail inválido" })

    }
}

const validaCPF = async (req, res, next) => {
    const cpf = req.body.cpf;

    let result;
    function verificaCPF(cpf) {
        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const cpfSemPontuacao = cpf.length === 11 ? true : false;

        result = regexCpf.test(cpf) || cpfSemPontuacao;

        return result;
    }

    if (verificaCPF(cpf)) {
        next();
    } else {
        res.status(400).json({ mensagem: "CPF inválido" });
    }
}

const nomeEmailCpfExiste = async (req, res, next) => {
    const { nome, email, cpf } = req.body;
    const { id } = req.params;

    try {

        const clienteExiste = await knex('clientes').where('id', id);

        if (clienteExiste.length < 1) {
            return res.status(404).json({ mensagem: "Acesso negado" })
        }

        //Proibir atualização do nome, email e cpf.
        //if (clienteExiste[0].nome == nome &&
        //    clienteExiste[0].email == email &&
        //    clienteExiste[0].cpf == cpf) {
        //    return next();
        //} else {
        //    return res.status(404).json({ mensagem: "Acesso negado" })
        // }
        return next();


    } catch (erro) {
        console.log(erro.mensagem);
        return res.status(500).json({ mensagem: "erro my friend" })
    }
}


module.exports = { validaNome, validaEmail, validaCPF, nomeEmailCpfExiste }
