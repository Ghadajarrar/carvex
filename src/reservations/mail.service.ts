// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
      user: 'ghada.jarrarr@gmail.com', 
      pass: 'gxts ujsw tgwr ehhe' 
      },
    });
  }

async sendReservationEmail(to: string, reservationData: any) {
  const {
    userName,
    userEmail,
    userPhone,
    carName,
    startDate,
    endDate,
    location,
  } = reservationData;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      
      <!-- LOGO -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="cid:carvexlogo" alt="Carvex" width="300" />
      </div>

      <h2 style="color:#1e293b;">Nouvelle réservation</h2>
      <p>Bonjour <strong>Carvex</strong>,</p>

      <p> Réservation envoyéee avec succès.</p>

      <ul>
        <li><strong>Email :</strong> ${userEmail}</li>
        <li><strong>Téléphone :</strong> ${userPhone}</li>
        <li><strong>Voiture :</strong> ${carName}</li>
        <li><strong>Date de début :</strong> ${new Date(startDate).toLocaleDateString()}</li>
        <li><strong>Date de fin :</strong> ${new Date(endDate).toLocaleDateString()}</li>
        <li><strong>Lieu de prise :</strong> ${location}</li>
      </ul>

      <p style="margin-top: 30px;">Merci de votre confiance 🚗</p>

      <hr />
      <small style="color: gray;">Carvex © ${new Date().getFullYear()}</small>
    </div>
  `;

  await this.transporter.sendMail({
    from: `"Carvex" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Nouvelle réservation - ${carName}`,
    html: htmlContent,

    // 🔥 IMAGE INLINE
    attachments: [
      {
        filename: 'logo.png',
        path: 'src/assets/logo.png',
        cid: 'carvexlogo', 
      },
    ],
  });
}
}