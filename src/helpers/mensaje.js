import transporter from './nodemailer.js'

const registroUsuario = async(nombre, emailUsuario) => {
  
  const info = await transporter.sendMail({
    from: `pab.pg92@gmail.com`,
    to: `${emailUsuario}`, 
    subject: "Bienvenido ✔", 
    html: `
     <div>
    <style>
        main {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background-color: #007BFF;
          color: #ffffff;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
        }
        .content h2 {
          font-size: 20px;
          color: #333;
        }
        .content p {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          color: #ffffff;
          background-color: #007BFF;
          text-decoration: none;
          border-radius: 5px;
        }
        .button:hover {
          background-color: #0056b3;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 20px;
          text-align: center;
          font-size: 14px;
        }
        .footer p {
          margin: 0;
        }
      </style>
    <main>
      <div class="container">
        <div class="header">
          <h1>Bienvenido a Tarea Fácil</h1>
        </div>
        <div class="content">
          <h2>¡Gracias por registrarte!</h2>
          <p>Hola ${nombre},</p>
          <p>Estamos encantados de darte la bienvenida. Tu cuenta ha sido creada exitosamente.</p>
          
        </div>
        <div class="footer">
          <p>&copy; 2024. Todos los derechos reservados.</p>
        </div>
      </div>
    </main>
</div>
    `, 
  });
}

export default registroUsuario;