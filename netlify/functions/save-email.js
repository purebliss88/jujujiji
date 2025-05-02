// netlify/functions/save-email.js
const mailchimp = require('@mailchimp/mailchimp_marketing');

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
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
    
    // Configure Mailchimp - use your actual API key and server prefix
    mailchimp.setConfig({
      apiKey: process.env.1a173cb58237f419b8ff61943560d09f-us3, // MAILCHIMP_API_KEY is after the first .
      server: process.env.us3 // e.g., "us3" MAILCHIMP_SERVER_PREFIX
    });
    
    try {
      // First log data for debugging
      console.log('Email:', email);
      console.log('Reading type:', reading.type);
      
      // Format reading for email body
      let readingText = `Your ${reading.type} from The Magick Mechanic\n\n`;
      reading.cards.forEach(card => {
        readingText += `Position: ${card.position}\n`;
        readingText += `Card: ${card.card}\n`;
        readingText += `Meaning: ${card.meaning}\n`;
        readingText += `${card.text}\n\n`;
      });
      
      // Add subscriber to list (but don't send email yet)
      try {
        await mailchimp.lists.addListMember(process.env.TMM2018, {  // MAILCHIMP_LIST_ID
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
        // Still proceed to try sending the transactional email
      }
      
      // Send a simple transactional email for now
      // We're not using a template here to keep it simple
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
      
    } catch (mailchimpError) {
      console.error('Mailchimp error:', mailchimpError);
      
      // Return a user-friendly message
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
