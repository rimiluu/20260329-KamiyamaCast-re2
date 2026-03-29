<?php
// データベース接続情報を含むファイルをインクルード
include 'db.php';

try {
    // メッセージの取得
    $stmt = $pdo->query("SELECT id, radio_name, program_name, message, audio, timestamp FROM messages ORDER BY timestamp DESC");
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // エラーハンドリング
    echo 'Connection failed: ' . $e->getMessage();
    exit;
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>投稿一覧</title>
</head>
<body>
    <h1>投稿一覧</h1>
    <?php if (empty($messages)): ?>
        <p>メッセージがありません。</p>
    <?php else: ?>
        <table border="1">
            <tr>
                <th>ラジオネーム</th>
                <th>番組名</th>
                <th>メッセージ</th>
                <th>日付</th>
            </tr>
            <?php foreach ($messages as $message): ?>
                <tr>
                    <td><?php echo htmlspecialchars($message['radio_name'], ENT_QUOTES, 'UTF-8'); ?></td>
                    <td><?php echo htmlspecialchars($message['program_name'], ENT_QUOTES, 'UTF-8'); ?></td>
                    <td><?php echo htmlspecialchars($message['message'], ENT_QUOTES, 'UTF-8'); ?>
                        <!-- 音声ファイルがある場合にオーディオプレーヤーを表示 -->
                        <?php if (!empty($message['audio'])): ?>
                            <audio controls>
                                <source src="<?php echo htmlspecialchars($message['audio'], ENT_QUOTES, 'UTF-8'); ?>" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        <?php endif; ?>
                    </td>
                    <td><?php echo htmlspecialchars($message['timestamp'], ENT_QUOTES, 'UTF-8'); ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif; ?>
</body>
</html>
