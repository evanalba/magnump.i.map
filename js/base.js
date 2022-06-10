$(document).ready(function() {
    $('.credits').click(function() {
        $('.credits-box').show();
        $(this).hide();
    });

    $('.close-credits').click(function() {
        $('.credits-box').hide();
        $('.credits').show();
    });
});