document.addEventListener("DOMContentLoaded", function() {
    const fadeInBlock = document.getElementById('fadeInBlock');
    setTimeout(() => {
      fadeInBlock.style.opacity = 1;
      fadeInBlock.style.transform = 'translateY(0)'; // 元の位置に移動
    }, 100);
  });
  