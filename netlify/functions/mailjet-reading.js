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

    // Create professional HTML template with brand colors and fonts
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your ${reading.type} Reading</title>
        <style>
            /* Import Google Fonts as fallbacks */
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Inter:wght@300;400;500&display=swap');
            
            body { 
                margin: 0; 
                padding: 0; 
                font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
                letter-spacing: 2.5px;
                background: linear-gradient(135deg, #071037 0%, #161719 50%, #0A2E44 100%);
                color: #FEF7F2;
            }
            
            .email-container {
                max-width: 650px;
                margin: 0 auto;
                background: #020202;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(199, 149, 53, 0.3);
                border: 2px solid #C79535;
            }
            
            .header {
                background: linear-gradient(135deg, #4A0401 0%, #720400 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
                border-bottom: 3px solid #C79535;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(199,149,53,0.4)"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>');
                opacity: 0.6;
            }
            
            .header h1 {
                color: #C79535;
                font-size: 32px;
                font-family: 'Rasputin', Georgia, 'Times New Roman', serif;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 4.4px;
                margin: 0 0 8px 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                position: relative;
                z-index: 1;
            }
            
            .header .subtitle {
                color: #FFEE86;
                font-size: 18px;
                font-family: 'Polarity Light', 'Helvetica Neue Light', Helvetica, sans-serif;
                font-style: italic;
                text-transform: uppercase;
                letter-spacing: 11.1px;
                margin: 0;
                position: relative;
                z-index: 1;
            }
            
            .content {
                padding: 40px 30px;
                background: #161719;
            }
            
            .reading-intro {
                text-align: center;
                margin-bottom: 30px;
                padding: 25px;
                background: linear-gradient(135deg, #071037 0%, #0A2E44 100%);
                border-radius: 10px;
                border: 2px solid #C79535;
                box-shadow: 0 8px 20px rgba(199, 149, 53, 0.2);
            }
            
            .reading-intro h2 {
                color: #C79535;
                font-size: 24px;
                font-family: 'Montserrat', 'Arial Black', Arial, sans-serif;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 4.4px;
                margin: 0 0 8px 0;
            }
            
            .reading-intro p {
                color: #FEF7F2;
                font-size: 16px;
                font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
                letter-spacing: 2.5px;
                margin: 0;
                line-height: 1.4;
            }
            
            .card {
                margin: 25px 0;
                padding: 25px;
                border: 2px solid #C79535;
                border-radius: 15px;
                background: linear-gradient(135deg, #020202 0%, #161719 100%);
                box-shadow: 0 8px 25px rgba(199, 149, 53, 0.25);
                position: relative;
            }
            
            .card-position {
                color: #C79535;
                font-size: 20px;
                font-family: 'Montserrat', 'Arial Black', Arial, sans-serif;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 4.4px;
                margin: 0 0 10px 0;
            }
            
            .card-name {
                color: #FFEE86;
                font-size: 26px;
                font-family: 'Rasputin', Georgia, 'Times New Roman', serif;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 4.4px;
                margin: 0 0 8px 0;
                line-height: 1.2;
            }
            
            .card-meaning {
                display: inline-block;
                background: linear-gradient(135deg, #720400 0%, #4A0401 100%);
                color: #C79535;
                padding: 8px 16px;
                border: 1px solid #C79535;
                border-radius: 20px;
                font-size: 14px;
                font-family: 'Montserrat', 'Arial Black', Arial, sans-serif;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 4.4px;
                margin: 0 0 15px 0;
            }
            
            .card-text {
                color: #FEF7F2;
                font-size: 16px;
                font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
                letter-spacing: 2.5px;
                line-height: 1.4;
                margin: 0;
                text-align: left;
            }
            
            .footer {
                background: #071037;
                color: #FEF7F2;
                padding: 30px;
                text-align: center;
                border-top: 3px solid #C79535;
            }
            
            .footer-message {
                font-size: 18px;
                font-family: 'Polarity Light', 'Helvetica Neue Light', Helvetica, sans-serif;
                font-style: italic;
                text-transform: uppercase;
                letter-spacing: 11.1px;
                margin: 0 0 15px 0;
                color: #C79535;
            }
            
            .footer-link {
                color: #FFEE86;
                text-decoration: none;
                font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
                font-weight: 500;
                letter-spacing: 2.5px;
                border-bottom: 1px solid transparent;
                transition: all 0.3s ease;
            }
            
            .footer-link:hover {
                border-bottom-color: #FFEE86;
                color: #A1EBE4;
            }
            
            /* MARKETING SECTION - COMMENTED OUT BY DEFAULT */
            /*
            .marketing-section {
                background: linear-gradient(135deg, #12545D 0%, #0A2E44 100%);
                padding: 25px 30px;
                margin: 20px 0;
                border-radius: 10px;
                border: 2px solid #A1EBE4;
                text-align: center;
            }
            
            .marketing-title {
                color: #A1EBE4;
                font-size: 22px;
                font-family: 'Montserrat', 'Arial Black', Arial, sans-serif;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 4.4px;
                margin: 0 0 10px 0;
            }
            
            .marketing-text {
                color: #FEF7F2;
                font-size: 16px;
                font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
                letter-spacing: 2.5px;
                line-height: 1.4;
                margin: 0 0 15px 0;
            }
            
            .marketing-cta {
                display: inline-block;
                background: #A1EBE4;
                color: #020202;
                padding: 12px 24px;
                border-radius: 25px;
                text-decoration: none;
                font-family: 'Montserrat', 'Arial Black', Arial, sans-serif;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 4.4px;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            
            .marketing-cta:hover {
                background: #12545D;
                color: #A1EBE4;
                border: 1px solid #A1EBE4;
            }
            */
            
            .copyright {
                color: #A1EBE4;
                font-size: 12px;
                font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
                letter-spacing: 2.5px;
                margin: 15px 0 0 0;
            }
            
            .divider {
                height: 2px;
                background: linear-gradient(90deg, transparent 0%, #C79535 50%, transparent 100%);
                margin: 20px 0;
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
                    font-size: 24px;
                    letter-spacing: 3px;
                }
                
                .header .subtitle {
                    font-size: 14px;
                    letter-spacing: 8px;
                }
                
                .content {
                    padding: 30px 20px;
                }
                
                .card {
                    padding: 20px;
                    margin: 20px 0;
                }
                
                .card-name {
                    font-size: 22px;
                    letter-spacing: 3px;
                }
                
                .card-position, .card-meaning {
                    letter-spacing: 3px;
                }
                
                .footer {
                    padding: 25px 20px;
                }
                
                .footer-message {
                    letter-spacing: 8px;
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
                        <p class="card-text">${card.text.replace(/\n/g, '<br>')}</p>
                    </div>
                `).join('')}
                
                <!-- MARKETING SECTION - UNCOMMENT TO ACTIVATE -->
                <!--
                <div class="marketing-section">
                    <h3 class="marketing-title">Ready for More Mystical Insights?</h3>
                    <p class="marketing-text">Join our exclusive community for weekly oracle guidance, special readings, and mystical wisdom delivered directly to your inbox.</p>
                    <a href="https://www.themagickmechanic.com/newsletter" class="marketing-cta">Join the Circle</a>
                </div>
                -->
            </div>
            
            <div class="footer">
                <p class="footer-message">May this reading illuminate your path forward</p>
                <p>Visit <a href="https://www.themagickmechanic.com" class="footer-link">The Magick Mechanic</a> for more mystical insights</p>
                <p class="copyright">© ${new Date().getFullYear()} Daniel Boutros and The Magick Mechanic. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;

    // Create simple text version with brand styling
    let textContent = `✨ Your ${reading.type} from The Magick Mechanic ✨\n\n`;
    textContent += `THE ORACLE HATH SPOKEN!\n`;
    textContent += `The Magickal cats have awakened to bring you this ${reading.type.toLowerCase()}. Each card carries wisdom meant specifically for you at this moment in your journey.\n\n`;
    textContent += '━'.repeat(50) + '\n\n';
    
    reading.cards.forEach((card, index) => {
      textContent += `${card.position.toUpperCase()}\n`;
      textContent += `${card.card.toUpperCase()}\n`;
      textContent += `${card.meaning.toUpperCase()} ENERGY\n\n`;
      textContent += `${card.text}\n`;
      if (index < reading.cards.length - 1) {
        textContent += '\n' + '─'.repeat(30) + '\n\n';
      }
    });
    
    textContent += '\n\n━'.repeat(50) + '\n';
    textContent += 'MAY THIS READING ILLUMINATE YOUR PATH FORWARD\n\n';
    textContent += 'Visit The Magick Mechanic at https://www.themagickmechanic.com for more mystical insights\n\n';
    textContent += `© ${new Date().getFullYear()} Daniel Boutros and The Magick Mechanic. All rights reserved.`;

    // Initialize Mailjet
    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY
    );

    // Send email with enhanced branded template
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
