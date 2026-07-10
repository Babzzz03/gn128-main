when mails are sent. i want it to redirect to the page previuos page: <?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name    = htmlspecialchars($_POST['name']);
    $email   = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $project = htmlspecialchars($_POST['project']);
    $message = nl2br(htmlspecialchars($_POST['message']));

    if (!$email) {
        die("Invalid email address");
    }

    $to = "csofficer@gn128.com";
    $subject = "New Contact Form – $project";

    $body = "
    <html>
    <body>
        <h2>GN128 Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p> 
        <p><strong>Project:</strong> $project</p>
        <p><strong>Message:</strong><br>$message</p>
    </body>
    </html>
    ";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: GN128 Website <no-reply@gn128.com>\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully!');</script>";
    } else {
        echo "<script>alert('Something is not right. Pls try again later.');</script>";
    }
}
?>