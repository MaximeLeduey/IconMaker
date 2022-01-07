// -----------------------------------------------------------
// Votre code ici
// -----------------------------------------------------------

// on s'assure que le dom soit chargé avant d'executer


function createPixels(number) {
    let pixel = '<div class="pixel"></div>';
    let pixels = '';
    for( let i = 0; i<= number; i++) {
        pixels += pixel;
    }
    $('.app-screen').append(pixels);
};


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


function resetDraw() {
    $('.reset').click(function(){
        $('.pixel').attr("class", "pixel");
    });
};

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


$(function(){
    createPixels(1024);
    colorChoiceAndDraw();
    resetDraw();
    exportDraw();
});


