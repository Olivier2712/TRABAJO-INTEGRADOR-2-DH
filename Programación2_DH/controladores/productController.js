const productController = {
    index: function(req,res){res.render('product',)},
    add: function(req,res){res.render('product-add',)},
    resultadosBusqueda: function(req,res){res.render('search-results')}
}
    

    module.exports = productController;