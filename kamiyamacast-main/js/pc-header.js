document.addEventListener('scroll', function() {
    var nav = document.getElementById('nav');
    var cursor = document.getElementById('cursor');
    var img = document.getElementById('nav-logo');
    var programSection = document.getElementById('program');
    var programSectionTop = programSection.offsetTop;
    var programSectionBottom = programSectionTop + programSection.offsetHeight;

    if (window.scrollY >= programSectionTop && window.scrollY < programSectionBottom) {
        nav.classList.add('inverted');
        img.src = 'img/header/Podcast_logo_zentai_white.png';
    } else {
        nav.classList.remove('inverted');
        img.src = 'img/header/Podcast_logo_zentai_black.png';
    }
});