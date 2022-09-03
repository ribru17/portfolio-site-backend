import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

dotenv.config({path: path.join(__dirname, './../.env')}) // starts from 'dist' folder
const PORT = process.env.PORT || 8000
const app = express()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PW,
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    }
})

app.use(cors())
app.use(express.json())

app.post('/api/contact', (req, res) => {
    const mail: Mail.Options = {
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: `Web message from ${req.body.name}`,
        text: req.body.message
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send("Failed to send message")
        } else {
            res.status(200).send("Successfully sent message")
        }
    })
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})