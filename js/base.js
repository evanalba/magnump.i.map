$(document).ready(function () {
    $('.credits').click(function () {
        $('.credits-overlay').show();
        $('.credits-box').show();
        $(this).hide();
    });

    $('.close-credits').click(function () {
        $('.credits').show();
        $('.credits-overlay').hide();
        $('.credits-box').hide();
    });

    $('.side-panel-open').click(function () {
        $('.side-panel-close').show();
        $('.side-panel').hide();
    });

    $('.side-panel-close').click(function () {
        $('.side-panel').show();
        $(this).hide();
    });

    $('.side-panel-sliders').click(function () {
        if ($('.legend-panel').is(':visible')) {
            $('.place-panel').css('margin-top', '0em')
            $('.legend-panel').hide();
        } else {
            $('.place-panel').css('margin-top', '6.25em')
            $('.legend-panel').show();
        }
    });
});