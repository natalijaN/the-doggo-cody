'use server';

import nodemailer from 'nodemailer';

export async function submitQuestion(formData: { email: string; question: string }) {
    console.log('Form data:', formData);
    const transporter = nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        port: 2525,
        secure: false,
        auth: {
          user: 'natalija1.nikolova@gmail.com',
          pass: process.env.ELASTIC_API_KEY,
        },
      });
    
      try {
        const info = await transporter.sendMail({
          from: 'Natalija from Demo App <natalija1.nikolova@gmail.com>',
          to: 'natalija1.nikolova@gmail.com',
          subject: '🚀 Demo Email from My Next.js App',
          text: `Question: ${formData.question}\n\nFrom: ${formData.email}`,
        });
    
        console.log('Email sent:', info);
        return { success: true };
      } catch (err) {
        console.error('Error sending email:', err);
        return { success: false, error: err };
      }
}
