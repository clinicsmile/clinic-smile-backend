const { configuration } = require("../Config/Configurations");
const { Resend } = require("resend");

const nodemailerSendgrid = require("nodemailer-sendgrid");
const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: configuration.SENDGRID_KEY,
    })
  );
};

const EmailController = {};

const resend = new Resend(configuration.RESEND_KEY);

const sendMail = async (template, data) => {
  console.log(Object.keys(data));
  if (configuration.SENDGRID_KEY.length > 0) {
    const trasporter = createTransporter();
    const info = await trasporter.sendMail({
      from: "ClinicSmile <daniel.otalora@utp.edu.co>",
      to: [data.email],
      subject: "Bienvenido a ClinicSmile",
      html: template,
    });
  }

  console.log(info);
};

EmailController.CorreoRegistroPersona = (data) => {
  const template = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Registro en ClinicSmile</title>
      <style>
          body {
              background-color: #f4f4f4;
              color: #333;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h2 {
              color: #007bff;
          }
  
          ul {
              list-style: none;
              padding: 0;
          }
  
          ul li {
              margin-bottom: 8px;
          }
  
          p {
              line-height: 1.6;
          }
  
          strong {
              color: #007bff;
          }
  
          .logo {
              text-align: center;
          }
  
          .logo img {
              max-width: 100%;
              height: auto;
          }
      </style>
  </head>
  <body>
  
      <div class="container">
  
          <div class="logo">
              <img src="https://i.ibb.co/wzPjqX2/logo.png" alt="Logo de ClinicSmile">
          </div>
  
          <h2>Confirmación de Registro en ClinicSmile</h2>
  
          <p>Estimado/a ${data.name},</p>
  
          <p>Bienvenido/a a ClinicSmile, la clínica dental que se preocupa por tu salud bucal. Nos complace informarte que tu registro en nuestra página ha sido completado con éxito.</p>
  
          <p><strong>Detalles de Registro:</strong></p>
          <ul>
              <li><strong>Nombre de Usuario:</strong>  ${data.username}</li>
              <li><strong>Correo Electrónico:</strong>  ${data.email}</li>
          </ul>
  
          <p>Te invitamos a explorar nuestra página para que realices la gestion de tus citas</p>
  
          <p><strong>¡Sonríe con confianza!</strong></p>
  
          <p>Atentamente,<br>
                El equipo de ClinicSmile</p>

      </div>
  
  </body>
  </html>
    `;
  return sendMail(template, data);
};

EmailController.CorreoAceptacionCita = (data) => {
  const template = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Recepción de Solicitud de Cita en ClinicSmile</title>
      <style>
          body {
              background-color: #f4f4f4;
              color: #333;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h2 {
              color: #007bff;
          }
  
          ul {
              list-style: none;
              padding: 0;
          }
  
          ul li {
              margin-bottom: 8px;
          }
  
          p {
              line-height: 1.6;
          }
  
          strong {
              color: #007bff;
          }
  
          .logo {
              text-align: center;
              margin-bottom: 20px;
          }
  
          .logo img {
              max-width: 100%;
              height: auto;
          }
      </style>
  </head>
  <body>
  
      <div class="container">
  
          <div class="logo">
              <img src="https://i.ibb.co/wzPjqX2/logo.png" alt="Logo de ClinicSmile">
          </div>
  
          <h2>Confirmación de Cita en ClinicSmile</h2>
  
          <p>Estimado/a ${data.name},</p>
  
          <p>Hemos recibido tu solicitud de cita en ClinicSmile. Agradecemos tu interés en nuestros servicios y estamos trabajando diligentemente para asignarte un dentista que se ajuste a tus necesidades.</p>
  
          <p><strong>Detalles de la Solicitud:</strong></p>
          <ul>
              <li><strong>Fecha Preferida:</strong> ${data.date}</li>
              <li><strong>Hora Preferida:</strong> ${data.time}</li>
              <li><strong>Motivo De Consulta:</strong> ${data.reason}</li>
          </ul>
  
          <p>Te notificaremos tan pronto como hayamos asignado un dentista para tu cita. Mientras tanto, si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros.</p>
  
          <p>Gracias por elegir ClinicSmile. Estamos ansiosos por proporcionarte un servicio de calidad.</p>
  
          <p><strong>¡Sonríe con confianza!</strong></p>
  
          <p>Atentamente,<br>
                El equipo de ClinicSmile</p>
      </div>
  
  </body> 
  </html>
      `;
  return sendMail(template, data);
};

EmailController.CorreoNuevaCita = (data) => {
  const template = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Cita en ClinicSmile</title>
      <style>
          body {
              background-color: #f4f4f4;
              color: #333;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h2 {
              color: #007bff;
          }
  
          ul {
              list-style: none;
              padding: 0;
          }
  
          ul li {
              margin-bottom: 8px;
          }
  
          p {
              line-height: 1.6;
          }
  
          strong {
              color: #007bff;
          }
  
          .logo {
              text-align: center;
              margin-bottom: 20px;
          }
  
          .logo img {
              max-width: 100%;
              height: auto;
          }
      </style>
  </head>
  <body>
  
      <div class="container">
  
          <div class="logo">
              <img src="https://i.ibb.co/wzPjqX2/logo.png" alt="Logo de ClinicSmile">
          </div>
  
          <h2>Confirmación de Agendamiento de Cita en ClinicSmile</h2>
  
          <p>Estimado/a ${data.Person.name},</p>
  
          <p>Nos complace informarte que tu cita en ClinicSmile ha sido agendada con éxito. Estamos emocionados de recibirte en nuestra clínica dental.</p>
  
          <p><strong>Detalles de la Cita:</strong></p>
          <ul>
              <li><strong>Fecha:</strong> ${data.date}</li>
              <li><strong>Hora:</strong> ${data.time}</li>
              <li><strong>Nombre del Dentista:</strong> ${data.Person.name} ${data.Person.lastName}</li>
          </ul>
  
          <p>Te recordamos que estamos comprometidos a brindarte un servicio de calidad. Si necesitas modificar o cancelar tu cita, no dudes en ponerte en contacto con nosotros.</p>
  
          <p>Esperamos verte pronto y asegurarnos de que tu experiencia en ClinicSmile sea excepcional.</p>
  
          <p><strong>¡Sonríe con confianza!</strong></p>
  
          <p>Atentamente,<br>
                El equipo de ClinicSmile</p>
  
      </div>
  
  </body>
  </html>
        `;
  return sendMail(template, data.Person);
};
module.exports = { EmailController };
