const ham = $('#js-hamburger');
const nav = $('#js-nav');
const navItems = $('.nav-items__item a');

ham.on('click', function () {
    ham.toggleClass('active');
    nav.toggleClass('active');
});

navItems.on('click', function () {
    ham.removeClass('active');
    nav.removeClass('active');
});

document.addEventListener('scroll', function() {
    var nav = document.getElementById('sp-header');
    var img = document.getElementById('nav-logo');
    var programSection = document.getElementById('program');
    var programSectionTop = programSection.offsetTop;
    var programSectionBottom = programSectionTop + programSection.offsetHeight;

    if (window.scrollY >= programSectionTop && window.scrollY < programSectionBottom) {
        nav.classList.add('inverted');
        img.src = 'img/header/logo_white_2.png';
    } else {
        nav.classList.remove('inverted');
        img.src = 'img/header/logo_black_3.png';
    }
});
