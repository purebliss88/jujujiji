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
    }

    .oracle-button {
      background: #4A0401;
      color: #C79535;
      padding: 15px 30px;
      border: 3px solid #C79535;   /* added border and gold */
      border-radius: 8px;
      cursor: pointer;
      font-size: 22px;   /* original is 16 */
      font-weight: bold;   /* newly added */
      transition: background 0.3s ease;
      margin: 20px 0;
    }
    
    .oracle-button:hover {
      background: #FFEE86; /* original was #555 */
      color: #4A0401; /* newly added */
    }
    
    .reading-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin: 40px 0;
    }
    
    .reading-card {
      background: #071037;
      border: 1px solid #C79535;
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      color: white;
      transition: transform 0.3s ease;
    }
    
    .reading-card:hover {
      transform: translateY(-5px);
    }
    
    .card-display {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 30px;
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
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
    
    .tarot-card {
      background: #071037;
      border: 1px solid #C79535;
      border-radius: 12px;
      padding: 20px;
      color: white;
      max-width: 100%;
      box-sizing: border-box;
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
    
    .drawing-area {
      text-align: center;
      margin: 40px 0;
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
    }

    .email-form {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background: rgba(7, 16, 55, 0.85);
      border: 1px solid #C79535;
      border-radius: 12px;
      text-align: center;
    }

    .email-form-title {
      color: #C79535;
      margin-top: 0;
    }

    .email-form-description {
      color: white;
      margin-bottom: 20px;
    }

    .email-input-group {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .email-input {
      padding: 12px;
      border: 1px solid #C79535;
      border-radius: 6px;
      font-size: 16px;
      background: rgba(255, 255, 255, 0.9);
    }

    .email-submit {
      width: 100%;
    }

    .copyright-notice {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid rgba(199, 149, 53, 0.3);
      text-align: center;
      font-size: 0.8em;
      color: rgba(255, 255, 255, 0.7);
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

    @media (max-width: 768px) {
      .card-display {
        grid-template-columns: 1fr;
      }
      
      .reading-options {
        grid-template-columns: 1fr;
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
        description: "Draw one card for immediate guidance",
        cardCount: 1,
        positions: [
          { title: "Your Guidance" }
        ]
      },
      past_present_future: {
        title: "Past, Present, Future",
        description: "Explore your timeline with three cards",
        cardCount: 3,
        positions: [
          { title: "Past - What led you here" },
          { title: "Present - Your current situation" },
          { title: "Future - Where you're heading" }
        ]
      },
      situation_action_outcome: {
        title: "Situation, Action, Outcome",
        description: "Understand a challenge and how to address it",
        cardCount: 3,
        positions: [
          { title: "Situation - The current challenge" },
          { title: "Action - What to do" },
          { title: "Outcome - The result of taking action" }
        ]
      },
      five_card_cross: {
        title: "Five Card Cross",
        description: "A comprehensive view of your situation",
        cardCount: 5,
        positions: [
          { title: "Center - Core issue" },
          { title: "Above - What influences you" },
          { title: "Below - Your foundation" },
          { title: "Left - Past influences" },
          { title: "Right - Future outcome" }
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
          
          // Replace this URL with your actual Netlify function URL with token
          const response = await fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/get-oracle-cards?token=jTaXzPBxBLuKHfLXsjqCqLmJTTJ3ArCSZ15Hgzy23');
          
          if (!response.ok) {
            throw new Error('Failed to load cards. Cats might be asleep.');
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
    }, []);
    
    // Add this after the fetchCards useEffect
    React.useEffect(() => {
      if (activeConfig && selectedCards.length === activeConfig.cardCount) {
        // All cards have been drawn, scroll to the results
        setTimeout(() => {
          const resultsArea = document.getElementById('reading-results');
          if (resultsArea) {
            resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    
    // Function to reset reading
    const resetReading = () => {
      setReadingType(null);
      setSelectedCards([]);
      // Refetch to reset
      async function fetchCards() {
        try {
          setLoading(true);
          const response = await fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/get-oracle-cards?token=jTaXzPBxBLuKHfLXsjqCqLmJTTJ3ArCSZ15Hgzy23');
          if (!response.ok) {
            throw new Error('Failed to load cards');
          }
          const data = await response.json();
          setCards(data);
          setLoading(false);
        } catch (err) {
          setError('Unable to load cards due to possible cat napping. Please try again later.');
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
              }
            }, `Begin ${config.title}`)
          ]);
        })
      );
    }
    
    // Drawing cards view
    if (activeConfig && selectedCards.length < activeConfig.cardCount) {
      const currentPosition = activeConfig.positions[selectedCards.length];
      return React.createElement("div", { className: "drawing-area", id: "drawing-area" }, [
        React.createElement("p", { className: "instruction-text" },
          `Drawing card ${selectedCards.length + 1} of ${activeConfig.cardCount}: ${currentPosition.title}`),
        React.createElement("p", { className: "sub-instruction-text" },
          "Focus on this aspect as you draw your card"),
        React.createElement("button", {
          className: "oracle-button",
          onClick: drawCard
        }, "Draw Card")
      ]);
    }
    
    // Reading results view
    return React.createElement("div", null, [
      React.createElement("h2", { className: "reading-title" }, activeConfig.title),
      React.createElement("div", { 
        className: activeConfig.cardCount === 5 ? "five-card-display" : "card-display", 
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
                          imageUrl: card.image_url  // Add this line to include images
                        }))
                      }
                    })
                  })
                  .then(response => {
                    if (response.ok) {
                      alert('Thank you! Your reading has been sent to your email.');
                    } else {
                      alert('The cats got distracted and failed to send your reading. Please try again later.');
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
      React.createElement("div", { className: "drawing-area" },
        React.createElement("button", {
          className: "oracle-button",
          onClick: resetReading
        }, "Start New Reading")
      ),
      
      // Copyright notice
      React.createElement("div", { className: "copyright-notice" }, [
        React.createElement("p", null, [
          "© " + new Date().getFullYear() + " The Magick Mechanic. All rights reserved.",
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
