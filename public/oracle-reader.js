// Oracle Card Reader
(function() {
  // Create styles
  const style = document.createElement('style');
  style.textContent = `
    #oracle-reader-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: inherit;
      scroll-behavior: smooth;
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
      margin: 20px 0;
    }
    
    .oracle-button:hover {
      background: #FFEE86;
      color: #4A0401;
    }
    
    .reading-options {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 40px auto;
      max-width: 800px;
      padding: 0;  /* ADD THIS - remove default padding */
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
    }
    
    .reading-card:hover {
      transform: translateX(5px);
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
    
    /* Special single card display to center it */
    .single-card-display {
      display: grid;
      grid-template-columns: 1fr;
      max-width: 500px;
      margin: 30px auto;
    }
    
    /* Reading container screen jump protection */
    .reading-container {
      min-height: 700px;
      position: relative;
      transition: min-height 0.3s ease;
    }
    
    /* Different heights for different reading types */
    .reading-container[data-cards="1"] { min-height: 600px; }
    .reading-container[data-cards="3"] { min-height: 800px; }
    .reading-container[data-cards="6"] { min-height: 1000px; }
    .reading-container[data-cards="24"] { min-height: 2000px; }
    
    .drawing-area {
      min-height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
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
      contain: layout style paint;
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
      margin: 0 0 10px 0;
      line-height: 1.5;
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
      font-weight: bold;
      font-family: 'Montserrat', 'Arial Black', Arial, sans-serif;
      font-weight: 600;
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
      /* Single column layout for cards on mobile */
      .card-display {
        grid-template-columns: 1fr;
      }
      
      /* Wider reading type buttons on mobile */
      .reading-card {
        flex-direction: column;
        text-align: center;
        padding: 25px;
        width: 100%;
        max-width: 100%;
        margin: 0;  /* ADD THIS - remove any margin offset */
      }
      
      .reading-options {
        padding: 20px 0;  /* Changed from 20px 10px - no side padding */
        margin: 40px 0;   /* Changed from 40px auto - no auto margin */
        max-width: 100%;
        width: 100%;      /* ADD THIS - full width */
      }
      
      .reading-info {
        text-align: center;
        width: 100%;
      }
      
      .reading-info h2 {
        font-size: 0.95em; /* Changed from 1.1em - even smaller on mobile */
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
    }

    @media (min-width: 769px) {
      .tarot-card {
        transition: transform 0.5s ease-in-out;
      }
    }
    
    @keyframes cardReveal {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .card-reveal {
      animation: cardReveal 0.8s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
  
  // Device detection utility
  const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
    const screenWidth = window.innerWidth;
    
    if (isMobile && screenWidth < 768) return 'mobile';
    if (isTablet || (screenWidth >= 768 && screenWidth < 1024)) return 'tablet';
    return 'desktop';
  };

  // Viewport height fix for mobile browsers
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Initialize viewport fixes
  window.addEventListener('load', setViewportHeight);
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
  });
  
  // Helper function to format text with paragraphs
  function formatText(text) {
    if (!text) return null;
    return text.split('\n').map((paragraph, index) => 
      React.createElement("p", { key: index }, paragraph)
    );
  }
  
  // React component for Oracle Card Reader
  function OracleCardReader() {
    // Add reading configurations
    const readingConfigurations = {
      single: {
        title: "Single Card Reading",
        description: "Feel a question in your heart and draw a card for guidance",
        cardCount: 1,
        emoji: "🔮",
        positions: [
          { title: "Your Guidance" }
        ]
      },
      situation_action_outcome: {
        title: "Situation, Action, Outcome",
        description: "Explore your current challenge and how to address it",
        cardCount: 3,
        emoji: "🎯",
        positions: [
          { title: "Situation - The current challenge" },
          { title: "Action - What to do" },
          { title: "Outcome - The result of taking action" }
        ]
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
          { title: "Support - The types of people who will be supportive to your quest" },
          { title: "Signals - What energies will be present when I'm on the right path?" },
          { title: "Reward - The gifts that will come from success" }
        ]
      },
      relationship: {
        title: "Relationship Reading",
        description: "What hidden forces exist between you?",
        cardCount: 8,
        emoji: "💕",
        positions: [
          { title: "Who you are being in this dynamic" },
          { title: "Who they are being in this dynamic" },
          { title: "What is your hidden desire?" },
          { title: "What is their hidden desire?" },
          { title: "What is destructive in the dynamic" },
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
    
    // State variables
    const [readingType, setReadingType] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [selectedCards, setSelectedCards] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [activeConfig, setActiveConfig] = React.useState(null);
    
    // Fetch cards when component mounts
    React.useEffect(() => {
      async function fetchCards() {
        try {
          setLoading(true);
          
          const response = await fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/get-oracle-cards?token=jTaXzPBxBLuKHfLXsjqCqLmJTTJ3ArCSZ15Hgzy23');
          
          if (!response.ok) {
            throw new Error('Failed to load cards. The cats might be asleep.');
          }
          
          const data = await response.json();
          setCards(data);
          setLoading(false);
        } catch (err) {
          setError('Unable to load cards. Please try again.');
          setLoading(false);
        }
      }
      
      fetchCards();
      
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }, []);
    
    // Improved scrolling behavior
    React.useEffect(() => {
      if (activeConfig && selectedCards.length === activeConfig.cardCount) {
        setTimeout(() => {
          const resultsArea = document.getElementById('reading-results');
          if (resultsArea) {
            resultsArea.style.opacity = '0';
            resultsArea.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
            
            setTimeout(() => {
              resultsArea.style.transition = 'opacity 0.5s ease';
              resultsArea.style.opacity = '1';
            }, 100);
          }
        }, 300);
      }
    }, [selectedCards.length, activeConfig]);
    
    // Function to shuffle cards
    const shuffleCards = () => {
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setCards(shuffled);
    };
    
    // Function to draw a card
    const drawCard = () => {
      if (!activeConfig || selectedCards.length >= activeConfig.cardCount || cards.length === 0) return;
      
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = cards[randomIndex];
      
      const meaning = Math.random() > 0.5 ? 'sun_meaning' : 'moon_meaning';
      
      setSelectedCards([...selectedCards, {...card, displayMeaning: meaning}]);
      setCards(cards.filter((_, index) => index !== randomIndex));
      
      setTimeout(() => {
        const drawingArea = document.getElementById('drawing-area');
        if (drawingArea) {
          drawingArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    };
    
    // Enhanced reset function
    const resetReading = () => {
      setReadingType(null);
      setSelectedCards([]);
      setActiveConfig(null);
      
      setTimeout(() => {
        const oracleContainer = document.getElementById('oracle-reader-container');
        
        if (oracleContainer) {
          const containerRect = oracleContainer.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const containerTop = containerRect.top + scrollTop;
          
          window.scrollTo({
            top: containerTop - 100,
            behavior: 'smooth'
          });
        } else {
          const readingOptions = document.querySelector('.reading-options');
          if (readingOptions) {
            readingOptions.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start'
            });
            
            setTimeout(() => {
              window.scrollBy(0, -150);
            }, 300);
          }
        }
      }, 100);
      
      async function fetchCards() {
        try {
          setLoading(true);
          const response = await fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/get-oracle-cards?token=jTaXzPBxBLuKHfLXsjqCqLmJTTJ3ArCSZ15Hgzy23');
          if (!response.ok) {
            throw new Error('Sleeping cats. Failed to summon cards');
          }
          const data = await response.json();
          setCards(data);
          setLoading(false);
        } catch (err) {
          setError('Unable to load cards due to cats probably napping. Please try again later.');
          setLoading(false);
        }
      }
      fetchCards();
    };
    
    // Loading state
    if (loading) {
      return React.createElement("div", { className: "drawing-area" },
        React.createElement("p", { className: "instruction-text" }, "Summoning the cats...")
      );
    }
    
    // Error state
    if (error) {
      return React.createElement("div", { className: "drawing-area" },
        React.createElement("p", { className: "instruction-text" }, error),
        React.createElement("button", {
          className: "oracle-button",
          onClick: () => window.location.reload()
        }, "Try Again")
      );
    }
    
    // Reading type selection screen
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
                if (drawingArea) {
                  drawingArea.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                  });
                }
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
    
    // Drawing cards view
    if (activeConfig && selectedCards.length < activeConfig.cardCount) {
      const currentPosition = activeConfig.positions[selectedCards.length];
      return React.createElement("div", { 
        className: "reading-container",
        "data-cards": activeConfig.cardCount
      }, [
        React.createElement("div", { className: "drawing-area", id: "drawing-area", key: "drawing" }, [
          React.createElement("p", { className: "instruction-text", key: "instruction" },
            `Drawing card ${selectedCards.length + 1} of ${activeConfig.cardCount}: ${currentPosition.title}`),
          React.createElement("p", { className: "sub-instruction-text", key: "sub" },
            "Focus on this aspect as you draw your card"),
          React.createElement("button", {
            className: "oracle-button",
            onClick: drawCard,
            key: "button"
          }, "Draw Card")
        ])
      ]);
    }
    
    // Reading results view
    return React.createElement("div", { 
      className: "reading-container",
      "data-cards": activeConfig.cardCount
    }, [
      React.createElement("h2", { className: "reading-title", key: "title" }, activeConfig.title),
      React.createElement("div", { 
        className: activeConfig.cardCount === 1 ? "single-card-display" : "card-display",
        id: "reading-results",
        key: "results"
      },
        selectedCards.map((card, index) => 
          React.createElement("div", { 
            key: index,
            className: "tarot-card card-reveal"
          }, [
            React.createElement("h3", { className: "position-title", key: "pos" }, activeConfig.positions[index].title),
            React.createElement("img", {
              className: "card-image",
              src: card.image_url,
              alt: card.title,
              key: "img"
            }),
            React.createElement("div", { className: "card-content", key: "content" }, [
              React.createElement("h2", { key: "name" }, card.title),
              React.createElement("div", { className: "card-properties", key: "props" }, [
                React.createElement("p", { key: "time" }, `Time: ${card.time}`),
                React.createElement("p", { key: "energy" }, `Energy: ${card.energy}`),
                React.createElement("p", { key: "location" }, `Location: ${card.location}`),
                React.createElement("p", { key: "element" }, `Element: ${card.element}`)
              ]),
              React.createElement("h3", { key: "meaning-type" }, 
                card.displayMeaning === 'sun_meaning' ? "Sun Meaning" : "Moon Meaning"),
              formatText(card[card.displayMeaning])
            ])
          ])
        )
      ),
      
      // Email collection form
      React.createElement("div", { className: "email-form", key: "email" }, [
        React.createElement("h3", { className: "email-form-title", key: "email-title" }, "Send this reading to your email inbox!"),
        React.createElement("p", { className: "email-form-description", key: "email-desc" }, 
          "Enter your email address to receive a copy of your reading and future insights:"),
        React.createElement("div", { className: "email-input-group", key: "email-group" }, [
          React.createElement("input", {
            type: "email",
            className: "email-input",
            placeholder: "Your email address",
            id: "user-email",
            key: "email-input"
          }),
          React.createElement("button", {
            className: "oracle-button email-submit",
            key: "email-button",
            onClick: (e) => {
              e.preventDefault();
              const email = document.getElementById('user-email').value;
              if (email && email.includes('@')) {
                fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/save-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
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
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      alert('Thank you! This reading has been sent to your email.');
                    } else {
                      alert('Failed to send your reading: ' + (data.message || 'Unknown error'));
                      console.error('Email error:', data);
                    }
                  })
                  .catch(error => {
                    console.error('Error:', error);
                    alert('The cats got distracted and failed to send your reading. Please try again later.');
                  });
              } else {
                alert('Please enter a valid email address.');
              }
            }
          }, "Send My Reading")
        ])
      ]),
      
      // New Reading button
      React.createElement("div", { 
        className: "drawing-area new-reading-button",
        key: "new-reading"
      },
        React.createElement("button", {
          className: "oracle-button",
          onClick: resetReading
        }, "Start New Reading")
      ),
      
      // Copyright notice
      React.createElement("div", { className: "copyright-notice", key: "copyright" }, [
        React.createElement("p", null, [
          "Copyright 2025 The Magick Mechanic and Daniel Boutros. All rights reserved.",
          React.createElement("br"),
          "This Oracle Card Reader and all card content are protected by copyright law. Unauthorized reproduction, distribution, or use of these cards or readings is prohibited."
        ])
      ])
    ]);
  }
  
  // Render the component into the container
  const domContainer = document.getElementById('oracle-reader-container');
  ReactDOM.render(React.createElement(OracleCardReader), domContainer);
})();
