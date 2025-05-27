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
      /* Add smooth scroll behavior */
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
      display: grid;
      grid-template-columns: repeat(2, 1fr);  /* Fixed 2 columns for desktop */
      gap: 30px;
      margin: 40px 0;
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .reading-card {
      background: #071037;
      border: 1px solid #C79535;
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      color: white;
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
      min-height: 300px;
    }
    
    .reading-card:hover {
      transform: translateY(-5px);
    }
    
    .reading-card h2 {
      margin-bottom: 15px;
    }
    
    .reading-card p {
      flex: 1;
      margin-bottom: 20px;
    }
    
    .reading-card .oracle-button {
      margin-top: auto;  /* Pushes button to bottom */
    }
    
    .card-display {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 30px;
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
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
    .reading-container[data-cards="5"] { min-height: 900px; }
    .reading-container[data-cards="6"] { min-height: 1000px; }
    
    .drawing-area {
      min-height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    /* Add specific layouts for different reading types */
    .five-card-display {
      display: grid;
      grid-template-areas:
        ".     above  ."
        "left  center right"
        ".     below  .";
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      max-width: 900px;
      margin: 30px auto;
    }

    .five-card-display .tarot-card:nth-child(1) {
      grid-area: center;
    }

    .five-card-display .tarot-card:nth-child(2) {
      grid-area: above;
    }

    .five-card-display .tarot-card:nth-child(3) {
      grid-area: below;
    }

    .five-card-display .tarot-card:nth-child(4) {
      grid-area: left;
    }

    .five-card-display .tarot-card:nth-child(5) {
      grid-area: right;
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
    
    /* Prevent layout shifts during card interactions */
    .tarot-card {
      background: #071037;
      border: 1px solid #C79535;
      border-radius: 12px;
      padding: 20px;
      color: white;
      max-width: 100%;
      box-sizing: border-box;
      contain: layout style paint; /* Prevent layout shifts */
    }
    
    .card-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    
    .card-content {
      margin-top: 15px;
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
    }

    .position-title {
      background: #4A0401;
      color: #C79535;
      padding: 8px 15px;
      border-radius: 4px;
      margin-top: 0;
      margin-bottom: 15px;
      text-align: center;
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
      border: 1px solid #C79535;
    }

    .email-form {
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      background: #161719; /* CHARCOAL background */
      border: 2px solid #C79535; /* ACC GOLD border */
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(199, 149, 53, 0.2);
    }

    .email-form-title {
      color: #C79535; /* ACC GOLD */
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 1.4em;
      font-weight: bold;
      font-family: 'Rasputin', Georgia, 'Times New Roman', serif;
      text-transform: uppercase;
      letter-spacing: 4.4px; /* LS 44 */
    }

    .email-form-description {
      color: #FEF7F2; /* OFFWHITE */
      margin-bottom: 25px;
      line-height: 1.5;
      font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
      letter-spacing: 2.5px; /* LS 25 */
    }

    .email-input-group {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .email-input {
      padding: 15px;
      border: 2px solid #C79535; /* ACC GOLD border */
      border-radius: 8px;
      font-size: 16px;
      background: #FEF7F2; /* OFFWHITE background */
      color: #020202; /* BLACK text */
      font-weight: 500;
      font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
      letter-spacing: 2.5px; /* LS 25 */
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .email-input::placeholder {
      color: #161719; /* CHARCOAL for placeholder */
      font-family: 'Darker Grotesque', Arial, Helvetica, sans-serif;
      letter-spacing: 2.5px;
    }

    .email-input:focus {
      outline: none;
      border-color: #FFEE86; /* YELLOW on focus */
      box-shadow: 0 0 0 3px rgba(255, 238, 134, 0.2);
    }

    .email-submit {
      width: 100%;
      background: #4A0401; /* DEEP RED */
      color: #C79535; /* ACC GOLD text */
      border: 2px solid #C79535;
      padding: 15px 25px;
      font-size: 18px;
      font-weight: bold;
      font-family: 'Montserrat', 'Arial Black', Arial, sans-serif;
      font-weight: 600; /* Semi Bold */
      text-transform: uppercase;
      letter-spacing: 4.4px; /* LS 44 */
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .email-submit:hover {
      background: #720400; /* BRIGHT RED on hover */
      color: #FFEE86; /* YELLOW text on hover */
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

    /* New Reading button spacing - closer on desktop */
    .new-reading-button {
      margin-top: 40px; /* Default mobile spacing */
      min-height: auto; /* Override drawing-area min-height */
    }

    @media (min-width: 769px) {
      .new-reading-button {
        margin-top: 15px; /* Much closer on desktop */
      }
    }

    /* Prevent jumping on mobile */
    @media (max-width: 768px) {
      .card-display {
        grid-template-columns: 1fr;
      }
      
      .reading-options {
        grid-template-columns: 1fr;  /* Single column on mobile */
        padding: 20px 15px;
        margin-bottom: 20px;
      }
      
      .instruction-text {
        max-width: 95%;
      }
      
      .five-card-display {
        display: grid;
        grid-template-areas:
          "center"
          "above"
          "below"
          "left"
          "right";
        grid-template-columns: 1fr;
      }
      
      /* Adjust container heights for mobile */
      .reading-container[data-cards="1"] { min-height: 800px; }
      .reading-container[data-cards="3"] { min-height: 2400px; }
      .reading-container[data-cards="5"] { min-height: 4000px; }
      .reading-container[data-cards="6"] { min-height: 4800px; }
      
      /* Smoother mobile animations */
      .tarot-card {
        transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
    }

    /* Desktop-specific adjustments */
    @media (min-width: 769px) {
      .reading-options {
        padding: 30px 20px;
        margin-bottom: 30px;
      }
      
      .tarot-card {
        transition: transform 0.5s ease-in-out;
      }
    }

    @media (min-width: 768px) {
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
        description: "Draw one card for immediate guidance.",
        cardCount: 1,
        positions: [
          { title: "Your Guidance" }
        ]
      },
      reasons_thing: {
        title: "The forces surrounding an important decision",
        description: "What forces are at play around your important decision?",
        cardCount: 3,
        positions: [
          { title: "The force(s) moving in support of your decision." },
          { title: "The force(s) moving against your decision." },
          { title: "What energies you can embody to sway the outcome in your favor." }
        ]
      },
      situation_action_outcome: {
        title: "Situation, Action, Outcome",
        description: "Understand a challenge and how to address it.",
        cardCount: 3,
        positions: [
          { title: "Situation - The current challenge." },
          { title: "Action - What to do." },
          { title: "Outcome - The result of taking action." }
        ]
      },
      five_card_cross: {
        title: "Five Card Spread",
        description: "A comprehensive view of your situation.",
        cardCount: 5,
        positions: [
          { title: "1 - Core issue." },
          { title: "2 - What influences you." },
          { title: "3 - Your foundation." },
          { title: "4 - Past influences." },
          { title: "5 - Future outcome." }
        ]
      },
      who_am_i: {
        title: "The Archetype Reading",
        description: "Who do you need to be to achieve what you desire?",
        cardCount: 6,
        positions: [
          { title: "How I got here - What qualities did you most embody." },
          { title: "The present - What qualities do you embody most today." },
          { title: "Resistance - What qualities keep you away from your desire." },
          { title: "Empowerment - What qualities must you embody to best succeed." },
          { title: "Support - The types of people who will be supportive to your quest." },
          { title: "Reward - The gifts that will come from success." }
        ]
      },
      relationship_grid: {
        title: "Relationship Reading",
        description: "What hidden forces are present in your chosen relationship?",
        cardCount: 6,
        positions: [
          { title: "Who you are being in this dynamic." },
          { title: "Who they are being in this dynamic." },
          { title: "What is destructive in the dynamic." },
          { title: "What is healthy in the dynamic." },
          { title: "What qualities you can embody to elevate the dynamic." },
          { title: "The transformation that will occur if successful." }
        ]
      },
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
          
          // Replace this URL with your actual Netlify function URL with token
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
      
      // On first load, scroll to top to show instructions above reading options
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }, []);
    
    // Improved scrolling behavior
    React.useEffect(() => {
      if (activeConfig && selectedCards.length === activeConfig.cardCount) {
        // All cards have been drawn, scroll to the results
        setTimeout(() => {
          const resultsArea = document.getElementById('reading-results');
          if (resultsArea) {
            // First, ensure the container is visible
            resultsArea.style.opacity = '0';
            resultsArea.scrollIntoView({ 
              behavior: 'smooth',  // Changed to smooth
              block: 'start',      // Keep at start to show the full reading
              inline: 'nearest'
            });
            
            // Then fade in for smoother experience
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
      
      // Get a random card
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = cards[randomIndex];
      
      // Randomly assign sun or moon meaning
      const meaning = Math.random() > 0.5 ? 'sun_meaning' : 'moon_meaning';
      
      setSelectedCards([...selectedCards, {...card, displayMeaning: meaning}]);
      setCards(cards.filter((_, index) => index !== randomIndex));
      
      // Prevent scrolling away from the card drawing area
      // We'll add a slight delay before scrolling to ensure UI has updated
      setTimeout(() => {
        const drawingArea = document.getElementById('drawing-area');
        if (drawingArea) {
          drawingArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    };
    
    // Enhanced reset function with Squarespace-aware scrolling
    const resetReading = () => {
      setReadingType(null);
      setSelectedCards([]);
      setActiveConfig(null);
      
      // Scroll back to Oracle Reader container within the Squarespace page
      setTimeout(() => {
        // First try to find the Oracle Reader container
        const oracleContainer = document.getElementById('oracle-reader-container');
        
        if (oracleContainer) {
          // Get the container's position relative to the entire page
          const containerRect = oracleContainer.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const containerTop = containerRect.top + scrollTop;
          
          // Scroll to show the container with some padding above it
          window.scrollTo({
            top: containerTop - 100, // 100px padding above the container
            behavior: 'smooth'
          });
        } else {
          // Fallback: try to find reading options and scroll to them
          const readingOptions = document.querySelector('.reading-options');
          if (readingOptions) {
            readingOptions.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start'
            });
            
            // Additional adjustment to show content above
            setTimeout(() => {
              window.scrollBy(0, -150);
            }, 300);
          }
        }
      }, 100);
      
      // Refetch cards
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
          return React.createElement("div", { className: "reading-card", key: configKey }, [
            React.createElement("h2", null, config.title),
            React.createElement("p", null, config.description),
            React.createElement("button", {
              className: "oracle-button",
              onClick: () => {
                shuffleCards();
                setReadingType(configKey);
                setActiveConfig(config);
                
                // Scroll to the drawing area after setting reading type
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
            }, `Begin ${config.title}`)
          ]);
        })
      );
    }
    
    // Drawing cards view
    if (activeConfig && selectedCards.length < activeConfig.cardCount) {
      const currentPosition = activeConfig.positions[selectedCards.length];
      return React.createElement("div", { 
        className: "reading-container",
        "data-cards": activeConfig.cardCount  // Add this attribute
      }, [
        React.createElement("div", { className: "drawing-area", id: "drawing-area" }, [
          React.createElement("p", { className: "instruction-text" },
            `Drawing card ${selectedCards.length + 1} of ${activeConfig.cardCount}: ${currentPosition.title}`),
          React.createElement("p", { className: "sub-instruction-text" },
            "Focus on this aspect as you draw your card"),
          React.createElement("button", {
            className: "oracle-button",
            onClick: drawCard
          }, "Draw Card")
        ])
      ]);
    }
    
    // Reading results view
    return React.createElement("div", { 
      className: "reading-container",
      "data-cards": activeConfig.cardCount  // Add this attribute
    }, [
      React.createElement("h2", { className: "reading-title" }, activeConfig.title),
      React.createElement("div", { 
        className: activeConfig.cardCount === 1 
          ? "single-card-display" 
          : activeConfig.cardCount === 5 
            ? "five-card-display" 
            : "card-display", 
        id: "reading-results" 
      },
        selectedCards.map((card, index) => 
          React.createElement("div", { 
            key: index,
            className: "tarot-card card-reveal"
          }, [
            React.createElement("h3", { className: "position-title" }, activeConfig.positions[index].title),
            React.createElement("img", {
              className: "card-image",
              src: card.image_url,
              alt: card.title
            }),
            React.createElement("div", { className: "card-content" }, [
              React.createElement("h2", null, card.title),
              React.createElement("div", { className: "card-properties" }, [
                React.createElement("p", null, `Time: ${card.time}`),
                React.createElement("p", null, `Energy: ${card.energy}`),
                React.createElement("p", null, `Location: ${card.location}`),
                React.createElement("p", null, `Element: ${card.element}`)
              ]),
              React.createElement("h3", null, 
                card.displayMeaning === 'sun_meaning' ? "Sun Meaning" : "Moon Meaning"),
              formatText(card[card.displayMeaning])
            ])
          ])
        )
      ),
      
      // Email collection form
      React.createElement("div", { className: "email-form" }, [
        React.createElement("h3", { className: "email-form-title" }, "Get this reading by email"),
        React.createElement("p", { className: "email-form-description" }, 
          "Enter your email address to receive a copy of your reading and future insights:"),
        React.createElement("div", { className: "email-input-group" }, [
          React.createElement("input", {
            type: "email",
            className: "email-input",
            placeholder: "Your email address",
            id: "user-email"
          }),
          React.createElement("button", {
            className: "oracle-button email-submit",
            onClick: (e) => {
              e.preventDefault();
              const email = document.getElementById('user-email').value;
              if (email && email.includes('@')) {
                // Send the email and reading data to your endpoint
                fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/mailjet-reading', {
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
                      alert('Thank you! Your reading has been sent to your email.');
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
      
      // New Reading button - closer to email form on desktop
      React.createElement("div", { 
        className: "drawing-area new-reading-button"
      },
        React.createElement("button", {
          className: "oracle-button",
          onClick: resetReading
        }, "Start New Reading")
      ),
      
      // Copyright notice
      React.createElement("div", { className: "copyright-notice" }, [
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
