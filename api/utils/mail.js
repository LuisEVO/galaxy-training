const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'galaxy.training.supp@gmail.com',
        pass: '2019.gts'
    }
})

exports.from = 'Galaxy Training Support <galaxy.training.supp@gmail.com'
                    
