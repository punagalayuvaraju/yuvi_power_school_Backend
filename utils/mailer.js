const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    auth: {
        user: process.env.EMAIL_SMTP_USERNAME,
        pass: process.env.EMAIL_SMTP_PASSWORD,
    },
});
const sendMail = async (to, subject, html) => {
    return transporter.sendMail({
        from: "no-reply@xyz.com", // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
        to, // list of receivers e.g. bar@example.com, baz@example.com
        subject, // Subject line e.g. 'Hello ✔'
        //text: text, // plain text body e.g. Hello world?
        html, // html body e.g. '<b>Hello world?</b>'
    });
};

const accountCreated = (user) => {
    let html = "";
    html = `<p>Account created on TNRTP</p>
        <p>UserName: ${user.userName}</p>
        <p>Temporary password: ${user.password}</p>`;
    return sendMail(user.emailId, "Account created", html);
};

const forgetPassword = (user) => {
    let html = `<p>Your password has been reset successfully. Please use below password to log in.</p>
                <p>User ID: ${user.userName}</p>
                <p>Temporary Password: ${user.password}</p>`;
    return sendMail(user.emailId, "Forget password", html);
};

const forgetUserName = (user) => {
    let html = `<p>Your user name is ${user.userName}</p>`;
    return sendMail(user.emailId, "Forget User name", html);
};
module.exports.accountCreated = accountCreated;
module.exports.forgetPassword = forgetPassword;
module.exports.forgetUserName = forgetUserName;
