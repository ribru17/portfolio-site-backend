"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var nodemailer_1 = __importDefault(require("nodemailer"));
// dotenv.config({path: __dirname + './../.env'}) // starts from 'dist' folder
dotenv_1.default.config({ path: path_1.default.join(__dirname, './../.env') }); // starts from 'dist' folder
var PORT = process.env.PORT || 8000;
var app = (0, express_1.default)();
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PW,
    }
});
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(express.static(path.join(__dirname, '../../client/build')))
app.post('/api/contact', function (req, res) {
    var mail = {
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: "Web message from " + req.body.name,
        text: req.body.message
    };
    transporter.sendMail(mail, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to send message");
        }
        else {
            res.status(200).send("Successfully sent message");
        }
    });
});
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../client/build/index.html'))
// })
app.listen(PORT, function () {
    console.log("listening on " + PORT);
});
