const validarQueryCategoriaProduto = (req, res, next) => {
    let { categoria_id } = req.query;
    if (!categoria_id) {
        return next()
    }
    if (typeof categoria_id == 'string') {
        categoria_id = [categoria_id]
    }
    req.produtoFiltro = categoria_id
    return next()
}

module.exports = {
    validarQueryCategoriaProduto
};