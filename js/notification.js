window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('notification')) {
        const notification = document.getElementById('notification');
        notification.style.display = 'block';

        setTimeout(function() {
            notification.classList.add('hide');
        }, 1000); // 1秒後にフェードアウト開始

        setTimeout(function() {
            notification.style.display = 'none';
        }, 2000); // 2秒後に完全に非表示
    }
};
