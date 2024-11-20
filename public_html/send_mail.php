<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // フォームから送信されたデータを取得し、サニタイズ
    $name = strip_tags(trim($_POST["name"]));
    $furigana = strip_tags(trim($_POST["furigana"])); // フリガナを追加
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $inquiry_type = strip_tags(trim($_POST["inquiry_type"])); // お問い合わせ種別を追加
    $message = strip_tags(trim($_POST["message"]));

    // 必須項目のチェック
    if (empty($name) OR empty($furigana) OR empty($inquiry_type) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "入力内容を確認してください。";
        exit;
    }

    // メールの送信先
    $recipient = "contact@sea-side-dot.com";

    // メールの内容
    $email_content = "名前: $name\n";
    $email_content .= "フリガナ: $furigana\n"; // フリガナを追加
    $email_content .= "メール: $email\n";
    $email_content .= "お問い合わせ種別: $inquiry_type\n\n"; // お問い合わせ種別を追加
    $email_content .= "メッセージ:\n$message\n";

    // メールヘッダー（UTF-8を指定）
    $email_headers = "From: $name <$email>\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "Content-Transfer-Encoding: 8bit\r\n";

    // メール送信の処理
    if (mail($recipient, "=?UTF-8?B?".base64_encode("お問い合わせ: $inquiry_type")."?=", $email_content, $email_headers)) {
        http_response_code(200);
        echo "メッセージが送信されました。ありがとうございます。";
    } else {
        http_response_code(500);
        echo "メッセージの送信中にエラーが発生しました。";
    }
} else {
    http_response_code(403);
    echo "問題が発生しました。もう一度お試しください。";
}
