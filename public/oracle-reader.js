// Oracle Card Reader
(function() {
  const style = document.createElement('style');
  style.textContent = `
    #oracle-reader-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: inherit;
      scroll-behavior: smooth;
    }

    #oracle-reader-container * {
      box-sizing: border-box;
    }

    .oracle-button {
      background: #4A0401;
      color: #C79535;
      padding: 15px 30px;
      border: 3px solid #C79535;
      border-radius: 8px;
      cursor: pointer;
      font-size: 22px;
      font-weight: bold;
      transition: background 0.3s ease;
      margin: 20px auto;
      display: block;
    }
    
    .oracle-button:hover {
      background: #FFEE86;
      color: #4A0401;
    }
    
    .reading-options {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin: 40px 0;
      padding: 0;
      width: 100%;
    }
    
    .reading-card {
      background: #071037;
      border: 2px solid #C79535;
      border-radius: 12px;
      padding: 20px;
      color: white;
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 20px;
      min-height: 100px;
      width: 100%;
    }
    
    .reading-card:hover {
      transform: translateY(-5px);
      border-color: #FFEE86;
      background: rgba(7, 16, 55, 0.95);
    }
    
    .reading-thumbnail {
      width: 80px;
      height: 80px;
      min-width: 80px;
      border-radius: 8px;
      background: #4A0401;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      border: 2px solid #C79535;
    }
    
    .reading-info {
      flex: 1;
      text-align: left;
    }
    
    .reading-info h2 {
      margin: 0 0 8px 0;
      font-size: 1.1em;
      color: #C79535;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .reading-info p {
      margin: 0;
      font-size: 0.95em;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.4;
    }
    
    .card-display {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 30px;
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
      align-items: start;
    }
    
    .single-card-display {
      display: grid;
      grid-template-columns: 1fr;
      max-width: 500px;
      margin: 30px auto;
    }
    
    .reading-container {
      min-height: 700px;
      position: relative;
      transition: min-height 0.3s ease;
    }
    
    .reading-container[data-cards="1"] { min-height: 600px; }
    .reading-container[data-cards="3"] { min-height: 800px; }
    .reading-container[data-cards="6"] { min-height: 1000px; }
    .reading-container[data-cards="24"] { min-height: 2000px; }
    
    .drawing-area {
      min-height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .card-back {
      height: 150px;
      background: #071037;
      border: 1px solid #C79535;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .card-back:hover {
      transform: translateY(-5px);
    }
    
    .card-back-design {
      width: 80%;
      height: 80%;
      background: repeating-linear-gradient(
        45deg, 
        #4A0401, 
        #4A0401 10px, 
        #C79535 10px, 
        #C79535 20px
      );
      border-radius: 4px;
    }
    
    .tarot-card {
      background: #071037;
      border: 1px solid #C79535;
      border-radius: 12px;
      padding: 20px;
      color: white;
      max-width: 100%;
      box-sizing: border-box;
      word-wrap: break-word;
      overflow-wrap: break-word;
      height: fit-content;
    }
    
    .card-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    
    .card-content {
      margin-top: 15px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .card-content p {
      margin: 0 0 15px 0;
      line-height: 1.1;
      text-align: left;
    }
    
    .card-content h2 {
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .card-content h3 {
      word-wrap: break-word;
      overflow-wrap: break-word;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    .card-properties {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 15px 0;
      font-size: 0.9em;
    }
    
    .instruction-text {
      margin: 20px auto;
      font-style: italic;
      color: #FFEE86;
      font-size: 1em;
      padding: 15px 20px;
      background: rgba(7, 16, 55, 0.85);
      border: 1px solid #C79535;
      border-radius: 8px;
      max-width: 80%;
      text-align: center;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .position-title {
      background: #4A0401;
      color: #C79535;
      padding: 12px 15px;
      border-radius: 4px;
      margin-top: 0;
      margin-bottom: 15px;
      text-align: center;
      word-wrap: break-word;
      overflow-wrap: break-word;
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1.3;
      font-size: 0.95em;
    }

    .sub-instruction-text { 
      margin: 10px auto;
      color: #C79535;
      font-size: 0.9em;
      text-align: center;
    }

    .reading-title {
      text-align: center;
      color: #C79535;
      margin: 30px 0;
      font-size: 1.8em;
      background: #4A0401;
      padding: 20px;
      border-radius: 12px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      text-transform: uppercase;
      line-height: 1.1;
    }

    .email-form {
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      background: #161719;
      border: 2px solid #C79535;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(199, 149, 53, 0.2);
    }

    .email-form-title {
      color: #C79535;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 1.4em;
      font-weight: bold;
      font-family: 'Rasputin', Georgia, 'Times New Roman', serif;
      text-transform: uppercase;
      letter-spacing: 4.4px;
    }

    .email-form-description {
      color: #FEF7F2;
      margin-bottom: 25px;
      line-height: 1.2;
      font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
      letter-spacing: 2.5px;
    }

    .email-input-group {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .email-input {
      padding: 10px;
      border: 2px solid #C79535;
      border-radius: 8px;
      font-size: 16px;
      background: #FEF7F2;
      color: #020202;
      font-weight: 500;
      font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
      letter-spacing: 2.2px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .email-input::placeholder {
      color: #161719;
      font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
      letter-spacing: 2.2px;
    }

    .email-input:focus {
      outline: none;
      border-color: #FFEE86;
      box-shadow: 0 0 0 3px rgba(255, 238, 134, 0.2);
    }

    .email-submit {
      width: 100%;
      background: #4A0401;
      color: #C79535;
      border: 2px solid #C79535;
      padding: 15px 25px;
      font-size: 18px;
      font-weight: 600;
      font-family: 'Montserrat', 'Arial Black', Arial, sans-serif;
      text-transform: uppercase;
      letter-spacing: 4.4px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .email-submit:hover {
      background: #720400;
      color: #FFEE86;
      border-color: #FFEE86;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(199, 149, 53, 0.3);
    }

    .copyright-notice {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid rgba(199, 149, 53, 0.3);
      text-align: center;
      font-size: 0.8em;
      color: rgba(255, 255, 255, 0.7);
    }

    .new-reading-button {
      margin-top: 40px;
      min-height: auto;
    }

    /* Social Sharing Styles */
    .social-sharing {
      max-width: 600px;
      margin: 30px auto;
      padding: 25px;
      background: #161719;
      border: 2px solid #C79535;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(199, 149, 53, 0.2);
    }

    .social-sharing-title {
      color: #C79535;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 1.3em;
      font-family: 'Rasputin', Georgia, serif;
      text-transform: uppercase;
      letter-spacing: 4.4px;
    }

    .social-sharing-description {
      color: #FEF7F2;
      margin-bottom: 20px;
      font-family: 'Darker Grotesque', Arial, sans-serif;
      letter-spacing: 2.5px;
      line-height: 1.4;
    }

    .social-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }

    .social-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 18px;
      background: #020202;
      border: 2px solid #C79535;
      border-radius: 8px;
      color: #FEF7F2;
      font-family: 'Montserrat', Arial, sans-serif;
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: all 0.3s ease;
      cursor: pointer;
      min-width: 140px;
      justify-content: center;
    }

    .social-button:hover {
      background: #C79535;
      color: #020202;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(199, 149, 53, 0.4);
    }

    .social-button svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    @media (min-width: 769px) {
      .new-reading-button {
        margin-top: 15px;
      }
      
      .email-input-group {
        flex-direction: row;
      }
      
      .email-input {
        flex: 1;
      }
      
      .email-submit {
        width: auto;
      }
    }

    @media (max-width: 768px) {
      .card-display {
        grid-template-columns: 1fr;
      }
      
      .reading-card {
        flex-direction: column;
        text-align: center;
        padding: 25px;
      }
      
      .reading-info {
        text-align: center;
        width: 100%;
      }
      
      .reading-info h2 {
        font-size: 0.95em;
      }
      
      .instruction-text {
        max-width: 95%;
      }
      
      .position-title {
        min-height: 130px;
        font-size: 0.85em;
      }
      
      .reading-container[data-cards="1"] { min-height: 800px; }
      .reading-container[data-cards="3"] { min-height: 2400px; }
      .reading-container[data-cards="6"] { min-height: 4800px; }
      .reading-container[data-cards="24"] { min-height: 19200px; }
      
      .tarot-card {
        transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      
      .email-input-group {
        flex-direction: column;
      }
      
      .social-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .social-button {
        width: 80%;
        max-width: 250px;
      }
    }

    @media (min-width: 769px) {
      .tarot-card {
        transition: transform 0.5s ease-in-out;
      }
    }
    
    @keyframes cardReveal {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .card-reveal {
      animation: cardReveal 0.8s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
  
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('load', setViewportHeight);
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', () => { setTimeout(setViewportHeight, 100); });
  
  function formatText(text) {
    if (!text) return null;
    return text.split('\n').map((paragraph, index) => 
      React.createElement("p", { key: index }, paragraph)
    );
  }
  
  // Social Sharing Functions - DEFINED BEFORE OracleCardReader
  async function generateShareImage(readingTitle, cards, positions) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1080;
      canvas.height = 1080;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#071037');
      gradient.addColorStop(0.5, '#161719');
      gradient.addColorStop(1, '#4A0401');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = '#C79535';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      
      ctx.fillStyle = '#C79535';
      ctx.font = 'bold 48px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('SOMEONE GOT', canvas.width / 2, 120);
      
      ctx.fillStyle = '#FFEE86';
      ctx.font = 'bold 56px Arial, sans-serif';
      ctx.fillText(cards[0].title.toUpperCase(), canvas.width / 2, 200);
      
      ctx.fillStyle = '#FEF7F2';
      ctx.font = 'italic 32px Arial, sans-serif';
      ctx.fillText(`In Their ${readingTitle}`, canvas.width / 2, 260);
      
      const cardY = 350;
      const cardHeight = 100;
      const spacing = 20;
      
      cards.slice(0, 3).forEach((card, index) => {
        const y = cardY + (index * (cardHeight + spacing));
        ctx.fillStyle = '#020202';
        ctx.fillRect(60, y, canvas.width - 120, cardHeight);
        ctx.strokeStyle = '#C79535';
        ctx.lineWidth = 3;
        ctx.strokeRect(60, y, canvas.width - 120, cardHeight);
        ctx.fillStyle = '#FFEE86';
        ctx.font = 'bold 26px Arial, sans-serif';
        ctx.fillText(card.title, canvas.width / 2, y + 40);
        ctx.fillStyle = '#FEF7F2';
        ctx.font = '20px Arial, sans-serif';
        ctx.fillText(positions[index].title, canvas.width / 2, y + 70);
      });
      
      const ctaY = canvas.height - 280;
      ctx.fillStyle = '#A1EBE4';
      ctx.font = 'bold 32px Arial, sans-serif';
      ctx.fillText('Click to see what you get', canvas.width / 2, ctaY);
      ctx.fillText('and the guidance ✨', canvas.width / 2, ctaY + 40);
      
      const bottomY = canvas.height - 180;
      ctx.fillStyle = '#C79535';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.fillText('THE MAGICK MECHANIC', canvas.width / 2, bottomY);
      
      ctx.fillStyle = '#FFEE86';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.fillText('TheMagickMechanic.com', canvas.width / 2, bottomY + 60);
      
      canvas.toBlob((blob) => resolve({blob, canvas}), 'image/png', 0.9);
    });
  }

  async function shareToInstagram(readingTitle, cards, positions) {
    const {blob} = await generateShareImage(readingTitle, cards, positions);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'oracle-reading-instagram.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const cardNames = cards.map(c => c.title).join(', ');
    const caption = `Someone got ${cardNames} in their ${readingTitle}. Click to see what you get for your guidance! ✨\n\nGet your own reading: https://www.themagickmechanic.com/magick-cat-oracle-daniel-boutros\n\n#OracleCards #Mystical #TheMagickMechanic #SpiritualGuidance #Tarot`;
    await navigator.clipboard.writeText(caption);
    alert('🖼️ Image downloaded!\n📋 Caption copied to clipboard.\n\nUpload to Instagram and paste the caption ✨');
  }

  async function shareToTikTok(readingTitle, cards, positions) {
    const {blob} = await generateShareImage(readingTitle, cards, positions);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'oracle-reading-tiktok.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const cardNames = cards.map(c => c.title).join(', ');
    const caption = `Someone got ${cardNames} in their ${readingTitle}. Click to see what you get and the guidance! ✨\n\nGet your mystical reading at TheMagickMechanic.com\n\n#OracleCards #Mystical #WitchTok #SpiritualGuidance #TikTokMystic`;
    await navigator.clipboard.writeText(caption);
    alert('🎬 Image downloaded for TikTok!\n📋 Caption copied.\n\nUpload as a photo or use in your video ✨');
  }

  function shareToFacebook(readingTitle) {
    const url = 'https://www.themagickmechanic.com/magick-cat-oracle-daniel-boutros';
    const text = `Just got my ${readingTitle} from The Magick Mechanic! The Magickal Cat Oracle is speaking... ✨`;
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(fbUrl, '_blank', 'width=600,height=400');
  }

  function shareToTwitter(readingTitle) {
    const url = 'https://www.themagickmechanic.com/magick-cat-oracle-daniel-boutros';
    const text = `Just got my ${readingTitle} from The Magick Mechanic! The Magickal Cat Oracle is speaking... ✨\n\n${url}\n\n#OracleCards #Mystical #SpiritualGuidance`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  }

  function shareToThreads(readingTitle) {
    const url = 'https://www.themagickmechanic.com/magick-cat-oracle-daniel-boutros';
    const text = `Just got my ${readingTitle} from The Magick Mechanic! The Magickal Cat Oracle is speaking... ✨\n\n${url}`;
    const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`;
    window.open(threadsUrl, '_blank', 'width=600,height=400');
  }
  
  function OracleCardReader() {
    const readingConfigurations = {
      single: {
        title: "Single Card Reading",
        description: "Feel a question in your heart and draw a card for guidance",
        cardCount: 1,
        emoji: "🔮",
        positions: [{ title: "Your Guidance" }]
      },
      forces_decision: {
        title: "Forces Behind a Big Decision",
        description: "What forces are at play around your big decision?",
        cardCount: 5,
        emoji: "⚖️",
        positions: [
          { title: "Key force(s) moving in support of your decision" },
          { title: "Energies you're being drawn or inspired by" },
          { title: "Key force(s) moving against your decision" },
          { title: "Energies you're feeling fear around" },
          { title: "What you can embody to improve the outcome?" }
        ]
      },
      situation_action_outcome: {
        title: "Help me See my Blind Spot",
        description: "What is creating undesired parts of my reality?",
        cardCount: 6,
        emoji: "🎯",
        positions: [
          { title: "Situation - The current challenge" },
          { title: "What is my hidden fear?" },
          { title: "What is my hidden desire?" },
          { title: "What is my mask or falsehood?" },
          { title: "What is my truth under the mask?" },
          { title: "What can I do to become the truth?" },
        ]
      },
      path_to_success: {
        title: "Your Path to Success",
        description: "What does the path look like for you achieving your vision?",
        cardCount: 7,
        emoji: "🌟",
        positions: [
          { title: "How I got here - What qualities did you most embody" },
          { title: "The present - What qualities do you embody most now" },
          { title: "Friction - What keeps you away from your desire" },
          { title: "Your Powers - What must you embody now to best succeed" },
          { title: "Support - The types of people who will support your quest" },
          { title: "Signals - Energies that tell you you're on the right path" },
          { title: "Reward - The gifts that will come from success" }
        ]
      },
      relationship: {
        title: "Relationship Reading",
        description: "What hidden forces exist between you?",
        cardCount: 11,
        emoji: "💕",
        positions: [
          { title: "Who you are being in this dynamic" },
          { title: "Who they are being in this dynamic" },
          { title: "What is your hidden desire?" },
          { title: "What is their hidden desire?" },
          { title: "What is your hidden fear?" },
          { title: "What is their hidden fear?" },
          { title: "What is destructive in your behavior" },
          { title: "What is destructive in their behavior" },
          { title: "What is healthy in the dynamic" },
          { title: "What qualities can you embody to improve the dynamic" },
          { title: "The change that will occur if successful" }
        ]
      },
      business: {
        title: "Business Reading",
        description: "The current energetic arc of your business",
        cardCount: 24,
        emoji: "💼",
        positions: [
          { title: "The energy of your biz: past" },
          { title: "The energy of your biz: present" },
          { title: "The energy of your biz during next 3 months" },
          { title: "Market and Customers: past" },
          { title: "Market and Customers: present" },
          { title: "Market and Customers during next 3 months" },
          { title: "Product and Offering: past" },
          { title: "Product and Offering: present" },
          { title: "Product and Offering during next 3 months" },
          { title: "Ops and Execution: past" },
          { title: "Ops and Execution: present" },
          { title: "Ops and Execution: next 3 months" },
          { title: "Finances and Resources: past" },
          { title: "Finances and Resources: present" },
          { title: "Finances and Resources during next 3 months" },
          { title: "Strategy and Timing: past" },
          { title: "Strategy and Timing: present" },
          { title: "Strategy and Timing during next 3 months" },
          { title: "Biggest threat right now" },
          { title: "Biggest opportunity right now" },
          { title: "What is working against your biz" },
          { title: "What do you most need to embody" },
          { title: "What does your plan need to embody" },
          { title: "How your biz looks in 3 months" }
        ]
      }
    };
    
    const [readingType, setReadingType] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [selectedCards, setSelectedCards] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [activeConfig, setActiveConfig] = React.useState(null);
    
    React.useEffect(() => {
      async function fetchCards() {
        try {
          setLoading(true);
          const response = await fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/get-oracle-cards?token=jTaXzPBxBLuKHfLXsjqCqLmJTTJ3ArCSZ15Hgzy23');
          if (!response.ok) throw new Error('Failed to load cards. The cats might be asleep.');
          const data = await response.json();
          setCards(data);
          setLoading(false);
        } catch (err) {
          setError('Unable to load cards. Please try again.');
          setLoading(false);
        }
      }
      fetchCards();
      setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 100);
    }, []);
    
    React.useEffect(() => {
      if (activeConfig && selectedCards.length === activeConfig.cardCount) {
        setTimeout(() => {
          const resultsArea = document.getElementById('reading-results');
          if (resultsArea) {
            resultsArea.style.opacity = '0';
            resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            setTimeout(() => {
              resultsArea.style.transition = 'opacity 0.5s ease';
              resultsArea.style.opacity = '1';
            }, 100);
          }
        }, 300);
      }
    }, [selectedCards.length, activeConfig]);
    
    const shuffleCards = () => {
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setCards(shuffled);
    };
    
    const drawCard = () => {
      if (!activeConfig || selectedCards.length >= activeConfig.cardCount || cards.length === 0) return;
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = cards[randomIndex];
      const meaning = Math.random() > 0.5 ? 'sun_meaning' : 'moon_meaning';
      setSelectedCards([...selectedCards, {...card, displayMeaning: meaning}]);
      setCards(cards.filter((_, index) => index !== randomIndex));
      setTimeout(() => {
        const drawingArea = document.getElementById('drawing-area');
        if (drawingArea) drawingArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    };
    
    const resetReading = () => {
      setReadingType(null);
      setSelectedCards([]);
      setActiveConfig(null);
      setTimeout(() => {
        const oracleContainer = document.getElementById('oracle-reader-container');
        if (oracleContainer) {
          const containerRect = oracleContainer.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: containerRect.top + scrollTop - 100, behavior: 'smooth' });
        } else {
          const readingOptions = document.querySelector('.reading-options');
          if (readingOptions) {
            readingOptions.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => { window.scrollBy(0, -150); }, 300);
          }
        }
      }, 100);
      async function fetchCards() {
        try {
          setLoading(true);
          const response = await fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/get-oracle-cards?token=jTaXzPBxBLuKHfLXsjqCqLmJTTJ3ArCSZ15Hgzy23');
          if (!response.ok) throw new Error('Sleeping cats.');
          const data = await response.json();
          setCards(data);
          setLoading(false);
        } catch (err) {
          setError('Unable to load cards. Please try again later.');
          setLoading(false);
        }
      }
      fetchCards();
    };
    
    if (loading) {
      return React.createElement("div", { className: "drawing-area" },
        React.createElement("p", { className: "instruction-text" }, "Summoning the cats...")
      );
    }
    
    if (error) {
      return React.createElement("div", { className: "drawing-area" },
        React.createElement("p", { className: "instruction-text" }, error),
        React.createElement("button", { className: "oracle-button", onClick: () => window.location.reload() }, "Try Again")
      );
    }
    
    if (!readingType) {
      return React.createElement("div", { className: "reading-options" }, 
        Object.keys(readingConfigurations).map(configKey => {
          const config = readingConfigurations[configKey];
          return React.createElement("div", { 
            className: "reading-card", 
            key: configKey,
            onClick: () => {
              shuffleCards();
              setReadingType(configKey);
              setActiveConfig(config);
              setTimeout(() => {
                const drawingArea = document.getElementById('drawing-area');
                if (drawingArea) drawingArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 200);
            }
          }, [
            React.createElement("div", { className: "reading-thumbnail", key: "thumb" }, config.emoji),
            React.createElement("div", { className: "reading-info", key: "info" }, [
              React.createElement("h2", { key: "title" }, config.title),
              React.createElement("p", { key: "desc" }, config.description)
            ])
          ]);
        })
      );
    }
    
    if (activeConfig && selectedCards.length < activeConfig.cardCount) {
      const currentPosition = activeConfig.positions[selectedCards.length];
      return React.createElement("div", { className: "reading-container", "data-cards": activeConfig.cardCount }, [
        React.createElement("div", { className: "drawing-area", id: "drawing-area", key: "drawing" }, [
          React.createElement("p", { className: "instruction-text", key: "instruction" },
            `Drawing card ${selectedCards.length + 1} of ${activeConfig.cardCount}: ${currentPosition.title}`),
          React.createElement("p", { className: "sub-instruction-text", key: "sub" }, "Focus on this aspect as you draw your card"),
          React.createElement("button", { className: "oracle-button", onClick: drawCard, key: "button" }, "Draw Card")
        ])
      ]);
    }
    
    return React.createElement("div", { className: "reading-container", "data-cards": activeConfig.cardCount }, [
      React.createElement("div", { className: "reading-title", key: "title" }, activeConfig.title),
      React.createElement("div", { 
        className: activeConfig.cardCount === 1 ? "single-card-display" : "card-display",
        id: "reading-results",
        key: "results"
      },
        selectedCards.map((card, index) => 
          React.createElement("div", { key: index, className: "tarot-card card-reveal" }, [
            React.createElement("h3", { className: "position-title", key: "pos" }, activeConfig.positions[index].title),
            React.createElement("img", { className: "card-image", src: card.image_url, alt: card.title, key: "img" }),
            React.createElement("div", { className: "card-content", key: "content" }, [
              React.createElement("h2", { key: "name" }, card.title),
              React.createElement("div", { className: "card-properties", key: "props" }, [
                React.createElement("p", { key: "time" }, `Time: ${card.time}`),
                React.createElement("p", { key: "energy" }, `Energy: ${card.energy}`),
                React.createElement("p", { key: "location" }, `Location: ${card.location}`),
                React.createElement("p", { key: "element" }, `Element: ${card.element}`)
              ]),
              React.createElement("h3", { key: "meaning-type" }, card.displayMeaning === 'sun_meaning' ? "Sun Meaning" : "Moon Meaning"),
              formatText(card[card.displayMeaning])
            ])
          ])
        )
      ),
      
      React.createElement("div", { className: "email-form", key: "email" }, [
        React.createElement("h3", { className: "email-form-title", key: "email-title" }, "Send this reading to your email inbox!"),
        React.createElement("p", { className: "email-form-description", key: "email-desc" }, 
          "Enter your email address to receive a copy of your reading and future insights:"),
        React.createElement("div", { className: "email-input-group", key: "email-group" }, [
          React.createElement("input", {
            type: "email", className: "email-input", placeholder: "Your email address",
            id: "user-email", key: "email-input"
          }),
          React.createElement("button", {
            className: "oracle-button email-submit",
            key: "email-button",
            onClick: (e) => {
              e.preventDefault();
              const email = document.getElementById('user-email').value;
              if (email && email.includes('@')) {
                fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/mailjet-reading', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: email,
                    reading: {
                      type: activeConfig.title,
                      cards: selectedCards.map((card, i) => ({
                        position: activeConfig.positions[i].title,
                        card: card.title,
                        meaning: card.displayMeaning === 'sun_meaning' ? 'Sun' : 'Moon',
                        text: card[card.displayMeaning],
                        imageUrl: card.image_url
                      }))
                    }
                  })
                })
                .then(r => r.json())
                .then(data => {
                  if (data.success) {
                    alert('Thank you! This reading has been sent to your email.');
                  } else {
                    alert('Failed to send your reading: ' + (data.message || 'Unknown error'));
                    console.error('Email error:', data);
                  }
                })
                .catch(err => {
                  console.error('Error:', err);
                  alert('The cats got distracted and failed to send your reading. Please try again later.');
                });
              } else {
                alert('Please enter a valid email address.');
              }
            }
          }, "Send My Reading")
        ])
      ]),
      
      React.createElement("div", { className: "social-sharing", id: "social-sharing", key: "social" }, [
        React.createElement("h3", { className: "social-sharing-title", key: "social-title" }, "Share Your Reading"),
        React.createElement("p", { className: "social-sharing-description", key: "social-desc" }, 
          "Spread the mystical energy! Share your oracle wisdom and invite others to discover their path."),
        React.createElement("div", { className: "social-buttons", key: "social-buttons" }, [
          React.createElement("button", {
            className: "social-button", key: "instagram",
            onClick: () => shareToInstagram(activeConfig.title, selectedCards, activeConfig.positions)
          }, [
            React.createElement("svg", { viewBox: "0 0 24 24", key: "ig-svg" }, 
              React.createElement("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" })),
            "Instagram"
          ]),
          React.createElement("button", {
            className: "social-button", key: "tiktok",
            onClick: () => shareToTikTok(activeConfig.title, selectedCards, activeConfig.positions)
          }, [
            React.createElement("svg", { viewBox: "0 0 24 24", key: "tt-svg" },
              React.createElement("path", { d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" })),
            "TikTok"
          ]),
          React.createElement("button", {
            className: "social-button", key: "facebook",
            onClick: () => shareToFacebook(activeConfig.title)
          }, [
            React.createElement("svg", { viewBox: "0 0 24 24", key: "fb-svg" },
              React.createElement("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })),
            "Facebook"
          ]),
          React.createElement("button", {
            className: "social-button", key: "twitter",
            onClick: () => shareToTwitter(activeConfig.title)
          }, [
            React.createElement("svg", { viewBox: "0 0 24 24", key: "tw-svg" },
              React.createElement("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })),
            "Twitter"
          ]),
          React.createElement("button", {
            className: "social-button", key: "threads",
            onClick: () => shareToThreads(activeConfig.title)
          }, [
            React.createElement("svg", { viewBox: "0 0 24 24", key: "th-svg" },
              React.createElement("path", { d: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291 2.257-.13 4.102.633 5.05 2.094.176.27.323.56.438.86C15.607 11.817 15.623 12 15.623 12.186l.015.036c.053.228.143.54.286.926.383 1.036 1.024 2.077 1.945 3.086.922 1.01 2.098 1.932 3.527 2.739l-.706 1.821c-1.429-.807-2.698-1.729-3.787-2.738-.918-.851-1.625-1.748-2.127-2.686-.182.311-.394.605-.634.88-1.101 1.26-2.669 1.955-4.538 2.01l-.01.002-.01-.002c-1.868-.055-3.437-.75-4.537-2.01-1.164-1.337-1.78-3.15-1.78-5.25s.616-3.913 1.78-5.25c1.101-1.26 2.67-1.955 4.538-2.01h.02c1.869.055 3.437.75 4.538 2.01.24.275.452.569.634.88.502-.938 1.209-1.835 2.127-2.686 1.089-1.009 2.358-1.931 3.787-2.738l.706 1.821c-1.429.807-2.605 1.729-3.527 2.739-.922 1.009-1.562 2.05-1.945 3.086-.143.386-.233.698-.286.926l-.015.036S15.607 12.183 15.623 12c0-.186-.016-.369-.143-.723-.115-.3-.262-.59-.438-.86-.948-1.461-2.793-2.224-5.05-2.094-1.464.084-2.703.531-3.583 1.291-.922.797-1.395 1.892-1.33 3.082.067 1.224.689 2.275 1.752 2.964.898.583 2.057.866 3.259.801 1.59-.086 2.844-.688 3.73-1.79.662-.826 1.092-1.92 1.284-3.272.761.45 1.324 1.04 1.634 1.75.528 1.205.557 3.185-1.09 4.798-1.442 1.414-3.177 2.025-5.8 2.045z" })),
            "Threads"
          ])
        ])
      ]),
      
      React.createElement("div", { className: "drawing-area new-reading-button", key: "new-reading" },
        React.createElement("button", { className: "oracle-button", onClick: resetReading }, "Start New Reading")
      ),
      
      React.createElement("div", { className: "copyright-notice", key: "copyright" }, [
        React.createElement("p", null, [
          "Copyright 2026 The Magick Mechanic and Daniel Boutros. All rights reserved.",
          React.createElement("br"),
          "This Oracle Card Reader and all card content are protected by copyright law. Unauthorized reproduction, distribution, or use of these cards or readings is prohibited."
        ])
      ])
    ]);
  }

  const domContainer = document.getElementById('oracle-reader-container');
  ReactDOM.render(React.createElement(OracleCardReader), domContainer);
})();
