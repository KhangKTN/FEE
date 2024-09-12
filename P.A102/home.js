$(document).ready(function () {
    // html elements

    var necessaryRadio = $('input[name="necessary-radio"]');
    var form = $('#form');

    form.on('submit', function (e) {
        e.preventDefault();

        // reset invalid message before submit
        $('.necessary-message').hide();

        var invalid = false;

        var countNecessaryRadioChecked = necessaryRadio.filter(function () {
            return $(this).is(':checked');
        }).length;

        // console.log(countNecessaryRadioChecked);

        if (countNecessaryRadioChecked <= 0) {
            $('.necessary-message').show();
            invalid = true;
        }

        if (!invalid) {
            window.location.href = 'create.html';
        }
    });
});
