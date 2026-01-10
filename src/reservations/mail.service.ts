// src/reservations/mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    if (!process.env.RESEND_API_KEY) {
      this.logger.error('RESEND_API_KEY is not defined!');
    }
    this.resend = new Resend(process.env.RESEND_API_KEY!);
  }

  /**
   * Envoie un email de réservation
   * @param to Email destinataire
   * @param reservationData Données de la réservation
   */
  async sendReservationEmail(to: string, reservationData: {
    userName: string;
    userEmail: string;
    userPhone: string;
    carName: string;
    startDate: string | Date;
    endDate: string | Date;
    location: string;
  }) {
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
        <div style="text-align:center;margin-bottom:20px;">
          <h1 style="color:#1e293b;">🚗 Carvex</h1>
        </div>
        <h2>Nouvelle réservation</h2>
        <ul>
          <li><strong>Client :</strong> ${userName}</li>
          <li><strong>Email :</strong> ${userEmail}</li>
          <li><strong>Téléphone :</strong> ${userPhone}</li>
          <li><strong>Voiture :</strong> ${carName}</li>
          <li><strong>Début :</strong> ${new Date(startDate).toLocaleDateString()}</li>
          <li><strong>Fin :</strong> ${new Date(endDate).toLocaleDateString()}</li>
          <li><strong>Lieu :</strong> ${location}</li>
        </ul>
        <p style="margin-top:20px;">Merci de votre confiance 🚗</p>
        <hr />
        <small>Carvex © ${new Date().getFullYear()}</small>
      </div>
    `;

    try {
      const response = await this.resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: to || process.env.ADMIN_EMAIL!,
        subject: `Nouvelle réservation - ${carName}`,
        html: htmlContent,
      });

      this.logger.log('✅ Email de réservation envoyé avec succès');
      this.logger.debug(`Resend response: ${JSON.stringify(response)}`);
      return true;
    } catch (error) {
      this.logger.error('❌ Échec de l’envoi de l’email via Resend', error);
      // Ne bloque pas la réservation si l'email échoue
      return false;
    }
  }
}
