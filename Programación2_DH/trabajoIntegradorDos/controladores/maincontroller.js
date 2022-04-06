const mainController = {
    index: function (req, res) {
      //let lista = ["Heroe1","Heroe2","Heroe3","Heroe4","Heroe5"]
      return res.render('index', {
        titulo: "succion de pene",
        autor: "Matias Quintana, Olivier Le Grass, El Tomi",
        
      });
    },
    creditos: function (req, res) {
      return res.render(
        "<p>Este es un sitio desarrollado por la comision 1 de programacion2 1 Semestre 2022</p>"
      );
    },
  };
  
  module.exports = mainController;