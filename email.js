//create a transport
//create a message
//send a email using sendmail
const nodemailer = require('nodemailer')
async function mail()
{
// Create a transporter using SMTP
const transporter = await nodemailer.createTransport({
    service:"gmial",
    auth:{
    user: 'cse.23bcsh04@silicon.ac.in',
    pass: 'awel wdko qrdt ausw'
  }
})

const message = {
    from: 'cse.23bcsh04@gmail.com', // sender address
    to: 'cse.24bcsi69@silicon.ac.in', // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // HTML body
}

await transporter.sendMail(message)
console.log("meaassge send")
}

mail(); 