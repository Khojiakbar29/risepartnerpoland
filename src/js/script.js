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

// Calculator
// Calc for UBER 
const resultUber = document.querySelector('.calculating__resultUber span');
const taxResultUber = document.querySelector('.calculating__uberTax span');
let beforeTaxesUber, incomeUber, cashUber;
let finalUber = 0;

function calcUber() {
    if (beforeTaxesUber && incomeUber) {
        taxResultUber.textContent = (beforeTaxesUber * 0.04);
        resultUber.textContent = ((incomeUber - cashUber) - (beforeTaxesUber * 0.04));
        finalUber = ((incomeUber - cashUber) - (beforeTaxesUber * 0.04));
    } else if (!beforeTaxesUber || !incomeUber || !cashUber) {
        resultUber.textContent = "_____";
        return;
    }
}

calcUber();

function getResultUber(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        switch(input.getAttribute('id')) {
            case 'beforeTaxesUber':
                beforeTaxesUber =+ input.value;
                break;
            case 'incomeUber':
                incomeUber =+ input.value;
                break;
            case 'cashUber':
                cashUber =+ input.value;
                break;
        }
        calcUber();
        calcTotal();
    });


}

getResultUber('#beforeTaxesUber');
getResultUber('#incomeUber');
getResultUber('#cashUber');

// Calc for Bolt 
const resultBolt = document.querySelector('.calculating__resultBolt span');
const taxResultBolt = document.querySelector('.calculating__boltTax span');
let beforeTaxesBolt, incomeBolt, cashBolt;
let finalBolt = 0;

function calcBolt() {
    if (beforeTaxesBolt && incomeBolt) {
        taxResultBolt.textContent = (beforeTaxesBolt * 0.04);
        resultBolt.textContent = ((incomeBolt - cashBolt) - (beforeTaxesBolt * 0.04));
        finalBolt = ((incomeBolt - cashBolt) - (beforeTaxesBolt * 0.04));
    } else if (!beforeTaxesBolt || !incomeBolt || !cashBolt) {
        resultBolt.textContent = "___";
        return;
    }
}

calcBolt();

function getResultBolt(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        switch(input.getAttribute('id')) {
            case 'beforeTaxesBolt':
                beforeTaxesBolt =+ input.value;
                break;
            case 'incomeBolt':
                incomeBolt =+ input.value;
                break;
            case 'cashBolt':
                cashBolt =+ input.value;
                break;
        }
        calcBolt();
        calcTotal();
    });


}

getResultBolt('#beforeTaxesBolt');
getResultBolt('#incomeBolt');
getResultBolt('#cashBolt');

// Calc for FreeNow 
const resultFreeNow = document.querySelector('.calculating__resultFreeNow span');
const taxResultFreeNow = document.querySelector('.calculating__freenowTax span');
let commissionFreeNow, incomeFreenow, cashFreeNow;
let finalFreeNow = 0;

function calcFreenow() {
    if (incomeFreenow && commissionFreeNow) {
        taxResultFreeNow.textContent = (incomeFreenow * 0.08);
        resultFreeNow.textContent = ((incomeFreenow - cashFreeNow - commissionFreeNow) - (incomeFreenow * 0.08));
        finalFreeNow = ((incomeFreenow - cashFreeNow - commissionFreeNow) - (incomeFreenow * 0.08));
    } else if (!incomeFreenow || !commissionFreeNow || !cashFreeNow) {
        resultFreeNow.textContent = "_____";
        return;
    }
}

calcFreenow();

function getResultFreenow(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        switch(input.getAttribute('id')) {
            case 'commissionFreeNow':
                commissionFreeNow =+ input.value;
                break;
            case 'incomeFreenow':
                incomeFreenow =+ input.value;
                break;
            case 'cashFreeNow':
                cashFreeNow =+ input.value;
                break;
        }
        calcFreenow();
        calcTotal();
    });


}

getResultFreenow('#commissionFreeNow');
getResultFreenow('#incomeFreenow');
getResultFreenow('#cashFreeNow');

//Calc Total
const resultTotal = document.querySelector('.calculating__resultTotal span');

function calcTotal() {
    if (finalBolt || finalUber || finalFreeNow) {
        resultTotal.textContent = (finalBolt + finalUber + finalFreeNow - 50);
    } else if (!finalBolt && !finalUber && !finalFreeNow) {
        resultTotal.textContent = "____";
        return;
    }
}

calcTotal();