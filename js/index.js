$(document).ready(function () {
    $('form.addname').submit(function () {
        var $this = $(this);
        $.post($this.prop('action'),$this.serialize());
    });
});
