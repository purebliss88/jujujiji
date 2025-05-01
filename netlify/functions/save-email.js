// netlify/functions/save-email.js

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  // Check referer more strictly
  const referer = event.headers.referer || '';
  const allowedDomains = [
    'themagickmechanic.com',
    'www.themagickmechanic.com',
    'dachshund-flamingo-5z5y.squarespace.com'
  ];
  
  const isAllowedOrigin = allowedDomains.some(domain => referer.includes(domain));
  
  // If production mode, strictly enforce referer
  if (process.env.NODE_ENV === 'production' && !isAllowedOrigin) {
    return { 
      statusCode: 403, 
      body: JSON.stringify({ error: 'Unauthorized' }) 
    };
  }

  try {
    const { email, reading } = JSON.parse(event.body);
    
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }
    
    // Here you would typically:
    // 1. Save to a database (e.g., Firebase, MongoDB, etc.)
    // 2. Send an email (using Mailgun, SendGrid, etc.)
    
    console.log('Received email:', email);
    console.log('Reading data:', reading);
    
    // Store the email in a simple text file for now
    // In a real implementation, you would use a proper database or email service
    // This is just a simple example to get you started
    
    // Create formatted reading text
    let readingText = `${reading.type}\n\n`;
    
    reading.cards.forEach(card => {
      readingText += `Position: ${card.position}\n`;
      readingText += `Card: ${card.card}\n`;
      readingText += `Meaning: ${card.meaning}\n`;
      readingText += `${card.text}\n\n`;
    });
    
    // Log the formatted reading
    console.log('Email to send:');
    console.log(`To: ${email}`);
    console.log(`Subject: Your Oracle Card Reading from The Magick Mechanic`);
    console.log(`Body: ${readingText}`);
    
    // Integration with email service would go here
    // For example, using SendGrid, Mailchimp, etc.
    // Here's an example of how you might integrate with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: email,
      from: 'readings@themagickmechanic.com',
      subject: 'Your Oracle Card Reading from The Magick Mechanic',
      text: readingText,
      html: readingHtml,  // You could create an HTML version of the reading
    };
    
    await sgMail.send(msg);
    */
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: "Your reading has been recorded! In the future, we'll email this to you."
      })
    };
  } catch (error) {
    console.log('Error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
