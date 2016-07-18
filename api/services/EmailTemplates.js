module.exports = {
    Confirmation(url, username) {
        return `
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html>
			<head>
			<meta http-equiv="Content-Type" content="text/html" charset="ISO-8859-1" />
			<title>Monitaure News</title>
			<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,400italic,500italic' rel='stylesheet' type='text/css'>
			</head>

			<style type="text/css">
			body { font-size: 16px}
			h1 {text-align:center; color:#52da6e; font-size: 1.5em; font-weight: 400; margin-bottom: 60px}
			.button {padding: 20px 30px; background-color: #52da6e; color: white; text-transform: uppercase; text-decoration: none; display: inline-block; text-align: center; margin-bottom: 60px; -webkit-border-radius: 4px;
			border-radius: 4px;}
			#content {text-align: center}
			#content p{text-align: justify; padding: 0 35px; color: #b2b2b2; margin-bottom: 60px; font-weight: 300; line-height: 1.5em}
			#footer {margin-bottom:40px; -webkit-border-radius: 0 0 10px 10px; border-radius: 0 0 10px 10px;}
			#footer td {text-align: center;}
			#footer td > img {margin-bottom: 40px;}
			#footer td > a {display: block; margin-bottom: 40px; text-decoration: none; color: #b2b2b2;}
			#footer ul {margin:0 0 40px; padding: 0; list-style: none; text-align: center}
			#footer ul li {margin:0; padding: 0; display: inline-block; padding: 0 5%}
			strong {font-size: 1em}
			#legal-bullshit{color:#cacaca; text-align: center; font-size: 0.8em; margin-bottom:40px}
			#legal-bullshit a{color:#cacaca; text-decoration: none}
			</style>

			<body bgcolor="#212121">

			<center>
				<table width="800" border="0" cellpadding="0" cellspacing="0" style="font-family: 'Roboto', Arial, Helvetica, sans-serif">
				<tr>
					<td>
					<table width="800" align="center" border="0" cellpadding="0" cellspacing="0">
						<tr>
						<td>
							<img alt="Welcome to Monitaure" src="https://monitaure.io/images/email/EmailMonitaureOnly.gif">
						</td>
						</tr>
					</table>

					<table width="800" align="center" border="0" cellpadding="0" cellspacing="0">
						<tr>
						<td width="199"></td>
						<td>
							<table bgcolor="white" width="403" align="center" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td id="content">
								<h1>Thank you for signing up!</h1>
								<a class="button" href="${url}">ACTIVATE MY ACCOUNT</a>
								<p>Dear <strong>${username}</strong>,<br><br>
									Thanks for joining us in this little big adventure, it means a lot to us for gaining your support for this alpha version. <br><br>
									We hope that you will love our product and use it a often as you need it.
									If you want to report a bug, or simply get in touch whith us, we would be happy to! You can find our email adresses below. <br><br>
									Again, thank you for your time, and using our newborn Monitaure. <br><br>
									Sincerely. <br><br>
									<!--<strong>Bertrand &amp; Guillaume</strong></p>-->
								</td>
								</tr>
							</table>

							<table id="footer" bgcolor="white" width="403" align="center" border="0" cellpadding="0" cellspacing="0">
								<tr>
								<td>
									<img alt="Motiaure - Logo" src="https://monitaure.io/images/email/Icons/Monitaure.png">
									<a href="https://monitaure.io/" target="_blank">monitaure.io</a>
									<ul>
									<li><a href=""><img alt="Monitaure" src="https://monitaure.io/images/email/Icons/MiniMonitaure.png" target="_blank"></a></li>
									<li><a href=""><img alt="Github" src="https://monitaure.io/images/email/Icons/Github.png" target="_blank"></a></li>
									<li><a href=""><img alt="Twitter" src="https://monitaure.io/images/email/Icons/Twitter.png" target="_blank"></a></li>
									<li><a href=""><img alt="Dribbble" src="https://monitaure.io/images/email/Icons/Dribbble.png" target="_blank"></a></li>
									</ul>
								</td>
								</tr>
							</table>

							</td>
							<td width="198"></td>
						</tr>
						</table>
					</td>
					</tr>
				</table>
				<table id="legal-bullshit" width="400" align="center" border="0" cellpadding="0" cellspacing="0" style="font-family: 'Roboto', Arial, Helvetica, sans-serif">
					<tr>
					<td>
						<p><a href="#">Unsubscribe</a> - Legal bullshit and everything else - 2016 <br><br>
			I don&rsquo;t know why you read this, but obviously you seem very interested in our work, so.. thanks a lot for that.</p>
					</td>
					</tr>
				</table>
				</center>


			</body>
			</html>
		`;
    },
};
