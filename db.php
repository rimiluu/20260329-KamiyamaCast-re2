<?php
require __DIR__ . '/vendor/autoload.php'; // ファイルパスの確認

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 環境変数からデータベース接続情報を取得する
$servername = getenv('DB_SERVER');
$db_username = getenv('DB_USERNAME');
$db_password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $db_username, $db_password);
    // エラーモードを例外モードに設定
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "データベース接続成功";
} catch (PDOException $e) {
    die("データベース接続失敗: " . $e->getMessage());
}
?>
