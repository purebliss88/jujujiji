# Create the complete oracle-reader.js with embedded logos and proper fonts
# This will be the FULL file ready to copy-paste

complete_js = """/* ============================================================================
   THE MAGICK MECHANIC - ORACLE CARD READER
   Complete file with social sharing, email capture, and brand integration
   ============================================================================ */

/* ----------------------------------------------------------------------------
   SECTION 1: GLOBAL CSS STYLES
   All styling for the oracle reader interface, cards, buttons, and social sharing
   ---------------------------------------------------------------------------- */

const styles = `
  /* Main container */
  .oracle-reader {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Darker Grotesque', sans-serif;
    background: linear-gradient(135deg, #071037 0%, #161719 50%, #4A0401 100%);
    min-height: 100vh;
    color: #FEF7F2;
  }

  /* Header styles with Rasputin font */
  .oracle-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 20px;
  }

  .oracle-header h1 {
    font-family: 'Rasputin', serif;
    font-size: 3.5em;
    color: #FFEE86;
    margin: 0;
    letter-spacing: 4px;
    text-transform: uppercase;
  }

  .oracle-header p {
    font-family: 'Polarity Light', sans-serif;
    font-size: 1.3em;
    color: #A1EBE4;
    margin-top: 15px;
    letter-spacing: 1.11px;
  }

  /* Reading type selection */
  .reading-types {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .reading-type-btn {
    background: transparent;
    border: 2px solid #C79535;
    color: #FEF7F2;
    padding: 15px 30px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.1em;
    letter-spacing: 0.44px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
  }

  .reading-type-btn:hover {
    background: #C79535;
    color: #020202;
    transform: translateY(-2px);
  }

  .reading-type-btn.active {
    background: #C79535;
    color: #020202;
  }

  /* Card display area */
  .cards-container {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 40px 0;
    min-height: 500px;
  }

  .card {
    background: #161719;
    border: 3px solid #C79535;
    border-radius: 12px;
    padding: 20px;
    width: 280px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(199, 149, 53, 0.3);
  }

  .card img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .card-title {
    font-family: 'Rasputin', serif;
    font-size: 1.8em;
    color: #FFEE86;
    margin: 10px 0;
    letter-spacing: 0.44px;
  }

  .card-position {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 0.9em;
    color: #C79535;
    text-transform: uppercase;
    letter-spacing: 0.44px;
    margin-bottom: 10px;
  }

  .card-message {
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.1em;
    color: #FEF7F2;
    line-height: 1.6;
    letter-spacing: 0.25px;
  }

  /* Draw button */
  .draw-button {
    display: block;
    margin: 40px auto;
    padding: 20px 50px;
    background: #C79535;
    color: #020202;
    border: none;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.3em;
    letter-spacing: 0.44px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .draw-button:hover {
    background: #FFEE86;
    transform: scale(1.05);
  }

  .draw-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Email capture section */
  .email-section {
    background: rgba(22, 23, 25, 0.8);
    border: 2px solid #C79535;
    border-radius: 12px;
    padding: 40px;
    max-width: 600px;
    margin: 60px auto;
    text-align: center;
  }

  .email-section h2 {
    font-family: 'Rasputin', serif;
    font-size: 2.2em;
    color: #FFEE86;
    margin-bottom: 15px;
    letter-spacing: 0.44px;
  }

  .email-section p {
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.2em;
    color: #FEF7F2;
    margin-bottom: 25px;
    letter-spacing: 0.25px;
  }

  .email-form {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  .email-input {
    padding: 15px;
    border: 2px solid #C79535;
    border-radius: 8px;
    background: #020202;
    color: #FEF7F2;
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.1em;
  }

  .email-input:focus {
    outline: none;
    border-color: #FFEE86;
  }

  .email-submit {
    padding: 15px 30px;
    background: #C79535;
    color: #020202;
    border: none;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.1em;
    letter-spacing: 0.44px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .email-submit:hover {
    background: #FFEE86;
  }

  .email-success {
    color: #A1EBE4;
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.1em;
    margin-top: 15px;
  }

  /* Social sharing section - NEW */
  .social-sharing {
    background: rgba(22, 23, 25, 0.8);
    border: 2px solid #C79535;
    border-radius: 12px;
    padding: 40px;
    max-width: 600px;
    margin: 40px auto;
    text-align: center;
  }

  .social-sharing h3 {
    font-family: 'Rasputin', serif;
    font-size: 2em;
    color: #FFEE86;
    margin-bottom: 15px;
    letter-spacing: 0.44px;
  }

  .social-sharing p {
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.1em;
    color: #FEF7F2;
    margin-bottom: 25px;
    letter-spacing: 0.25px;
  }

  .social-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .social-btn {
    padding: 12px 24px;
    border: 2px solid #FEF7F2;
    background: transparent;
    color: #FEF7F2;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1em;
    letter-spacing: 0.44px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .social-btn:hover {
    background: #FEF7F2;
    color: #020202;
    transform: translateY(-2px);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .oracle-header h1 {
      font-size: 2.5em;
    }

    .card {
      width: 100%;
      max-width: 350px;
    }

    .reading-types {
      flex-direction: column;
      align-items: center;
    }

    .reading-type-btn {
      width: 100%;
      max-width: 300px;
    }

    .email-section,
    .social-sharing {
      padding: 25px;
    }

    .social-buttons {
      flex-direction: column;
      align-items: center;
    }

    .social-btn {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
`;

/* ----------------------------------------------------------------------------
   SECTION 2: SOCIAL SHARING FUNCTIONS
   These must be defined BEFORE the OracleCardReader function
   ---------------------------------------------------------------------------- */

/**
 * generateShareImage()
 * Creates a branded 1080x1350px image for Instagram/TikTok
 * Includes: card image, text overlay, and embedded logo watermarks
 */
async function generateShareImage(readingTitle, cards, positions) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1350; // Instagram/TikTok optimal ratio
    
    // BACKGROUND: Brand gradient (Dark Blue -> Charcoal -> Deep Red)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#071037');   // Dark Blue
    gradient.addColorStop(0.5, '#161719'); // Charcoal
    gradient.addColorStop(1, '#4A0401');   // Deep Red
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // BORDER: Gold accent border
    ctx.strokeStyle = '#C79535'; // Accent Gold
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // LOGOS: Base64-embedded brand logos (MW mark + URL logo)
    const logoURL = 'data:image/png;base64,""" + url_base64 + """';
    const logoMW = 'data:image/png;base64,""" + mw_base64 + """';
    
    // IMAGE LOADING: Track when all 3 images are loaded (card + 2 logos)
    let imagesLoaded = 0;
    const totalImages = 3;
    
    function checkComplete() {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        // All images loaded - export canvas as PNG
        canvas.toBlob((blob) => resolve({blob, canvas}), 'image/png', 0.95);
      }
    }
    
    // LOAD CARD IMAGE from oracle deck
    const cardImg = new Image();
    cardImg.crossOrigin = 'anonymous';
    
    cardImg.onload = () => {
      // Draw card image at top (centered, 400px wide, scaled height)
      const imgWidth = 400;
      const imgHeight = (cardImg.height / cardImg.width) * imgWidth;
      const imgX = (canvas.width - imgWidth) / 2;
      const imgY = 80;
      
      ctx.drawImage(cardImg, imgX, imgY, imgWidth, imgHeight);
      
      // CARD NAME: Large yellow text (Rasputin font style)
      ctx.fillStyle = '#FFEE86'; // Yellow
      ctx.font = 'bold 52px serif';
      ctx.textAlign = 'center';
      ctx.fillText(cards[0].title.toUpperCase(), canvas.width / 2, imgY + imgHeight + 60);
      
      // READING TYPE: Italic subtitle (Polarity Light font style)
      ctx.fillStyle = '#FEF7F2'; // Off-white
      ctx.font = 'italic 28px serif';
      ctx.fillText(\`In Their \${readingTitle}\`, canvas.width / 2, imgY + imgHeight + 110);
      
      // POSITION LABEL: Bold small caps (Montserrat font style)
      ctx.fillStyle = '#C79535'; // Accent Gold
      ctx.font = '600 24px sans-serif';
      ctx.fillText(positions[0].title.toUpperCase(), canvas.width / 2, imgY + imgHeight + 150);
      
      // CTA TEXT: Aqua call-to-action
      const ctaY = canvas.height - 280;
      ctx.fillStyle = '#A1EBE4'; // Aqua
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('Click to see what you get', canvas.width / 2, ctaY);
      ctx.fillText('and the guidance ✨', canvas.width / 2, ctaY + 50);
      
      // BRANDING: Main brand name at bottom
      const bottomY = canvas.height - 160;
      ctx.fillStyle = '#C79535'; // Accent Gold
      ctx.font = 'bold 42px serif';
      ctx.fillText('THE MAGICK MECHANIC', canvas.width / 2, bottomY);
      
      checkComplete();
    };
    
    cardImg.onerror = () => {
      // FALLBACK: If card image fails to load, use text-only version
      ctx.fillStyle = '#C79535';
      ctx.font = 'bold 48px serif';
      ctx.textAlign = 'center';
      ctx.fillText('SOMEONE GOT', canvas.width / 2, 200);
      
      ctx.fillStyle = '#FFEE86';
      ctx.font = 'bold 64px serif';
      ctx.fillText(cards[0].title.toUpperCase(), canvas.width / 2, 300);
      
      ctx.fillStyle = '#FEF7F2';
      ctx.font = 'italic 36px serif';
      ctx.fillText(\`In Their \${readingTitle}\`, canvas.width / 2, 370);
      
      ctx.fillStyle = '#C79535';
      ctx.font = '600 28px sans-serif';
      ctx.fillText(positions[0].title.toUpperCase(), canvas.width / 2, 430);
      
      const ctaY = canvas.height - 280;
      ctx.fillStyle = '#A1EBE4';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('Click to see what you get', canvas.width / 2, ctaY);
      ctx.fillText('and the guidance ✨', canvas.width / 2, ctaY + 50);
      
      const bottomY = canvas.height - 160;
      ctx.fillStyle = '#C79535';
      ctx.font = 'bold 42px serif';
      ctx.fillText('THE MAGICK MECHANIC', canvas.width / 2, bottomY);
      
      checkComplete();
    };
    
    // LOAD MW LOGO (bottom-left watermark)
    const mwImg = new Image();
    mwImg.onload = () => {
      const logoSize = 60;
      const logoY = canvas.height - 90;
      ctx.drawImage(mwImg, 80, logoY, logoSize, logoSize);
      checkComplete();
    };
    mwImg.onerror = () => {
      // Text fallback if logo fails
      ctx.fillStyle = '#C79535';
      ctx.font = 'bold 28px serif';
      ctx.textAlign = 'left';
      ctx.fillText('M✕W', 80, canvas.height - 50);
      checkComplete();
    };
    mwImg.src = logoMW;
    
    // LOAD URL LOGO (bottom-right watermark)
    const urlImg = new Image();
    urlImg.onload = () => {
      const logoWidth = 280;
      const logoHeight = (urlImg.height / urlImg.width) * logoWidth;
      const logoY = canvas.height - 80;
      ctx.drawImage(urlImg, canvas.width - logoWidth - 80, logoY, logoWidth, logoHeight);
      checkComplete();
    };
    urlImg.onerror = () => {
      // Text fallback if logo fails
      ctx.fillStyle = '#FFEE86';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('TheMagickMechanic.com', canvas.width - 80, canvas.height - 50);
      checkComplete();
    };
    urlImg.src = logoURL;
    
    // START: Load the card image to trigger the chain
    cardImg.src = cards[0].image_url;
  });
}

/**
 * shareToInstagram()
 * Downloads branded image + copies caption to clipboard for Instagram Stories
 */
async function shareToInstagram(readingTitle, cards, positions) {
  const {blob} = await generateShareImage(readingTitle, cards, positions);
  
  // Download image
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'oracle-reading-instagram.png';
  a.click();
  URL.revokeObjectURL(url);
  
  // Copy caption to clipboard
  const caption = \`Someone got \${cards[0].title} in their \${readingTitle}. Click to see what you get and the guidance! ✨\`;
  await navigator.clipboard.writeText(caption);
  
  alert('Image downloaded! Caption copied to clipboard. Now post to Instagram Stories!');
}

/**
 * shareToTikTok()
 * Downloads branded image + copies caption to clipboard for TikTok
 */
async function shareToTikTok(readingTitle, cards, positions) {
  const {blob} = await generateShareImage(readingTitle, cards, positions);
  
  // Download image
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'oracle-reading-tiktok.png';
  a.click();
  URL.revokeObjectURL(url);
  
  // Copy caption to clipboard
  const caption = \`Someone got \${cards[0].title} in their \${readingTitle}. Click to see what you get and the guidance! ✨\`;
  await navigator.clipboard.writeText(caption);
  
  alert('Image downloaded! Caption copied to clipboard. Now post to TikTok!');
}

/**
 * shareToFacebook()
 * Opens Facebook share dialog with text
 */
function shareToFacebook(readingTitle, cards) {
  const text = \`Someone got \${cards[0].title} in their \${readingTitle}. Click to see what you get and the guidance! ✨\`;
  const url = window.location.href;
  window.open(\`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(url)}&quote=\${encodeURIComponent(text)}\`, '_blank');
}

/**
 * shareToTwitter()
 * Opens Twitter share dialog with text
 */
function shareToTwitter(readingTitle, cards) {
  const text = \`Someone got \${cards[0].title} in their \${readingTitle}. Click to see what you get and the guidance! ✨\`;
  const url = window.location.href;
  window.open(\`https://twitter.com/intent/tweet?text=\${encodeURIComponent(text)}&url=\${encodeURIComponent(url)}\`, '_blank');
}

/**
 * shareToThreads()
 * Opens Threads share dialog with text
 */
function shareToThreads(readingTitle, cards) {
  const text = \`Someone got \${cards[0].title} in their \${readingTitle}. Click to see what you get and the guidance! ✨\`;
  const url = window.location.href;
  window.open(\`https://threads.net/intent/post?text=\${encodeURIComponent(text + ' ' + url)}\`, '_blank');
}

/* ----------------------------------------------------------------------------
   SECTION 3: MAIN ORACLE CARD READER CLASS
   Core functionality for card drawing, reading types, and UI management
   ---------------------------------------------------------------------------- */

function OracleCardReader() {
  // Reading type definitions with card positions
  const readingTypes = {
    single: {
      name: 'Single Card Reading',
      positions: [
        { title: 'Your Guidance', description: 'What you need to know right now' }
      ]
    },
    past_present_future: {
      name: 'Past, Present, Future',
      positions: [
        { title: 'Past', description: 'Where you\\'ve been' },
        { title: 'Present', description: 'Where you are now' },
        { title: 'Future', description: 'Where you\\'re headed' }
      ]
    },
    situation_action_outcome: {
      name: 'Situation, Action, Outcome',
      positions: [
        { title: 'Situation', description: 'What\\'s happening' },
        { title: 'Action', description: 'What to do' },
        { title: 'Outcome', description: 'Where it leads' }
      ]
    }
  };

  // Oracle card deck data
  const cards = [
    {
      id: 1,
      title: 'The Beauty',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882825434-L63IQFFQRNYXWAJQQ3CW/The+Beauty.jpg',
      message: 'Recognize and honor the inherent beauty within yourself and the world around you.'
    },
    {
      id: 2,
      title: 'The Protector',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882845090-Z8JJV0R8C1SQDJN1UQZB/The+Protector.jpg',
      message: 'Stand as a guardian for what matters most. Set boundaries and defend your sacred space.'
    },
    {
      id: 3,
      title: 'The Trickster',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882867333-02XODXIDSJGZ7CNFXVKV/The+Trickster.jpg',
      message: 'Embrace playfulness and see beyond illusions. Question assumptions and find wisdom in paradox.'
    },
    {
      id: 4,
      title: 'The Mystic',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882889442-YDQELXNBHM7OY7HBFK4R/The+Mystic.jpg',
      message: 'Trust your intuition and inner knowing. The answers you seek are within.'
    },
    {
      id: 5,
      title: 'The Lover',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882908764-XOQT1S1I38HVWJ67EFMG/The+Lover.jpg',
      message: 'Open your heart fully. Love and connection are your greatest strengths.'
    },
    {
      id: 6,
      title: 'The Healer',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882929219-7UMRN3Z5VJKWZ3GG9UYE/The+Healer.jpg',
      message: 'Embrace your power to restore and renew. Healing begins with compassion.'
    },
    {
      id: 7,
      title: 'The Shadow',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882949603-DLAJZXWBJ2GCTW1HY7QG/The+Shadow.jpg',
      message: 'Face what you\\'ve been avoiding. Integration of shadow brings wholeness.'
    },
    {
      id: 8,
      title: 'The Warrior',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882970691-6HSTG0HYFJ30WT0L2R6R/The+Warrior.jpg',
      message: 'Stand in your power with courage and conviction. Fight for what truly matters.'
    },
    {
      id: 9,
      title: 'The Innocent',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882990235-76WS38Q5DS5XVLQHF7RS/The+Innocent.jpg',
      message: 'See the world with fresh eyes. Purity of intention opens new possibilities.'
    },
    {
      id: 10,
      title: 'The Sage',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719883010907-EEYU5G1L9Z7P4ZU4KTVH/The+Sage.jpg',
      message: 'Step back and observe. Wisdom comes from perspective and patience.'
    }
  ];

  let currentReadingType = 'single';
  let drawnCards = [];

  // Initialize the interface
  function init() {
    // Inject CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create main container
    const container = document.createElement('div');
    container.className = 'oracle-reader';
    container.innerHTML = `
      <div class="oracle-header">
        <h1>Oracle Card Reader</h1>
        <p>Choose your reading type and draw your cards</p>
      </div>

      <div class="reading-types">
        <button class="reading-type-btn active" data-type="single">Single Card</button>
        <button class="reading-type-btn" data-type="past_present_future">Past, Present, Future</button>
        <button class="reading-type-btn" data-type="situation_action_outcome">Situation, Action, Outcome</button>
      </div>

      <button class="draw-button">Draw Cards</button>

      <div class="cards-container"></div>

      <!-- EMAIL CAPTURE SECTION -->
      <div class="email-section" style="display: none;">
        <h2>Want Your Full Reading Sent?</h2>
        <p>Enter your email and we'll send you the complete reading with detailed guidance.</p>
        <form class="email-form">
          <input type="email" class="email-input" placeholder="your@email.com" required>
          <button type="submit" class="email-submit">Send My Reading</button>
        </form>
        <div class="email-success" style="display: none;">✓ Reading sent! Check your inbox.</div>
      </div>

      <!-- SOCIAL SHARING SECTION -->
      <div class="social-sharing" style="display: none;">
        <h3>Share Your Reading</h3>
        <p>Let others discover what guidance awaits them!</p>
        <div class="social-buttons">
          <button class="social-btn instagram-btn">
            <span>📸</span> Instagram
          </button>
          <button class="social-btn tiktok-btn">
            <span>🎵</span> TikTok
          </button>
          <button class="social-btn facebook-btn">
            <span>📘</span> Facebook
          </button>
          <button class="social-btn twitter-btn">
            <span>🐦</span> Twitter
          </button>
          <button class="social-btn threads-btn">
            <span>🧵</span> Threads
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // Attach event listeners
    attachEventListeners();
  }

  // Attach all event listeners
  function attachEventListeners() {
    // Reading type buttons
    document.querySelectorAll('.reading-type-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.reading-type-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentReadingType = e.target.dataset.type;
        document.querySelector('.cards-container').innerHTML = '';
        document.querySelector('.email-section').style.display = 'none';
        document.querySelector('.social-sharing').style.display = 'none';
      });
    });

    // Draw button
    document.querySelector('.draw-button').addEventListener('click', drawCards);

    // Email form
    document.querySelector('.email-form').addEventListener('submit', handleEmailSubmit);

    // Social share buttons
    document.querySelector('.instagram-btn').addEventListener('click', () => {
      shareToInstagram(
        readingTypes[currentReadingType].name,
        drawnCards,
        readingTypes[currentReadingType].positions
      );
    });

    document.querySelector('.tiktok-btn').addEventListener('click', () => {
      shareToTikTok(
        readingTypes[currentReadingType].name,
        drawnCards,
        readingTypes[currentReadingType].positions
      );
    });

    document.querySelector('.facebook-btn').addEventListener('click', () => {
      shareToFacebook(
        readingTypes[currentReadingType].name,
        drawnCards
      );
    });

    document.querySelector('.twitter-btn').addEventListener('click', () => {
      shareToTwitter(
        readingTypes[currentReadingType].name,
        drawnCards
      );
    });

    document.querySelector('.threads-btn').addEventListener('click', () => {
      shareToThreads(
        readingTypes[currentReadingType].name,
        drawnCards
      );
    });
  }

  // Draw cards based on selected reading type
  function drawCards() {
    const reading = readingTypes[currentReadingType];
    const numCards = reading.positions.length;

    // Shuffle and select cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    drawnCards = shuffled.slice(0, numCards);

    // Display cards
    displayCards(drawnCards, reading.positions);

    // Show email and social sections
    document.querySelector('.email-section').style.display = 'block';
    document.querySelector('.social-sharing').style.display = 'block';
  }

  // Display drawn cards in the UI
  function displayCards(selectedCards, positions) {
    const container = document.querySelector('.cards-container');
    container.innerHTML = '';

    selectedCards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.innerHTML = `
        <img src="${card.image_url}" alt="${card.title}">
        <div class="card-position">${positions[index].title}</div>
        <div class="card-title">${card.title}</div>
        <div class="card-message">${card.message}</div>
      `;
      container.appendChild(cardEl);
    });
  }

  // Handle email form submission
  async function handleEmailSubmit(e) {
    e.preventDefault();
    
    const email = document.querySelector('.email-input').value;
    const reading = readingTypes[currentReadingType];

    try {
      const response = await fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('YOUR_API_KEY:YOUR_SECRET_KEY')
        },
        body: JSON.stringify({
          Messages: [{
            From: { Email: 'noreply@themagickmechanic.com', Name: 'The Magick Mechanic' },
            To: [{ Email: email }],
            Subject: `Your ${reading.name} Reading`,
            TextPart: `Your oracle reading:\\n\\n${drawnCards.map((card, i) => 
              `${reading.positions[i].title}: ${card.title}\\n${card.message}`
            ).join('\\n\\n')}`,
            HTMLPart: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #C79535;">Your ${reading.name}</h2>
                ${drawnCards.map((card, i) => `
                  <div style="margin: 30px 0; border-left: 3px solid #C79535; padding-left: 15px;">
                    <h3 style="color: #071037;">${reading.positions[i].title}</h3>
                    <h4 style="color: #FFEE86;">${card.title}</h4>
                    <p style="color: #161719;">${card.message}</p>
                  </div>
                `).join('')}
              </div>
            `
          }]
        })
      });

      if (response.ok) {
        document.querySelector('.email-form').style.display = 'none';
        document.querySelector('.email-success').style.display = 'block';
      }
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Failed to send email. Please try again.');
    }
  }

  // Start the application
  init();
}

/* ----------------------------------------------------------------------------
   SECTION 4: INITIALIZE ON PAGE LOAD
   Start the Oracle Card Reader when DOM is ready
   ---------------------------------------------------------------------------- */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', OracleCardReader);
} else {
  OracleCardReader();
}
