module.exports = {
    Confirmation(url, username) {
        return `
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html>
			<head>
                <meta http-equiv="Content-Type" content="text/html" charset="ISO-8859-1" />
                <title>Monitaure account confirmation</title>
                <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,400italic,500italic' rel='stylesheet' type='text/css'>
			</head>

			<body bgcolor="#212121" style="font-size:16px">
                <center>
                    <table width="800" border="0" cellpadding="0" cellspacing="0" style="font-family: 'Roboto', Arial, Helvetica, sans-serif">
                        <tr>
                            <td bgcolor="#212121" width="100%">
                                <table width="800" align="center" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <img alt="Welcome to Monitaure" src="https://monitaure.io/images/email/EmailMonitaureOnly.gif" style="display:block;">
                                        </td>
                                    </tr>
                                </table>

                                <table width="800" align="center" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td width="199"></td>
                                        <td>
                                            <table bgcolor="white" width="403" align="center" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="text-align:center;">
                                                        <h1 style="text-align:center; color:#52da6e; font-size: 1.5em; font-weight: 400; margin-bottom: 60px">Thank you for signing up!</h1>
                                                        <a href="${url}" style="padding: 20px 30px; background-color: #52da6e; color: white; text-transform: uppercase; text-decoration: none; display: inline-block; text-align: center; margin-bottom: 50px; -webkit-border-radius: 4px; border-radius: 4px;">CONFIRM MY ACCOUNT</a>
                                                        <p style="padding: 0 35px; color: #b2b2b2; margin-bottom: 60px; font-weight: 300; line-height: 1.5em">
                                                            Dear <strong style="font-size:1em;">${username}</strong>,<br><br>
                                                            Thanks for registering to Monitaure's alpha version. <br /><br />
                                                            We hope that you will love the app and that it will fit you needs perfectly.<br />
                                                            Should you encounter a bug or miss a feature, please get in touch with us through Github or social networks.
                                                            Again, thank you for using our newborn Monitaure.<br /><br />
                                                            Sincerely,<br /><br />
                                                            The Monitaure team.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table bgcolor="white" width="403" align="center" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:40px; -webkit-border-radius: 0 0 10px 10px; border-radius: 0 0 10px 10px;">
                                                <tr>
                                                    <td style="text-align:center;">
                                                        <img alt="Monitaure - Logo" src="https://monitaure.io/images/email/Icons/Monitaure.png" style="margin:0 auto 40px; display:block;">
                                                        <a href="https://monitaure.io/" target="_blank" style="display: block; margin-bottom: 40px; text-decoration: none; color: #b2b2b2;">monitaure.io</a>
                                                        <ul style="margin:0 0 40px; padding: 0; list-style: none; text-align: center;">
                                                            <li style="margin:0; padding: 0; display: inline-block; padding: 0 5%">
                                                                <a href="https://monitaure.io/"><img alt="Monitaure" src="https://monitaure.io/images/email/Icons/MiniMonitaure.png" target="_blank" style="display:block;"></a>
                                                            </li>
                                                            <li style="margin:0; padding: 0; display: inline-block; padding: 0 5%">
                                                                <a href="https://github.com/Bertrand31/Monitaure"><img alt="Github" src="https://monitaure.io/images/email/Icons/Github.png" target="_blank" style="display:block;"></a>
                                                            </li>
                                                            <li style="margin:0; padding: 0; display: inline-block; padding: 0 5%">
                                                                <a href="#_"><img alt="Twitter" src="https://monitaure.io/images/email/Icons/Twitter.png" target="_blank" style="display:block;"></a>
                                                            </li>
                                                            <li style="margin:0; padding: 0; display: inline-block; padding: 0 5%">
                                                                <a href="https://dribbble.com/guillaumeparra/tags/monitaure"><img alt="Dribbble" src="https://monitaure.io/images/email/Icons/Dribbble.png" target="_blank" style="display:block;"></a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td width="198"></td>
                                    </tr>
                                </table>
                                <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="font-family: 'Roboto', Arial, Helvetica, sans-serif; color:#cacaca; text-align: center; font-size: 0.8em; margin-bottom:40px">
                                    <tr>
                                        <td>
                                            <p style="color:#cacaca; text-decoration: none;">If you didn't try to create an account on <a href="https://monitaure.io/">monitaure.io</a>, please ignore this email.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </center>
            </body>
            </html>
		`;
    },
};
