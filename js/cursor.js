document.addEventListener("DOMContentLoaded", function() {
    var cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    // Function to move custom cursor
    document.addEventListener("mousemove", function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Function to hide cursor on iframe hover
    var iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(iframe) {
        iframe.addEventListener("mouseenter", function() {
            cursor.classList.add("hide-cursor");
        });
        iframe.addEventListener("mouseleave", function() {
            cursor.classList.remove("hide-cursor");
        });
    });

    var programSection = document.getElementById('program');

    // Function to change cursor color when hovering over program section
    programSection.addEventListener('mouseenter', function() {
        cursor.style.backgroundColor = '#fffffc'; // Change cursor background color to white
    });

    programSection.addEventListener('mouseleave', function() {
        cursor.style.backgroundColor = '#080505'; // Change cursor background color to black
    });
});
