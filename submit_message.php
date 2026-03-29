<?php
require 'db.php';  // Include the database connection

function writeLog($message) {
    $logFile = __DIR__ . '/error_log.txt';
    $timestamp = date('[Y-m-d H:i:s]');
    file_put_contents($logFile, "$timestamp $message\n", FILE_APPEND);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $radio_name = $_POST['radioName'];
    $program_name = $_POST['programName'];
    $message = $_POST['message'];
    $audio_path = "";  // Default empty path

    $cleanedMessage = preg_replace('/\s/u', '', $message);
    $totalChars = mb_strlen($cleanedMessage);

    // 全角・半角どちらの英数字もカウント
    preg_match_all('/[a-zA-Zａ-ｚＡ-Ｚ0-9０-９]/u', $cleanedMessage, $matches);
    $englishCount = count($matches[0]);

    $percentage = $totalChars > 0 ? ($englishCount / $totalChars) * 100 : 0;

    // ログ出力
    writeLog("TotalChars: $totalChars, EnglishCount: $englishCount, Percent: $percentage");

    // Check if a file was uploaded without errors
    if (isset($_FILES['audioFile']) && $_FILES['audioFile']['error'] == 0) {
        $file_tmp_path = $_FILES['audioFile']['tmp_name'];
        $file_extension = pathinfo($_FILES['audioFile']['name'], PATHINFO_EXTENSION); // Extract file extension

        // Create a file name based on the current date and time
        $new_file_name = date('YmdHis') . "." . $file_extension; // Format: YYYYMMDDHHMMSS
        $upload_path = 'uploads/' . $new_file_name;  // Update the path with the new file name
        
        // Move the file to the uploads directory
        if (move_uploaded_file($file_tmp_path, $upload_path)) {
            $audio_path = $upload_path;  // Update the file path on successful upload
        } else {
            echo "Failed to upload file.";
        }
    }

    // Insert data into the database
    try {
        if ($percentage <= 90) {
        $stmt = $pdo->prepare("INSERT INTO messages (radio_name, program_name, message, audio) VALUES (?, ?, ?, ?)");
        $stmt->execute([$radio_name, $program_name, $message, $audio_path]);
        }
        echo "Message successfully sent.";
        header("Location: index.html?notification=success");
        exit;
    } catch (PDOException $e) {
        echo "Database error: " . $e->getMessage();
    }
}
?>
