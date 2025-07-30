import nodemailer from 'nodemailer';

// Email configuration based on environment
const getTransporter = () => {
  const emailService = process.env.EMAIL_SERVICE || 'gmail';
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error('Email credentials not configured. Password reset emails will not work.');
    return null;
  }

  // Configuration for different email services
  const config: any = {
    auth: {
      user: emailUser,
      pass: emailPass
    },
    // Additional settings for better deliverability
    secure: true,
    tls: {
      rejectUnauthorized: false
    }
  };

  // Custom SMTP configuration
  if (emailService === 'smtp') {
    config.host = process.env.EMAIL_HOST;
    config.port = parseInt(process.env.EMAIL_PORT || '587');
    config.secure = process.env.EMAIL_SECURE === 'true';
  } else {
    config.service = emailService;
  }

  return nodemailer.createTransport(config);
};

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    const transporter = getTransporter();
    
    if (!transporter) {
      console.error('Email transporter not available');
      return false;
    }

    const mailOptions = {
      from: `"Hijab Marriage Bureau" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request - Hijab Marriage Bureau',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Hijab Marriage Bureau</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Dignified, Shariah-compliant matchmaking</p>
          </div>
          
          <div style="padding: 40px; background: white;">
            <h2 style="color: #333; margin-bottom: 20px; font-size: 24px;">Password Reset Request</h2>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              Assalamu alaikum,<br><br>
              You requested a password reset for your Hijab Marriage Bureau account. Click the button below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetUrl}" 
                 style="background: #4CAF50; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                Reset Password
              </a>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                <strong>Important:</strong> This link will expire in 1 hour for security reasons.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              If you didn't request this password reset, please ignore this email. Your account remains secure.
            </p>
            
            <p style="color: #666; font-size: 14px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${resetUrl}" style="color: #4CAF50; word-break: break-all;">${resetUrl}</a>
            </p>
          </div>
          
          <div style="background: #333; color: white; padding: 30px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Hijab Marriage Bureau. All rights reserved.</p>
            <p style="margin: 10px 0 0 0; opacity: 0.8;">Dignified, Shariah-compliant matchmaking for Muslims</p>
          </div>
        </div>
      `,
      text: `
Password Reset Request - Hijab Marriage Bureau

Assalamu alaikum,

You requested a password reset for your Hijab Marriage Bureau account. Click the link below to reset your password:

${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email.

© ${new Date().getFullYear()} Hijab Marriage Bureau. All rights reserved.
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

// Test email function for development
export async function testEmailConnection() {
  try {
    const transporter = getTransporter();
    
    if (!transporter) {
      console.error('Email transporter not available');
      return false;
    }

    // Verify connection
    await transporter.verify();
    console.log('Email connection verified successfully');
    return true;
  } catch (error) {
    console.error('Email connection test failed:', error);
    return false;
  }
} 