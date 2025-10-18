import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Verify Your Email',
      html: `
        <h2>Email Verification</h2>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't register for an account, please ignore this email.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  async sendRoleApprovalEmail(email: string, role: string) {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: `Your ${role} Account Has Been Approved`,
      html: `
        <h2>Account Approved</h2>
        <p>Congratulations! Your ${role} account has been approved.</p>
        <p>You can now log in and access all features.</p>
        <a href="${process.env.FRONTEND_URL}/login">Login to your account</a>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send approval email:', error);
      throw new Error('Failed to send approval email');
    }
  }
}