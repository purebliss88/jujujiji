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
    const { email, reading } = JSON.parse(event.body);
    
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address', success: false })
      };
    }

    // Create professional HTML template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your ${reading.type} Reading</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
            
            body { 
                margin: 0; 
                padding: 0; 
                font-family: 'Crimson Text', Georgia, serif; 
                background: linear-gradient(135deg, #071037 0%, #1a1a2e 50%, #16213e 100%);
                color: #333;
            }
            
            .email-container {
                max-width: 650px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            
            .header {
                background: linear-gradient(135deg, #C79535 0%, #DAA520 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.3)"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>');
                opacity: 0.3;
            }
            
            .header h1 {
                color: #fff;
                font-size: 32px;
                font-weight: 600;
                margin: 0 0 10px 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                position: relative;
                z-index: 1;
            }
            
            .header .subtitle {
                color: rgba(255,255,255,0.9);
                font-size: 18px;
                font-style: italic;
                margin: 0;
                position: relative;
                z-index: 1;
            }
            
            .content {
                padding: 40px 30px;
            }
            
            .reading-intro {
                text-align: center;
                margin-bottom: 40px;
                padding: 25px;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border-radius: 10px;
                border-left: 5px solid #C79535;
            }
            
            .reading-intro h2 {
                color: #071037;
                font-size: 24px;
                margin: 0 0 10px 0;
                font-weight: 600;
            }
            
            .reading-intro p {
                color: #666;
                font-size: 16px;
                margin: 0;
                line-height: 1.6;
            }
            
            .card {
                margin: 35px 0;
                padding: 30px;
                border: 2px solid #C79535;
                border-radius: 15px;
                background: linear-gradient(135deg, #fff 0%, #fefefe 100%);
                box-shadow: 0 8px 25px rgba(199, 149, 53, 0.15);
                position: relative;
                overflow: hidden;
            }
            
            .card::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(45deg, #C79535, #DAA520, #C79535);
                border-radius: 15px;
                z-index: -1;
            }
            
            .card::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #fff;
                border-radius: 13px;
                z-index: -1;
            }
            
            .card-position {
                color: #4A0401;
                font-size: 22px;
                font-weight: 600;
                margin: 0 0 15px 0;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .card-name {
                color: #071037;
                font-size: 28px;
                font-weight: 600;
                margin: 0 0 10px 0;
                line-height: 1.3;
            }
            
            .card-meaning {
                display: inline-block;
                background: linear-gradient(135deg, #C79535 0%, #DAA520 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin: 0 0 20px 0;
            }
            
            .card-text {
                color: #444;
                font-size: 16px;
                line-height: 1.8;
                margin: 0;
                text-align: justify;
            }
            
            .footer {
                background: #071037;
                color: #fff;
                padding: 40px 30px;
                text-align: center;
            }
            
            .footer-message {
                font-size: 18px;
                font-style: italic;
                margin: 0 0 20px 0;
                color: #C79535;
            }
            
            .footer-link {
                color: #C79535;
                text-decoration: none;
                font-weight: 600;
                border-bottom: 1px solid transparent;
                transition: border-bottom-color 0.3s ease;
            }
            
            .footer-link:hover {
                border-bottom-color: #C79535;
            }
            
            .copyright {
                color: #888;
                font-size: 12px;
                margin: 20px 0 0 0;
            }
            
            .divider {
                height: 3px;
                background: linear-gradient(90deg, transparent 0%, #C79535 50%, transparent 100%);
                margin: 30px 0;
                border-radius: 2px;
            }
            
            @media only screen and (max-width: 600px) {
                .email-container {
                    margin: 10px;
                    border-radius: 10px;
                }
                
                .header {
                    padding: 30px 20px;
                }
                
                .header h1 {
                    font-size: 26px;
                }
                
                .content {
                    padding: 30px 20px;
                }
                
                .card {
                    padding: 20px;
                    margin: 25px 0;
                }
                
                .card-name {
                    font-size: 24px;
                }
                
                .footer {
                    padding: 30px 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>✨ Your ${reading.type} ✨</h1>
                <p class="subtitle">A mystical message from Daniel Boutros at The Magick Mechanic</p>
            </div>
            
            <div class="content">
                <div class="reading-intro">
                    <h2>The Oracle Hath Spoken!</h2>
                    <p>The Magickal cats have awakened to bring you this ${reading.type.toLowerCase()}. Each card carries wisdom meant specifically for you at this moment in your journey.</p>
                </div>
                
                ${reading.cards.map(card => `
                    <div class="card">
                        <h3 class="card-position">${card.position}</h3>
                        <h4 class="card-name">${card.card}</h4>
                        <div class="card-meaning">${card.meaning} Energy</div>
                        <div class="divider"></div>
                        <p class="card-text">${card.text.replace(/\n/g, '<br><br>')}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="footer">
                <p class="footer-message">May this reading illuminate your path forward</p>
                <p>Visit <a href="https://www.themagickmechanic.com" class="footer-link">The Magick Mechanic</a> for more mystical insights</p>
                <p class="copyright">© ${new Date().getFullYear()} Daniel Boutros and The Magick Mechanic. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;

    // Create simple text version
    let textContent = `✨ Your ${reading.type} from The Magick Mechanic ✨\n\n`;
    textContent += `The Oracle Hath Spoken!\n`;
    textContent += `The Magickal cats have awakened to bring you this ${reading.type.toLowerCase()}. Each card carries wisdom meant specifically for you at this moment in your journey.\n\n`;
    textContent += '━'.repeat(50) + '\n\n';
    
    reading.cards.forEach((card, index) => {
      textContent += `${card.position.toUpperCase()}\n`;
      textContent += `${card.card}\n`;
      textContent += `${card.meaning} Energy\n\n`;
      textContent += `${card.text}\n`;
      if (index < reading.cards.length - 1) {
        textContent += '\n' + '─'.repeat(30) + '\n\n';
      }
    });
    
    textContent += '\n\n━'.repeat(50) + '\n';
    textContent += 'May this reading illuminate your path forward\n\n';
    textContent += 'Visit The Magick Mechanic at https://www.themagickmechanic.com for more mystical insights\n\n';
    textContent += `© ${new Date().getFullYear()} Daniel Boutros and The Magick Mechanic. All rights reserved.`;

    // Initialize Mailjet
    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY
    );

    // Send email with enhanced template
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: "Daniel Boutros | The Magick Mechanic"
          },
          To: [
            {
              Email: email
            }
          ],
          Subject: `✨ Your ${reading.type} Reading Has Arrived`,
          TextPart: textContent,
          HTMLPart: htmlTemplate
        }
      ]
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: "Thank you! Your beautifully formatted reading has been sent to your email."
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
