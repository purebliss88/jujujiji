// netlify/functions/mailjet-reading.js
const Mailjet = require('node-mailjet');

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': 'https://www.themagickmechanic.com',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers, 
      body: JSON.stringify({ error: 'Method not allowed', success: false }) 
    };
  }

  try {
    // Parse request
    const { email, reading } = JSON.parse(event.body);
    
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address', success: false })
      };
    }

    // Format email content
    let textContent = `Your ${reading.type} from The Magick Mechanic\n\n`;
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #C79535; text-align: center;">Your ${reading.type}</h1>
        <p style="color: #071037; text-align: center;">From The Magick Mechanic</p>
    `;
    
    reading.cards.forEach(card => {
      textContent += `Position: ${card.position}\n`;
      textContent += `Card: ${card.card}\n`;
      textContent += `Meaning: ${card.meaning}\n`;
      textContent += `${card.text}\n\n`;
      
      htmlContent += `
        <div style="margin: 30px 0; padding: 20px; border: 1px solid #C79535; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #4A0401; margin-top: 0;">${card.position}</h2>
          <h3 style="color: #071037;">${card.card}</h3>
          <p style="color: #666;"><strong>${card.meaning} Meaning</strong></p>
          <p style="color: #333; line-height: 1.6;">${card.text.replace(/\n/g, '<br>')}</p>
        </div>
      `;
    });
    
    htmlContent += `
        <div style="margin-top: 40px; text-align: center; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="font-style: italic; color: #666;">Thank you for using The Magick Mechanic Oracle Reader!</p>
          <p style="color: #999; font-size: 12px;">© ${new Date().getFullYear()} The Magick Mechanic. All rights reserved.</p>
        </div>
      </div>
    `;

    // Initialize Mailjet
    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY
    );

    // Send email
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: "The Magick Mechanic"
          },
          To: [
            {
              Email: email
            }
          ],
          Subject: `Your ${reading.type} from The Magick Mechanic`,
          TextPart: textContent,
          HTMLPart: htmlContent
        }
      ]
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: "Thank you! Your reading has been sent to your email."
      })
    };
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: "The cats got distracted and failed to send your reading. Please try again later."
      })
    };
  }
};
