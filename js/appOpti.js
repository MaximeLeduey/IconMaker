
// fonction qui crée le nombre de pixels sur lesquels on compte dessiner 

function createPixels(number) {
    let pixel = '<div class="pixel"></div>';
    let pixels = '';
    for( let i = 0; i<= number; i++) {
        pixels += pixel;
    }
    $('.app-screen').append(pixels);
};
 

// fonction qui choisit la couleur en prenant la classe du bouton sur lequel on clique, par défault, la couleur la plus à gauche est séléctionnée 
// au clic sur un pixel, celui-ci se fait ajouter la classe de la couleur choisie,

// let test = $('#paint_darkestgreen').attr('class').split(" ");
// console.log(test);


function colorChoiceAndDraw() {

    // on sélectionne tous les boutons

    let buttons =  $('.app-tools').children().not('.reset').not('.export');

    // on défini la couleur initiale, pour cela on met dans une variable la classe du bouton de couleur
    // par défault ( bouton le plus à gauche ), puis on utilise la méthode split pour séparer les mots de l'attribut classe

    let defaultColor = $('.app-tools').children().first().attr("class").split(" ");

    // si on reste sur la couleur initiale et qu'on clique sur un pixel, il prend donc la couleur initiale
    // en ajoutant à sa classe le deuxième mot de la classe du bouton

    $('.pixel').click(function(){
        $(this).attr("class", `pixel ${defaultColor[1]}`);
    }); 

    // on change de couleur au clic sur un des boutons de couleur

    buttons.click(function(){

        // au clic sur un des boutons couleur, on enlève la classe "is-active" à tous les boutons

        buttons.removeClass('is-active');

        // on ajoute la classe "is-active" au bouton de la couleur choisie

        $(this).addClass('is-active');

        // on enregistre la nouvelle couleur dans une variable, pour cela,
        // on utilise donc la methode split pour récuperer les différents mots que l'attribut classe contient,
        // sous forme d'un tableau

        var color = $(this).attr("class").split(" ");

        // au clic sur un pixel, on lui ajoute à sa classe le deuxième mot de la classe du bouton couleur choisi, c'est à dire
        // le nom de la couleur

        $('.pixel').click(function(){
            $(this).attr("class", `pixel ${color[1]}`);
        });       
    })
};


// fonction qui, au double clic, remet la classe "pixel" au pixel pour qu'il redevienne à son état initial

function deleteOne() {
    $('.pixel').dblclick(function(){
        $(this).attr("class", "pixel");
    });  
};

// fonction qui, au clic sur le bouton reset, redonne l'etat initial à tous les pixels en leur redonnant leur classes initiales,
// et remet la couleur initiale sur la couleur la plus à gauche

function resetDraw() {
    $('.reset').click(function(){
        $('.pixel').attr("class", "pixel");
        $('.app-tools').children().not('.reset').not('.export').removeClass('is-active');
        $('.app-tools').children().first().addClass('is-active');

        // on appelle cette fonction pour que la couleur revienne à la couleur initiale

        colorChoiceAndDraw();
    });
};

// fonction qui, au clic sur le bouton export, crée une image à partir de la div qui a l'identifiant #content,
// puis la télécharge

function exportDraw() {
    let exp = $('#export');
    exp.click(function(){
        domtoimage.toJpeg(document.getElementById('content'))
        .then(function(dataUrl){
            let link = document.createElement('a');
            link.download = 'image.jpeg';
            link.href = dataUrl;
            link.click();
        });
    });
};


// fonction qui s'assure que le dom soit chargé avant d'executer les fonctions

$(function(){
    createPixels(1024);
    colorChoiceAndDraw();
    deleteOne();
    resetDraw();
    exportDraw();
    
});


