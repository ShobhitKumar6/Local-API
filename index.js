
import express, { text } from 'express';
import nodemailer from 'nodemailer';

const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'riyanshpatel894@gmail.com',
        pass: 'your app password'
    }
});

// app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine', 'ejs')

app.get("/mail", (req, resp) => {
    resp.render("mail")
})

app.post("/submit-email", (req, resp) => {
    console.log(req.body)

    const mailOption = {
        from: 'riyanshpatel894@gmail.com',
        to:'riyanshpatel894@gmail.com',
        subject:req.body.subject,
        text:req.body.mail
    }
    transporter.sendMail(mailOption,(error,info)=>{
        if(error){
            resp.send("email operation filed, try again")
        }else{
            resp.send("mail send")
        }
    })
    resp.send("email send")
})

app.listen(3200);