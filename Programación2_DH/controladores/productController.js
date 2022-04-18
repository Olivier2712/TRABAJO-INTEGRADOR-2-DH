const productos = require("../data/productos");
 
const productController = {
    index: function(req,res){res.render('product',{producto: productos})},
    add: function(req,res){res.render('product-add',)},
    resultadosBusqueda: function(req,res){res.render('search-results')}
}
   
    module.exports = productController;