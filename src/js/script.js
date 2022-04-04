$(document).ready(function() {
    $('[data-modal=consultation]').on('click', function() {
        $('#overlay, #consultation').fadeIn('slow');
    });
    $('.modal_close').on('click', function() {
        $('#overlay, #consultation').fadeOut('slow');
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required"
            },
            messages: {
                name: {
                    required: "Введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Введите свой номер телефона"
            }
        });
    };

    valideForms('#modalfill');

    $('input[name=phone]').mask("+48 999999999");

    
    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#overlay').fadeOut();

            $('form').trigger('reset');
        });
        return false;
    });

    new WOW().init();
});

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    });
});

