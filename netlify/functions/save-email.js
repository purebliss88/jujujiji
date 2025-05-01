// netlify/functions/save-email.js
const mailchimp = require('@mailchimp/mailchimp_marketing');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  // CORS check
  const referer = event.headers.referer || '';
  const allowedDomains = [
    'themagickmechanic.com',
    'www.themagickmechanic.com',
    'dachshund-flamingo-5z5y.squarespace.com'
  ];
  
  const isAllowedOrigin = allowedDomains.some(domain => referer.includes(domain));
  
  // Set up headers for response
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (isAllowedOrigin) {
    try {
      new URL(referer);
      headers['Access-Control-Allow-Origin'] = new URL(referer).origin;
    } catch (e) {
      // Invalid URL, use default
      headers['Access-Control-Allow-Origin'] = 'https://www.themagickmechanic.com';
    }
  } else {
    headers['Access-Control-Allow-Origin'] = 'https://www.themagickmechanic.com';
  }

  try {
    const { email, reading } = JSON.parse(event.body);
    
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }
    
    // Configure Mailchimp
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX // e.g., "us1"
    });
    
    // Create formatted reading text
    let readingText = `Your ${reading.type} from The Magick Mechanic\n\n`;
    
    reading.cards.forEach(card => {
      readingText += `Position: ${card.position}\n`;
      readingText += `Card: ${card.card}\n`;
      readingText += `Meaning: ${card.meaning}\n`;
      readingText += `${card.text}\n\n`;
    });
    
    // Create HTML version with images
    let readingHtml = `<h1>Your ${reading.type} from The Magick Mechanic</h1>`;
    
    reading.cards.forEach(card => {
      readingHtml += `
        <div style="margin-bottom: 30px; border: 1px solid #4A0401; padding: 20px; border-radius: 10px;">
          <h2 style="color: #4A0401;">${card.position}</h2>
          <h3 style="color: #C79535;">Card: ${card.card}</h3>
          <img src="${card.imageUrl}" alt="${card.card}" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px;">
          <h4 style="color: #4A0401;">${card.meaning} Meaning</h4>
          <p style="color: #333;">${card.text}</p>
        </div>
      `;
    });
    
    // Add to Mailchimp list and send transactional email
    // First, check if subscriber exists
    try {
      // Add or update the subscriber
      await mailchimp.lists.setListMember(
        process.env.TMM2018, // Your audience ID
        email.toLowerCase(), // Subscriber hash (email lowercase MD5 hash)
        {
          email_address: email,
          status_if_new: "subscribed",
          merge_fields: {
            FNAME: "", // You can ask for name in your form to use here
            LNAME: "",
          }
        }
      );
      
      // Send the transactional email template
      // Note: You need to create a template in Mailchimp first
      await mailchimp.messages.sendTemplate({
        template_name: "oracle-reading", // Create this template in Mailchimp
        template_content: [
          {
            name: "reading_content",
            content: readingHtml
          }
        ],
        message: {
          subject: "Your Oracle Card Reading from The Magick Mechanic",
          from_email: "noreply@themagickmechanic.com",
          from_name: "Daniel Boutros @ The Magick Mechanic",
          to: [
            {
              email: email,
              type: "to"
            }
          ]
        }
      });
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          message: "Your reading has been sent to your email address."
        })
      };
      
    } catch (mailchimpError) {
      console.error('Mailchimp error:', mailchimpError);
      
      // Still return success to the user, but log the error
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          message: "Thank you for subscribing. We'll send your oracle reading shortly."
        })
      };
    }
    
  } catch (error) {
    console.log('Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
