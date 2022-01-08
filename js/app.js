// -----------------------------------------------------------
// Votre code ici
// -----------------------------------------------------------




// on crée le nombre de pixels sur lesquels on compte dessiner 

function createPixels(number) {
    let pixel = '<div class="pixel"></div>';
    let pixels = '';
    for( let i = 0; i<= number; i++) {
        pixels += pixel;
    }
    $('.app-screen').append(pixels);
};
 

// on choisit la couleur en prenant la classe du bouton sur lequel on clique, par défault, la couleur la plus à gauche est séléctionnée 
// au clic sur un pixel, celui-ci se fait ajouter la classe de la couleur choisie,
// au double clic, on enlève cette classe au pixel pour qu'il redevienne à son état initial

function colorChoiceAndDraw() {
    let buttons =  $('.app-tools').children().not('.reset').not('.export');
    let defaultButton = $('.app-tools').children().first();
    defaultButton.removeClass('is-active');
    defaultButton.removeClass('swatch');
    let defaultColor = $('.app-tools').children().first().attr("class");
    defaultButton.addClass('is-active');
    defaultButton.addClass('swatch');
    $('.pixel').click(function(){
        $(this).attr("class", `pixel ${defaultColor}`);
    }); 
    $('.pixel').dblclick(function(){
        $(this).removeClass(defaultColor);
    }); 
    buttons.click(function(){
        buttons.removeClass('is-active');
        buttons.removeClass('swatch');
        let color = $(this).attr("class");
        buttons.addClass('swatch');
        $(this).addClass('is-active');
        $('.pixel').click(function(){
            $(this).attr("class", `pixel ${color}`);
        });     
        $('.pixel').dblclick(function(){
            $(this).removeClass(color);
        });     
    })
};


// au clic sur le bouton reset, on redonne l'etat initial à tous les pixels en leur redonnant leur classes initiales


function resetDraw() {
    $('.reset').click(function(){
        $('.pixel').attr("class", "pixel");
    });
};

// au clic sur le bouton export, on crée une image à partir de la div qui a l'identifiant #content,
// puis on la télécharge

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


// on s'assure que le dom soit chargé avant d'executer les fonctions

$(function(){
    createPixels(1024);
    colorChoiceAndDraw();
    resetDraw();
    exportDraw();
});


