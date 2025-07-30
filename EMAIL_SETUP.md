# Email Setup Guide for Hijab Marriage Bureau

## Overview
This guide will help you set up email functionality for password reset and other email notifications in your Hijab Marriage Bureau application.

## 🔧 Email Configuration Options

### Option 1: Gmail (Recommended for Development)

#### Step 1: Create a Gmail Account
1. Create a new Gmail account for your business: `hijabmarriagebureau@gmail.com`
2. Use a strong password and enable 2-factor authentication

#### Step 2: Generate App Password
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Scroll down and click **App passwords**
4. Select **Mail** from the dropdown
5. Click **Generate**
6. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

#### Step 3: Update Environment Variables
Add these to your `.env.local`:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=hijabmarriagebureau@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### Option 2: Outlook/Hotmail

```env
EMAIL_SERVICE=outlook
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password_or_app_password
```

### Option 3: Yahoo

```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_app_password
```

### Option 4: Custom SMTP Server

```env
EMAIL_SERVICE=smtp
EMAIL_USER=your_email@yourdomain.com
EMAIL_PASS=your_password
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
```

## 🧪 Testing Email Configuration

### Method 1: API Test
Visit: `http://localhost:3000/api/test-email`

### Method 2: Test Password Reset
1. Go to `/forgot-password`
2. Enter a valid email address
3. Check if the email is sent successfully

### Method 3: Console Logs
Check your terminal/console for email-related logs:
- ✅ "Email connection verified successfully"
- ✅ "Password reset email sent successfully to: email@example.com"

## 🔍 Troubleshooting

### Common Issues:

#### 1. "Email credentials not configured"
**Solution:** Add email credentials to `.env.local`

#### 2. "Authentication failed"
**Solution:** 
- Check your email/password
- For Gmail: Use App Password, not regular password
- Enable "Less secure app access" (not recommended)

#### 3. "Connection timeout"
**Solution:**
- Check internet connection
- Verify email service settings
- Try different email provider

#### 4. "Email not received"
**Solution:**
- Check spam folder
- Verify email address is correct
- Check email provider settings

## 📧 Email Templates

The application includes professional email templates for:
- Password Reset Requests
- Account Verification (future)
- Welcome Emails (future)

## 🔒 Security Best Practices

1. **Use App Passwords** instead of regular passwords
2. **Enable 2-Factor Authentication** on email accounts
3. **Use Environment Variables** for sensitive data
4. **Regular Password Rotation** for email accounts
5. **Monitor Email Logs** for suspicious activity

## 🚀 Production Deployment

### For Production:
1. Use a professional email service (SendGrid, Mailgun, etc.)
2. Set up proper DNS records (SPF, DKIM, DMARC)
3. Monitor email deliverability
4. Set up email analytics

### Environment Variables for Production:
```env
EMAIL_SERVICE=smtp
EMAIL_USER=noreply@hijabmarriagebureau.com
EMAIL_PASS=your_production_password
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
NEXTAUTH_URL=https://yourdomain.com
```

## 📞 Support

If you encounter issues:
1. Check the console logs
2. Test email connectivity: `/api/test-email`
3. Verify environment variables
4. Test with different email providers

## ✅ Checklist

- [ ] Email account created
- [ ] App password generated (for Gmail)
- [ ] Environment variables configured
- [ ] Email connection tested
- [ ] Password reset functionality tested
- [ ] Email templates customized
- [ ] Production email service configured (for deployment) 