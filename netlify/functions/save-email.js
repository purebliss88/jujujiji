// netlify/functions/save-email.js
const mailchimp = require('@mailchimp/mailchimp_marketing');

exports.handler = async function(event, context) {
  // Set up CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': 'https://www.themagickmechanic.com',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS method for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST after passing preflight
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  // Add Content-Type for actual responses
  headers['Content-Type'] = 'application/json';

  try {
    // Parse request body
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    const { email, reading } = requestBody;
    
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }
    
    // Log incoming data
    console.log('Email:', email);
    console.log('Reading type:', reading.type);
    console.log('Cards:', reading.cards.length);
    
    try {
      // Configure Mailchimp
      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER_PREFIX
      });
      
      // Format reading for email body
      let readingText = `Your ${reading.type} from The Magick Mechanic\n\n`;
      reading.cards.forEach(card => {
        readingText += `Position: ${card.position}\n`;
        readingText += `Card: ${card.card}\n`;
        readingText += `Meaning: ${card.meaning}\n`;
        readingText += `${card.text}\n\n`;
      });
      
      // Add subscriber to list
      try {
        await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: "",
            READING: reading.type.substring(0, 50)
          }
        });
        
        console.log('Successfully added/updated subscriber');
      } catch (listError) {
        console.error('Mailchimp list error:', listError);
        // Continue to try to send email even if list subscription fails
      }
      
      // Try to send transactional email
      // Note: This might not be available on your Mailchimp plan
      try {
        const response = await mailchimp.messages.send({
          message: {
            subject: `Your ${reading.type} from The Magick Mechanic`,
            html: `<h1>Your Oracle Card Reading</h1><p>The Magickal Cats are excited to consult you!</p><p>Your reading will be available soon.</p>`,
            text: readingText,
            from_email: "noreply@themagickmechanic.com",
            from_name: "The Magick Mechanic",
            to: [{
              email: email,
              type: "to"
            }]
          }
        });
        
        console.log('Email sent:', response);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            success: true,
            message: "Thank you! Your reading is traveling through the ethers to your inbox."
          })
        };
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Return success but with fallback message
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            success: true,
            message: "Thank you for subscribing! We'll send your reading shortly."
          })
        };
      }
      
    } catch (mailchimpError) {
      console.error('Mailchimp setup error:', mailchimpError);
      
      // Return a user-friendly message even on error
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          message: "Thank you for subscribing! The cats are conjuring your reading."
        })
      };
    }
    
  } catch (error) {
    console.error('General error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
