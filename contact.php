<?php
header('Content-Type: application/json; charset=utf-8');


// CORS dynamique
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = [
  'https://nstogo.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];
if (in_array($origin, $allowed, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: POST, OPTIONS");
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// Lire JSON
$input = json_decode(file_get_contents("php://input"), true);

$name    = trim($input["name"] ?? "");
$email   = trim($input["email"] ?? "");
$phone   = trim($input["phone"] ?? "");
$company = trim($input["company"] ?? "");
$message = trim($input["message"] ?? "");

if (!$name || !$email || !$message) {
  http_response_code(422);
  echo json_encode(["ok" => false, "message" => "Champs requis manquants"]);
  exit;
}

// PHPMailer
require __DIR__ . "/phpmailer/PHPMailer.php";
require __DIR__ . "/phpmailer/SMTP.php";
require __DIR__ . "/phpmailer/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
  $mail = new PHPMailer(true);

  // SMTP one.com
  $mail->isSMTP();
  $mail->Host       = 'send.one.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = 'contact@nstogo.com';        // adresse complète
  $mail->Password   = 'nstogo!!';     // <<< À REMPLACER
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL implicite
  $mail->Port       = 465;

  // Infos email
  $mail->CharSet = 'UTF-8';
  $mail->setFrom('contact@nstogo.com', 'Site NSTOGO');
  $mail->addAddress('contact@nstogo.com');        // destinataire
  $mail->addReplyTo($email, $name);

  // Contenu
  $mail->isHTML(true);
  $mail->Subject = "Nouveau message depuis le site NSTOGO";
  $mail->Body = "
    <h3>Nouveau message du site :</h3>
    <p><strong>Nom :</strong> $name</p>
    <p><strong>Email :</strong> $email</p>
    <p><strong>Téléphone :</strong> $phone</p>
    <p><strong>Entreprise :</strong> $company</p>
    <p><strong>Message :</strong><br>".nl2br($message)."</p>
  ";

  $mail->send();
  echo json_encode(["ok" => true]);

} catch (Exception $e) {
  error_log("Mailer error: ".$mail->ErrorInfo);
  http_response_code(500);
  echo json_encode(["ok" => false, "message" => "Erreur d’envoi"]);
}