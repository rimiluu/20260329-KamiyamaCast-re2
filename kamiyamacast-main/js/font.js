document.addEventListener("DOMContentLoaded", function() {
  var loadingScreen = document.getElementById('loadingScreen');
  var content = document.getElementById('content');

  // ローディング画面を表示
  loadingScreen.style.display = 'flex';

  // フォントAPIの読み込み完了を待つ
  var config = {
    kitId: 'osb6pzf',
    scriptTimeout: 3000,
    async: true,
    active: function() {
      // フェードアウト開始
      loadingScreen.style.opacity = '0';

      // フェードアウト完了後にローディング画面を隠す
      setTimeout(function() {
        loadingScreen.style.display = 'none';
        content.style.display = 'block';
      }, 1000); // 1秒間のフェードアウト期間
    }
  };

  // Typekitをロード
  (function(d) {
    var tk = d.createElement('script');
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
    tk.async = true;
    tk.onload = function() {
      try {
        Typekit.load(config);
      } catch (e) {}
    };
    d.head.appendChild(tk);
  })(document);
});
