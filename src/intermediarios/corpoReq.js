
function validarCorpoRequisicao(schema) {
    return async function (req, res, next) {
        try {
            await schema.validateAsync(req.body)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json(error.message)
        }
        next();
    }
}

module.exports = validarCorpoRequisicao