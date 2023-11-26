import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/signup', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ramsheedkk06@gmail.com',
      pass: 'ahyetfzwdgpgxcmc'
    }
  });

  const mailDetails = {
    from: 'ramsheedkk06@gmail.com', // Debe ser la misma cuenta autenticada en el servicio SMTP
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
    html: `<h1>${req.body.subject}</h1>
      <p>${req.body.message}</p>
      <p>Congratulations, ${req.body.name}</p>
      <p>Your registration completed successfully</p>`
  };

  transporter.sendMail(mailDetails, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error al enviar el correo');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('¡Correo enviado con éxito!');
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
