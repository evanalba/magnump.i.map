$(document).ready(function () {
    $('.credits').click(function () {
        $('.credits-overlay').show()
        $('.credits-box').show();
        $(this).hide();
    });

    $('.close-credits').click(function () {
        $('.credits-overlay').hide();
        $('.credits-box').hide();
        $('.credits').show();
    });
});