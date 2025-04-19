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
      border: 3px solid #C79535;   // added border and gold
      border-radius: 8px;
      cursor: pointer;
      font-size: 22px;   // original is 16
      font-style: bold;   // newly added
      transition: background 0.3s ease;
      margin: 20px 0;
    }
    
    .oracle-button:hover {
      background: #FFEE86; // original was #555 
      font-color: #4A0401; // newly added
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
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px; // was 30
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
      margin: 20px 0;
      font-style: italic; // originally just italic and font size at 1em
      color: #FFEE86;
      font-size: 1em;
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
  
  // React component for Oracle Card Reader
  function OracleCardReader() {
    const [readingType, setReadingType] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [selectedCards, setSelectedCards] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    
    // Fetch cards when component mounts
    React.useEffect(() => {
      async function fetchCards() {
        try {
          setLoading(true);
          
          // Replace this URL with your actual Netlify function URL
          const response = await fetch('https://heartfelt-kataifi-572e68.netlify.app/.netlify/functions/get-oracle-cards');
          
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
      if (selectedCards.length >= (readingType === 'single' ? 1 : 3) || cards.length === 0) return;
      
      // Get a random card
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = cards[randomIndex];
      
      // Randomly assign sun or moon meaning
      const meaning = Math.random() > 0.5 ? 'sun_meaning' : 'moon_meaning';
      
      setSelectedCards([...selectedCards, {...card, displayMeaning: meaning}]);
      setCards(cards.filter((_, index) => index !== randomIndex));
    };
    
    // Function to reset reading
    const resetReading = () => {
      setReadingType(null);
      setSelectedCards([]);
      // Refetch to reset
      async function fetchCards() {
        try {
          setLoading(true);
          const response = await fetch('https://your-netlify-site.netlify.app/.netlify/functions/get-oracle-cards');
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
      return React.createElement("div", { className: "reading-options" }, [
        React.createElement("div", { className: "reading-card" }, [
          React.createElement("h2", null, "Single Card Reading"),
          React.createElement("p", null, "Draw one card for immediate guidance"),
          React.createElement("button", {
            className: "oracle-button",
            onClick: () => {
              shuffleCards();
              setReadingType('single');
            }
          }, "Begin Single Card Reading")
        ]),
        React.createElement("div", { className: "reading-card" }, [
          React.createElement("h2", null, "Three Card Reading"),
          React.createElement("p", null, "Explore a deeper spread with three cards"),
          React.createElement("button", {
            className: "oracle-button",
            onClick: () => {
              shuffleCards();
              setReadingType('triple');
            }
          }, "Begin Three Card Reading")
        ])
      ]);
    }
    
    // Drawing cards view
    if (selectedCards.length < (readingType === 'single' ? 1 : 3)) {
      return React.createElement("div", { className: "drawing-area" }, [
        React.createElement("p", { className: "instruction-text" },
          "Hold a question in your heart and draw when ready"),
        React.createElement("button", {
          className: "oracle-button",
          onClick: drawCard
        }, "Draw Card")
      ]);
    }
    
    // Reading results view
    return React.createElement("div", null, [
      React.createElement("div", { className: "card-display" },
        selectedCards.map((card, index) => 
          React.createElement("div", { 
            key: index,
            className: "tarot-card card-reveal"
          }, [
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
              React.createElement("p", null, card[card.displayMeaning])
            ])
          ])
        )
      ),
      React.createElement("div", { className: "drawing-area" },
        React.createElement("button", {
          className: "oracle-button",
          onClick: resetReading
        }, "Start New Reading")
      )
    ]);
  }
  
  // Render the component into the container
  const domContainer = document.getElementById('oracle-reader-container');
  ReactDOM.render(React.createElement(OracleCardReader), domContainer);
})();
