// netlify/functions/get-oracle-cards.js
exports.handler = async function(event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  // Add a secret token check
  const token = event.queryStringParameters?.token || '';
  const validToken = 'jTaXzPBxBLuKHfLXsjqCqLmJTTJ3ArCSZ15Hgzy23'; // Change this to a random string
  
  // Check referer more strictly
  const referer = event.headers.referer || '';
  const allowedDomains = [
    'themagickmechanic.com',
    'www.themagickmechanic.com',
    'dachshund-flamingo-5z5y.squarespace.com'
  ];
  
  const isAllowedOrigin = allowedDomains.some(domain => referer.includes(domain));
  
  // If production mode, strictly enforce referer and token
  if (process.env.NODE_ENV === 'production' && (!isAllowedOrigin || token !== validToken)) {
    console.log('Unauthorized access attempt', { referer, token });
    return { 
      statusCode: 403, 
      body: JSON.stringify({ error: 'Unauthorized' }) 
    };
  }

  try {
    // Your card data - this stays on the server and never gets sent to the client directly
    const cards = [
      {   
        "id": "medicine_drinker",
        "title": "Medicine Drinker",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/8dc00b3f-a553-48ba-83ea-4455f92f566d/Medicine_Drinker.png",
        "time": "Now",
        "energy": "Transmute",
        "location": "New lands",
        "element": "Ether",
        "sun_meaning": "A sensitive being who calls in youthful bravery and strength as they head into their soul's dark corners. The medicine ingested currently is transforming divisive perceptions of self to more loving ones. This is a challenging step in learning to accept those things one might desire to attack in themselves. \n\nThis phase of self-inquiry is a pivotal one, and eyes can see ahead toward the prize. However, there's more to drink, and the prize can only be claimed when the drink is finished.",
        "moon_meaning": "As we learn to witness the previously less-liked parts of ourselves, bitter tasting truths can scare us from exploring further. A pause in this moment can be helpful to ground ourselves, collect courage, ease our nerves or integrate hard-to-swallow realizations. \n\nIn this phase, settling into comforts and old habits can set in, allowing extended pauses to emerge. Be careful the pauses do not become long-term avoidance or procrastination. This is not a time to hope things will just go away or change without discomforts faced. \n\nYou will be victorious, and you are supported. Remember this, complete the pause, then drink the rest of your medicine."
      },
      {   
        "id": "twin",
        "title": "The Twin",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/0e8160d8-4d26-45e4-ba44-3460ac6af728/Twins.png",
        "time": "Pause",
        "energy": "Reflect",
        "location": "Home",
        "element": "Light",
        "sun_meaning": "One who effortlessly reflects another at a level of uncomfortably disrobing depth. More than a typical brother, sister or partner, they see and hear the other at what may seem like their deepest level of self. This energy appears when we are ready to face ourselves, with the bonus added support-stilts of being lovingly held and seen. \n\nWhen a spotlight is upon someone treated like a criminal, the light can feel hot and uncomfortable. When a spotlight is held by one who truly embraces us and is supporting our transformations, unmasking can feel relieving. \n\nA twin energy is one of life's gifts to help us evolve, with love. It's worth remembering this when tough times arise with this person. And to remember that sometimes when we need to be the one who reflects others with that level of raw depth, it is rarely a welcomed or easy job. \n\nBravery to speak difficult messages is important, and speaking them with a thoughtful tongue makes them powerful all the more.",
        "moon_meaning": "A twin in our lives, while a gift, can make it more challenging to ground into desired ease, old habits or comforts. Love is easy to give and receive with a 'twin'... but to claim personal space, boundaries or your own path can create an experience of betrayal - fear of doing it, or receiving it - even if it's not an actual betrayal. \n\nHowever, this is a healthier path than to betray the self, which will ultimately betray the health of the relationship. This refinement of self is a critical growth point for all, and when honored and cultivated grants the grandest and deepest rewards... eventually. \n\nThis typically benefits a meaningful connection between two people, even if it leads to the closing of a chapter. When both in a relationship choose to be their truest self, the world around them changes to an aligned one. If this alignment creates division; temporary or otherwise, then it's important to honor that. \n\nIn life, when a relationship is no longer supportive and falls away, a new more harmonious relationship is likely to come."
      },
      {   
        "id": "creator",
        "title": "The Creator",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/fef6a9e9-1ab1-429f-8587-c85215436420/thecreator.png",
        "time": "Create",
        "energy": "Birth",
        "location": "Within",
        "element": "Life",
        "sun_meaning": "You have the power to bring transformative creations to manifest, provided that you allow the energy coming through to guide the work fully. This may take you into new territories including feelings of uncertainty. Creation is most empowered when you allow the spirit of 'it' to lead the work. \n\nIf you try to control or steer the spirit against its nature, you may pervert its essence and goal. As a creator who nurtures a garden of visions, one is cultivating an idea from seed to fruition through all kinds of weather. You plant and water that seed. For that seed to grow best, it must be given the right environment, nutrients and watering schedule. \n\nYou are not who dictates what it needs, you are the one who identifies and responds to its needs and serves the seed to its successful fruiting.",
        "moon_meaning": "You and your life is the creation in need of attention. This may be a time to evaluate your environment, your nourishment and your safety to grow. A classic struggle for many creators is the ability to care for themselves in the passion of birthing the creation. \n\nIn this case, the message is that without you, there is no creation. There's no vision, art or manifested completion without the steward. If a plant has nobody to tend it, or the wrong conditions to grow, it won't fruit, or the fruit will taste foul. \n\nSee yourself as a plant. Are your roots safe to deepen and grow here? Are you hydrated? Are you getting out in the sun? Are you connecting with the Earth? There's no need to believe in the myth of the suffering artist."
      },
      {   
        "id": "child",
        "title": "The Child",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/f238437b-130a-49b6-9fc2-4ed2d407b525/thenoob.png",
        "time": "Begin",
        "energy": "Play",
        "location": "Inspiration",
        "element": "Fire",
        "sun_meaning": "It can be a wonderful experience to not know or need to know what's next. To feel like a child again, innocently poking and prodding things without harsh or punishing consequences. Testing boundaries and limits. Enjoying innocence, excitement and play, and the safety of a supportive environment and friends to learn from mistakes. \n\nWith that, comes natural course-correction when needed. Enjoy this phase as the forward path forms, whether that results in your gathering of your resources to advance powerfully, or a movement into a more deliberate and surrendered state of recharging.",
        "moon_meaning": "A child with no assumed responsibilities can attain self-discovered insight, learning and play. For an adult, this is helpful in phases, but to be in this too long could mean a frozen state where there is an unseen betrayal of self and a secret fear of responsibility. \n\nThis frozen state can show itself in the symptom of repeated cycles of drifting or procrastination and avoidance. When a person's forward movement seems to start and stop continually, it's usually down to the simple idea of them not feeling 'safe' to go further; an idea likely seeded at a moment of pain in a more innocent time. If this is you, you would benefit to ask yourself these questions: \n\nWhat do you feel protected from, by not moving forward? What are you afraid to be responsible for? What are you afraid of in imagined scenarios of shame and failure? What do you fear to lose? Does rejection, ridicule or shame from others scare you? It's time to be honest with self. \n\nIt is time to choose the vision and all that it costs, or stay in a falsehood and continue betraying the heart, soul and the best possible life path."
      },
      {  
        "id": "dimensional",
        "title": "The Dimensional Traveler",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/ac6fbecc-5a0a-465e-b5ae-cc81fdf3b1e2/Dimensional.png",
        "time": "Non Linear",
        "energy": "Explore",
        "location": "Everywhere",
        "element": "Ether",
        "sun_meaning": "One who so naturally perceives so many angles, perspectives, textures, realities, probabilities and concepts, whether intuitive or logical in nature. Imagine an artist, but where perceiving is the creation and you are the only one who gets to see the painting. \n\nYour perception, imagination and intellect can sometimes be unbelievable even to you. It can be overwhelming to perceive so much while living in a society that encourages limiting and reductive beliefs of 'reality'. \n\nDo you have to distort your perception to fit in? F* no. Your job isn't to fit in. You have sight and vision beyond the norm. You can interact with and relate to the world in a rare way. You are meant to help stretch the vision of those around you, so do not dare contort your spirit to fit in anyone else's ideas of what you are to them. \n\nYour perception and mind are qualities that can be experienced very much as if they are a gift just for you. Fortunately, this gift is one that can help others, while also enabling your exploratory inspirations in areas of self. It's ok to ignore the pressure of knowing 'who' you are at this time. \n\nSometimes the 'who' you are becoming, is the art you get to create as a daily process.",
        "moon_meaning": "The gift of a rich, multi-layered perception can also come with the continued challenge to believe in the self as the self isn't like other selves we think we're supposed to be like. How does anyone sit with the constant messaging to identify with something that doesn't fit their experience of self? \n\nThe scare tactic can be summarized as 'be like this, or risk being alone'... but you're never alone, even when you feel lonely. There are always those who care, whether you know them today or not. In low times, it can be hard to remember this. \n\nIf we were all the same, wouldn't life's experience become flat? Wouldn't relationships be redundant? The more you let yourself be you, as you know yourself to be right now, the more people who appreciate you will emerge. When the season's right, more people like you will show up. But not too many! Such is the price of being unique."
      },
      {   
        "id": "highness",
        "title": "Her Highness",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/ce97cead-b77c-48d3-b1d1-548c12c620c2/HerHighness.png",
        "time": "Now and Long Term",
        "energy": "Ground",
        "location": "Here",
        "element": "Earth",
        "sun_meaning": "They are someone that feels bountiful regardless of circumstances. Abundant across resources, connections, friends, knowledge, taste and intelligence, this one knows a good time, but with class. Her highness loves luxury and the good things in life. She lives well and wears it like she was born to. \n\nWhile she can seem inaccessible to many, and possibly aloof, this attribute serves a purpose. Her energy is not for everyone, and not everyone deserves it! To be in her presence is a gift. The people she chooses feel special, because they know she's picky with her people. \n\nAt times, she may be interpreted to seem superficial. She may enjoy some things that fall in that category, but she isn't. All of what you see of her is real; just know it's not easy for those unfamiliar or uncomfortable with her energy to understand this fully.",
        "moon_meaning": "Her Highness is here to remind you to honor and enjoy the riches within and around you. Sometimes they last a while, sometimes less, and sometimes they just pass through. Beauty and riches are believed to be uncommon, but this is one of society's greatest lies. This world is rich in all areas. Riches are usually hoarded by those feeling unloved and unable to trust in love. \n\nSometimes riches don't look like riches. Sometimes poverty is disguised as superficial riches. If you feel like you have nothing, have emphasized false riches, or suffered a great loss recently, this is a reminder that these are symptoms of a hidden belief of belonging in lack. \n\nMoney and its culture is one aspect of wealth, but it comes in many forms. Know that we all have riches. You might have a large family who are fiercely loyal and supportive. A home. An influential group of friends. Incredible music skills. An ocean or mountain 5 minutes walk from your home. An eye for beauty that brings awe to people. Your health, your vitality and your life! \n\nIt is time to identify and own your riches. Once you do, your acceptance of wealth can expand into other areas of your life and bring you a Kingdom!"
      },
      {
        "id": "emperor",
        "title": "The Emperor",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/bd9768b8-b5ee-4291-bb90-4d170ee38e55/king+sword.png", 
        "time": "Now",
        "energy": "Progress",
        "location": "Cities and Empires",
        "element": "Earth",
        "sun_meaning": "Clarity, inner strength and a fierce intellect are core qualities of The Emperor. An aura of stability, experience and authority emanates naturally, lacking the continual exertion of forcefulness a misaligned ego may display. This is a confident director and leader rooted in lived experiences as their teacher. \n\nThis energy thrives on creating preparation and structure to meet life's responses as they appear. Their prayer is consistency, persistence, dedication and faith in their success. They may direct their gifts toward a cause, a collective benefit, a service to many or a mission. \n\nCall upon and cultivate this energy and connected qualities to help propel yourself to the next phase of your life.", 
        "moon_meaning": "While the qualities of an emperor are associated with leadership and efficacy, these success-oriented qualities can create a shallow experience of life when taken to imbalance. When fear creeps in, even a little, over-reliance on consistency and structure shows up as a symptom. The balancing qualities of faith and intuition tend to be pushed out when this occurs. \n\nIn this moment, the Emperor must ground themselves through reconnecting with their heart and examine what inspired them to disconnect initially, beyond 'survival'. They will need to go deep. \n\nSacrifice as a concept is often perverted to encourage self-abuse as honorable. However, a kinder concept is this: sacrifice can be a useful strategy in a few cases, but it is not, and has never been, a sustainable strategy. \n\nCommitting to a path can be taken to extremes where not moved initially from a heart-felt inspiration. When the heart as a grounding point is lacking, people are suddenly betraying themselves, friends, dependents and partners, all for a 'mission's' dogma. \n\nIf this message speaks to you, heed this as a moment to observe the path of choices that got you here and re-allocate the future steps of your journey today. There is always the ability and opportunity to change our path and future. Ask where that exists for you."  
      }, 
      {   
        "id": "kungfusifu",
        "title": "The Kung Fu Sifu",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/8b4d5b3e-cfc3-4285-8501-d6f8fb400f02/kungfumaster.png", 
        "time": "Eternity",
        "energy": "Immediacy",
        "location": "Mountains, Temples, Dojos",
        "element": "Air",
        "sun_meaning": "A sagely teacher in continual discovery of great wisdoms from within. One who is walking this path through a high level of devotion and discipline. They are an eternal learner and student, dedicated to evolution and mastery of self, through physical and mental development. \n\nConflicts are chosen with discernment, and battles even moreso, with wins and losses seen as equally valuable. Dedication to physical health, with devotion and discipline to mastery are the qualities this one holds sacred as pillars of their life path. They embody self respect and seriousness towards this and remain in peace and confidence in this strategy. \n\nIf you have drawn this oracle, this is a sign to consider devoting meaningful time towards developing your physical health. It could be through diet, martial arts or simple fitness. Our physical vessel when exercised assists mental health, clarity, strength and an intuitive's ability to channel intense energies through them. \n\nIt develops and expands the capacity of our nerve(ous) system and will serve a high quality of life long term. Give it consistency, patience and dedication and you will succeed.",
        "moon_meaning": "The Sifu may take seriousness to an extreme. To a strict disciplinarian, pleasures of life are often viewed as superfluous and distracting, with the added risk of becoming an addiction. To this mindset, engaging activities of pleasure and joy are misconstrued as symptoms of weakness, or a lack of dedication. \n\nWhile declining some pleasures is a necessary choice in maintaining discipline, it is a distortion to assume all pleasures are such. Pleasure can serve a necessary expansive ally in growth. When we push ourselves through intense growth process, pleasure greatly benefits growth integration through the reflections and lessons which only contrast can bring. \n\nPleasure can also serve to remind us of the full human experience available, and shape our motivations and chosen paths in other aspects of a great and whole life. For one seeking mastery, abstinent practices like celibacy, fasting are seen as reliable tools to receive deep insights. Commonly, wisdom in the nature of one's addictions and hidden poisons of the psyche are attained. \n\nHowever, if long-term abstinence is actioned in an inappropriate environment, time or set of conditions - or to excess, driven by insecurity - this can create imbalance and misalignment in your full discovery of self. For the one who draws this card, the message is that play, pleasure, love and joy are important to your mastery path. \n\nMany great masters have experienced technique through all textures of life including happiness, sadness, anger, delight, grief and ecstacy. Consider this a sign to inquire if this is what is missing for you."  
      },
      {  
        "id": "vampire",
        "title": "The Prince of Darkness",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/6c3a3922-c77f-4483-9306-e43f016b7265/Prince+of+Darkness.png",
        "time": "Not Yet",
        "energy": "Hibernation",
        "location": "Inside, Caverns, The Womb",
        "element": "Darkness",
        "sun_meaning": "The one who is perfectly at peace in solitude and may be perceived as a hermit, or recluse. In the safety of their castle, they are safe and undisturbed, preferring their peace and space to develop themselves or whatever they choose. It's here they can meditate upon musings in great depth. \n\nUnmoved by social pressures they are rarely seen in common gatherings and may be the subject of gossip among the basic-minded. Maybe the stories are true? This one remains unmoved. If needed, they can always leave the confines of their abode and reaquaint others with their uniqueness and presence, but for now, this is not needed. \n\nEnjoy this phase of disconnection from the herd, and the joy of exploration in solitude. The amount of their noise your remove is equal to the grandness of mental space your thought, imagination and reflection gets to occupy.", 
        "moon_meaning": "Too much reclusion can erode into an avoidance of life's many wonders. When one stops engaging with all the good things in living, it can be easy to fall into heavier emotional cycles such as bitterness and depression. There's a reason solitary confinement is considered punishment in prisons. \n\nTo get the most richness out of our lived experience, other people present can grant reflection, contrast and expansion... even healing! Being around certain people helps us grow, face ourselves, love ourselves in ways we didn't see before, and thrive. The message here is to explore whether you are denying yourself parts of life that could expand you right now. \n\nHas hiding turned you bitter or afraid when in connection to others? If you are experiencing a state of loneliness or depression, perhaps finding or connecting with people - even prioritizing finding your tribe, your chosen family - is the medicine you need. At the very least, you'd do well to get some sunlight."
      },
      {   
        "id": "merchant",
        "title": "The Merchant",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/744ad478-5cb1-44a0-8f43-da8663c7fe7a/The+Merchant.png",
        "time": "Work Hours",
        "energy": "Building, Opportunity",
        "location": "Social environments, Markets",
        "element": "Water",
        "sun_meaning": "The one who has a keen eye in recognizing opportunities for connecting people with what they desire. This one has a talent to match-make services or items of value to the needs of a person. The Merchant at their best is in alignment with the often unrecognized artistry hidden in the corners of their opportunistic inspirations. \n\nThis one is particularly gifted to enhance the life experiences of many through helping to meet and anticipate needs. While able to use these talents, they also gain additional advancements in other skills. When a developed form of this 'self', they are able to easily spin up systems, and networks of operation and flow to deliver the value they decide to provide. \n\nThese talents in completion of form can yield fortune, fast, intense lessons and a greater field of inspiration and choices to the one who this oracle is drawn for.", 
        "moon_meaning": "This one has great talent in recognizing opportunity, but can easily become addicted to the high of building, and the flow of fortunes that can unlock with a successful operation. In this addiction, a reduction of integrity, quality control, corruption, and loss of connection to the true self can arise. \n\nWithout taking heed of one's alignment, the merchant can fall into habits of exploitation across the board. One with the talents of a merchant is able to have many opportunities at fortune and reward, but in the same breath, many opportunities to chase fast-money out of desperation or greed, where the fear of a lack of it is secretly running the show. \n\nWhen this is the case, the merchant is vulnerable to creating the same instability within them, in their business, and loss of fortune becomes probable. The wisest move here is to shift gears to patience, gradual gain, and move toward stability once more, accepting any losses that are present. \n\nLosses are temporary and you will be victorious again, provided you stay commited to your true values and do not again give in to the temptations a fear of lack may bring."
      },  
      {     
        "id": "equanimous",
        "title": "The Equanimous",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/a80324db-00e4-42d9-9b61-7d61e3a93058/Meditator.png",
        "time": "Eternal",
        "energy": "Stillness",
        "location": "Inside",
        "element": "Spirit",
        "sun_meaning": "Inner calm, eased reflection and a deep awareness of self are the traits of the meditator. When advanced, equanimity becomes the central quality the meditator draws upon. This one knows what rest truly means. Not simply sleep, but to pause, to slow down and be present. To witness all intensities and subtleties without being owned by any. \n\nIn full present awareness, all questions and answers are found. All sensations are felt, witnessed and accepted. Emotional 'triggers' and experiences that activate self-protection in the forms of numbness, avoidance, disconnection and addiction are able to blossom fully into the wisdom they contain and finally integrated into the experience of self. \n\nThe equanimous is the one who knows how to be, rather than 'do'. They know the conditions and mind-traps that are created when we disassociate. Presence is how we unwrap the gifts in every situation and access the best our consciousness has to offer us and others.",
        "moon_meaning": "This is your call to go fully within. Call out and put a stop to avoidant behaviors so you can finally be with yourself. Be present in whichever your forms of meditation are. Allow the discomforts you've avoided to be fully felt. Wisdom will follow. No rushing or speeding it along; moving forward in the way you have been has created stagnance in growth and life. \n\nTrust you can take your foot off the gas, as you are and will continue to be provided for. How would you be here if that was not true? In the spirit of loving yourself fully, grant yourself the space, time and permission to witness all you've not allowed yourself to. \n\nSometimes stopping the 'doing', and choosing the 'being' in presence with yourself is the fastest path to get where you need to go. Do not give in to the lie of lack. You are always supported and provided for. All is moving in perfect timing. Reconnect with your depths of self and you will see clearly once again."
      },  
      {
        "id": "warrior",
        "title": "The Warrior",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/3f7201c3-1189-43c4-a33e-899d8e90da00/Warrior+General.png",
        "time": "When Correct",
        "energy": "Drive",
        "location": "In the Conflict",
        "element": "Fire",
        "sun_meaning": "Unstoppable drive, persistence through discomfort and unwavering commitment to the mission, whatever it may be. These spirits can persevere through anything. With a force of clarity and drive to break through any obstacle, the fire of the warrior is essential when challenges arise. Sometimes the mission given is one of protection. Sometimes it's a mission of resilient non-action when the impulse is to act. \n\nTo be able to dedicate oneself toward selflessy stewarding the safety of others is a special and sacred task. This level of giving requires a caring heart and one in dedication to the service and well-being of a collective. \n\nThe qualities of the warrior are not just for combat, but can be used in matters of healing, creation, transformation, peace, and to forge a new life when the old no longer works.", 
        "moon_meaning": "The warrior spirit is often misconstrued with violence. Often, many develop warrior-like attitudes to survive times of violence, oppression or dense challenge. After the passing of those times, it common to continue using the warrior spirit's power and intensity to move through life. This is often a mistake. \n\nImagine using a rocket to reach a location which is a 2 minute walk's distance. Though exhilarating perhaps the first few times, it would be needlessly intense, waste energy and put the nerves on a high alert state. Eventually, the adrenaline highs are followed by crashes and energy levels oscillate between absolute exhaustion and hyper-arousal. \n\nThe warrior is one aspect of being human, albeit a powerful one. Remember; all warriors need a rest! Balance, harmony, joy, play, love and peace are parts of a warrior's life also. What's the point of fighting battles if there's no enjoyment of the peace earned from one? \n\nIn case it isn't obvious, this is a sign to look to where you are over-exerting yourself, picking battles where none are needed, and staying in the fight when it's past the point of being in service to anybody."
      },  
      {
        "id": "firedancer",
        "title": "The Fire Dancer",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/6878efab-339d-48be-abee-8f7c6911a154/fire+dancer.png",
        "time": "Now",
        "energy": "Expression",
        "location": "Playful Spaces",
        "element": "Fire",
        "sun_meaning": "Playful, brave, child-like and alive! This one is a ray of sunshine beaming through the clouds, wearing a party hat. Even a grouch can't help being touched by the warmth and vital nature of the Fire Dancer, particularly if they're clinging to a dour mood. \n\nThis lively being loves to play and put on a show as they are a performer at heart. Witnessing their art can be deeply inspiring and healing, as if an antidote to the places where we have surpressed our own fullness of expression. \n\nWhen the Fire Dancer shares their gifts, their presence can remind us of the taste of liberation, freedom and ecstacy. In reverent service to their passions, and their audience, they awaken the curiosity of those who to seek to activate and experience their own liberation from within.", 
        "moon_meaning": "The fire dancer is a breath of fresh air for many and a living dose of inspiration! Seeing the Fire Dancer may be an invitation to let more of your child-like mirthful qualities come through you and to lean into more being in your joy and free expression of it. \n\nThe free-spirited nature of the Fire Dancer may be pointing towards your movement away from shame and fear of expression and towards liberation. Where are you hiding parts of yourself from being seen? What are you ashamed of? What do you 'hate' about yourself? Are you afraid to be seen in your vulnerability? \n\nThese are the spots for you to be tender and inquisitive, much like an inquiring child, rather than judgmental and divisive. When you truly free yourself from the prison of judgement and shame, you can finally claim the vitality you've been missing. \n\nThis is your time to freely express and share your heart's truth. Show who you really are!"
      },  
      {
        "id": "polymath",
        "title": "The Polymath",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/42799d60-4a6a-4a79-9ede-bdb7af44cf6f/real+polymath.png",
        "time": "Any time",
        "energy": "Rebirth",
        "location": "The next version of you",
        "element": "Death and Life",
        "sun_meaning": "You are one who has and continues to live many lives. One day you're a financial wiz, the next you're an event planner creating art as a livable experience. \n\nYour brain is one people admire and your life is unique and inspiring to many. Witnessing and being around your lived experience is a healing event for others.", 
        "moon_meaning": "Uncertainty of what's next is not something that typically bothers one like yourself. When a lack of clarity remains in one's path for an extended period of time, it can bring up fears of abandonment, loneliness, inadequacy and more. Depression and other experiences can emerge. \n\nThese emotions can be signs you've been emotionally and mentally revisiting the past to your near-term living detriment. How can one move forward if they keep looking back? This is your sign to check in with yourself on why you struggle to let go of the past. \n\nWhat are you ashamed of from that time? What pain haven't you let your body witness and free? Why don't you think you deserve your visions? These questions will help lead you to the truth."
      },
      {
        "id": "dreamsurfer",
        "title": "The Dream Surfer",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/173f2297-f46d-4659-a0f8-9484c1413235/dream+traveler.png",
        "time": "No time",
        "energy": "Play",
        "location": "Your soul",
        "element": "Ether",
        "sun_meaning": "The one who feels at home in the mysteries of dreaming. Connected deeply and widely to their intuition. A channeler or visionary who accesses deep creativity, often visual or storied. This one easily deciphers the language of subtle energy and lives within the concept that everything is a dream. \n\nYour mind is able to play with textures, layers and abstraction as natural language. Your mind is a playground and your younger self's imagination designed the sand pit. This is a reminder to look for opportunities to play with this aspect of yourself more, as a meaningful expansion of your experience of self is on the horizon. \n\nMaybe explore dream yoga, art, music, poetry and play. Perhaps find a game you can play with others which allows you to flex this unique set of muscles.",
        "moon_meaning": "The one who can play in layers of abstraction easily. 'Normality' can often get lost and isolation can become default in this part of their human experience. If you feel alone at this time, the recommendation is to ground yourself into something present and tangible. \n\nGo into a forest, a beach or your garden and plant your bare feet on the Earth. From there, slow and deepen your breathing. Feel and visualize yourself breathing from and into the Earth and bring your attention to the awareness of feeling sensations in your body. \n\nDo this until an emotion, perhaps one that's felt held back or hidden, arises and moves through you. Please be patient with yourself, and the emotion. It can help to continue this type of breathing until you reach a place of ease, calm and a feeling of completion. \n\nSometimes all we need to shift out of chaos is to plant ourselves in the Earth and feel what has been stuck in our bodies, avoided and distracted from."
      },
      {
        "id": "ringmaster",
        "title": "The Ringmaster",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/5a27c194-2bae-46c5-bb2a-4188fe604ddc/Ring+master.png",
        "time": "The Present",
        "energy": "Chaos, Rhythm",
        "location": "Your team",
        "element": "Air",
        "sun_meaning": "Mastery amidst chaos. The show-runner. The grand conductor. An ability to maintain level-headedness as the eye of the storm. The co-ordinator among what appears as madness. This is being is one who can be in ease within the intensities of chaos and disarray. They are connected with the flow of creation. They know how to connect with the true nature of their team members and all else. \n\nThey conduct chaos, accident, and all that seems wild into an almost musical harmonious flow. They thrive in the uncertain, knowing success will come through revealed steps of a path, where the ending is not usually in easy sight. \n\nTo be embodied with this skillset is to be capable of great art, team leadership, grand change and impactful co-creations as a leader who is in service to the creation while in respect of all whom make it.",
        "moon_meaning": "Sometimes mastery of chaos can lead to a symphony of exhilirating highs and lows and a sense of comfort when within it. This can make moments of stillness a challenge. When the highs go away, are you able to enjoy the nothing? Does the elimination of stimuli create discomfort for you? \n\nPlay and dance are great ways to fill that void, but what about when the need for the self is simply to be. To witness the aftermath of self as victorious from the chaos. To be able to witness the chaos outside and not need to connect with it. To be able to expand and contract when the self needs. \n\nIf support is needed to come back to yourself and peace, remember to allow vulnerability so you can ask for that support. And it's ok if it comes from those who you are typically a pillar for."
      },  
      {
        "id": "devotee",
        "title": "The Devotee",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/bbd9f042-0037-4272-9b20-ded5130a5404/devotee.png",
        "time": "Always",
        "energy": "Commitment, Avoidance",
        "location": "Wild Earth",
        "element": "Earth",
        "sun_meaning": "A being who is consciously, fully-embodied in living their purpose. They are heart-forward in their devotion to their cause. To them, their purpose in a service to a greater cause is a calling they've fully chosen. This energy can extend into a job role, a spiritual leadership, a tribe, a familial status or otherwise community-serving position. \n\nThe devotee is incredibly protected and supported in the claiming of this role, watched over by the protectors of those they serve. In this devotional way of being, the heart-forward devotee surrenders to being a vessel for something greater than they currently perceive. In that, they become in tune with the needs of whom they serve, and the environment around them. \n\nThrough these intentional attunements, they become a channel for the most aligned things to come through.",
        "moon_meaning": "In a devotional life, some can fall into trappings that although look like devotion, are actually result of an ego-feeding exchange. For example, when someone takes a community position to gain opportunities for themselves, rather than serve. \n\nEven in choosing a challenging path such as that of a monk, yogi or fakir, known or unknown false devotion becomes the handing over of personal power to escape personal responsibility. \n\nIf one is not truly, internally heart-driven by their devotion, it's possible to become a puppet to someone else's dogma or force. This can even extend to relationships. All of this to say that false devotion can be another way to from hide the truth of self. \n\nBeware these trappings of false devotion. Perhaps it's not your time to devote to a cause, but rather to self-discover? Consider this a message to explore the deeper truths and motives around devotion pertaining to whom the Devotee represents in your oracle."
      }, 
      {
        "id": "phoenix",
        "title": "The Phoenix",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/e700d531-af11-4703-89e1-5891c77b1a7a/meditator-phoenix.png",  
        "time": "Now",
        "energy": "Death, Rebirth",
        "location": "The Soul",
        "element": "Fire",
        "sun_meaning": "The phoenix arises! Their power is ignited, alive and ready to blaze new trails from an aligned place! This is a fertile and powerful time for whomever has drawn the Pheonix. Anything that may cause obstruction cannot be given energy. \n\nIf an obstruction causes fears to activate a state of drainage, or a nerve system panic, simply refocus attention and re-choose your path of most aligned excitement, passion and expansion, knowing that now this is active for you. \n\nThis is a meaningful rebirth process. Regardless of the point in the process, this is a pivotal time that will feel rewarding and life-affirming. Keep going!", 
        "moon_meaning": "Ignited with desires and an aligned path before us, moving toward a clear direction, we feel free, powerful and alive! However, the smoke-tail of our propulsion eventually diminishes and we may be slowing for a good reason! It’s valuable in this moment to explore where we’re at instead of becoming fearful around the loss of that momentum. \n\nWe can't always be charging ahead. The blast-off energy and powerful movement is an exciting feeling which is easy to attach to. However, it’s important to still remain present and review where you’re at when the propulsion fades. Perhaps now is time for a rest or pause? \n\nRegardless, a review of your progress is wise, and it may be neccessary to explore an adjustment to the path you've been taking." 
      }, 
      {
        "id": "pioneer",
        "title": "The Pioneer",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/e358874e-b9eb-4c59-b00f-0c057680c138/Pioneer.png",
        "time": "Your future",
        "energy": "Courage, Vulnerability",
        "location": "The Unknown",
        "element": "Destiny",
        "sun_meaning": "The brave one who moves forward even when they cannot see what's ahead. They trust their impulse, their guidance and their inspiration. It pushes from within and propells forward, with support appearing as if by magic. It gives energy, life and excitement. This being is typically unswayed by the projections of others. Affected emotionally? Sometimes. The ones who cling to the comfort of certainty aren't aligned with the Pioneer. \n\nThe Pioneer can be present in fear, but they do not give in to it. Fear is a place to explore to the Pioneer. Is the fear saying that you will be tested if you step forward? Are your nerves tensing in response to a place or experience that caused discomfort or harm before? Is it time to face these discomforts and move through them? Are you ready to go through another death and rebirth cycle? \n\nPioneers experience intense cycles of life more than most. Those on this path are well-supported, guided and catalyzed into powerful transformations through trusting their path. 'Fortune favors the brave' is their motto.",
        "moon_meaning": "Venturing into the unknown can be exhilirating, life-affirming and energizing. Moving forward like this can become addictive and sneakily form into an unconscious addiction pattern. True pioneering is following a calling, but what happens to us when we know nothing else and we miss the highs? \n\nWhat if one struggles to find satsifaction when this isn't happening? Will boredom become an intollerable state? How does one know when they're following the pull or stuck in an ego trap? If it feels like you're in your calling, that's when the forces of the universe - or 'The Creator' as some call it - are working through you. Remember this if you feel stuck in a cycle of chasing The Pioneer's High. \n\nSometimes this is a hunt for a validation hit caused by an unhealed parental or societal wound. If your identity doesn't know how 'not' to be a pioneer, remember that sometimes we can enter long phases of feeling lost, and needing to wonder, dream, pause or rest completely when carving new paths. Part of venturing into the unknown is to be occasionally lost, in doubt or process a particularly dense lesson of identity attachment. \n\nPatience is neccessary in this phase of exploration. This is where questions are formed and eventually, new steps appear to the next destination."
      },  
      {
        "id": "darkarts",
        "title": "Master of the Dark Arts",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/ad739379-290b-4f7d-8648-8468e30f59af/darkarts.png",  
        "time": "2 Weeks",
        "energy": "Oneness, Duality",
        "location": "The Shadows",
        "element": "Darkness",
        "sun_meaning": "Cold, sharp and dark is how they appear to many, but that’s a mis-read. This is one who is able to sit peacefully within darkness and remain grounded. Learning the light is easy for most, but to taste the darkness continually and still believe in all that is good and light... that takes a special kind of strength. \n\nThese beings are able to be present in types of experience and energy which many become devoured or consumed by. They can sit in great horror and witness it as flavors of the life experience, with wisdom and riches within to gain. \n\nBecause they’ve been through many-a-hell and have come out the other end each time, they intimately know in their body that all discomforts are temporary, and that they will eventually, once again prevail. Even better - they have the grounding, wisdom and ability to guide others to do the same!", 
        "moon_meaning": "We all have the light and the darkness within us, and in our explorations into the deeper darkness, we can easily lose sight of the light. We might even convince ourselves it's more comfortable and familiar in the darkness. The light is our truth and where much of our power rests. Knowing why you're in pain is one thing, and being able to find comfort in the pain is another. \n\nReclaiming the joy in your heart, while in pain, is when your mastery begins to take place. Holding and moving towards a vision that inspires joy takes courage when most of what you've known is pain. Hoping the darkness will leave can feel like a wish, but knowing that it is impermanent brings relief and even some peace. \n\nIs there a path or experience you desire, that you’re afraid to engage? Has your identity become too entrenched in your mastery of discomfort? Has healing through suffering become an ego trap? Is rejection of joy your protection from disappointment? \n\nThis is a message to take a moment to reconnect with your light and truth. Your power is there, especially when you're drowning in darkness." 
      },  
      {
        "id": "curator",
        "title": "The Curator",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/42552a41-8eb4-443f-b98d-c52ca740af08/curator.png",  
        "time": "The Present",
        "energy": "Discern",
        "location": "Where you feel pulled",
        "element": "Light",
        "sun_meaning": "You’ve tasted and explored the richness of life, immersing yourself through a variety of experiences to be where you are today. Bravery and discernment are key qualities you utilize. Seasoned and comfortable in following inspiration, you’re meeting a new opportunity to expand once again. \n\nAt this stage, you may be embarking on something very new and may be wondering if this what you're supposed to be doing. For you, the answer is this - you have explored and experienced much, not just of your outer world but in how it’s re-sculpted your inner world, inspirations and perceptions. Sometimes after much effort, we get attached to having the final answer. \n\nOf course, that’s a trapping of the parts of ego that want safety through ease. The truth is that you’re constantly evolving, changing and shaping yourself, each change curated from the life experiences you’ve been brave to attend to. You’re a continual work in progress. Celebrate yourself as a great piece of living art.", 
        "moon_meaning": "When self confidence and faith in self takes a hit, we can lose peace with where we are. This is a sign to take a broad view of where you’ve been and where you are today. A rich life is one where many textures have existed. Much like a song has pauses or big build-ups before your favorite bit, life too has its slow moments, its peaceful parts and the moments where experiences are less enjoyable. \n\nThis can simply mean we’re in a period of reflection, appreciation or re-evaluation. Maybe the next steps you take are meant to bring all your experiences together in one big crescendo where it all clicks? \n\nMaybe you’re moving into another set of events that bring you another flavor to add to your magical repertoire? Perhaps you’re simply being given the space you need to integrate all that occured before today. Or you are being challenged to re-evaluate how you exercise discernment in your choices, for your next adventure." 
      },  
      {
        "id": "suave",
        "title": "The Suave One",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/5051e080-f5a4-4d74-a739-2fbd5bfd86c2/douchebag.png",  
        "time": "Later or Never",
        "energy": "Agress or Disengage",
        "location": "Away",
        "element": "Dark",
        "sun_meaning": "Romantic, smooth and adventurous, this being enjoys the thrill of a won seduction, with love gained seen as a prize. They enjoy richness in life by way of sensory pleasures and highs, such as delicious foods, gorgeous art and comfortable, luxurious spaces. For this one, life and experiences become moments to be romanticized and perhaps dramatized. This person moves with a sense of drive when in pursuit of what arouses and excites. \n\nIt is not immediately clear to the chased that this purpose may be compelled by an unexamined wounding or desire. They possess assertiveness, boldness and appear confident, and at times, this can over-correct into aggressive and overbearing presence. \n\nComplex and rich, and sometimes sweet with a hidden innocence, this is a unique being and should be met with patience when in the dance of getting to know them.",
        "moon_meaning": "The shadow of habitual romanticism hides deep wounds bound in misunderstood innocence. This being can often fall in traps of seeking only that which arouses or excites, rather than what soothes and stabilizes. This can lead to an addiction of chasing people as a source of a high. \n\nWhat happens when they who are pursued from an egoic wound are 'caught'? The high is hit, and the flames of passion fade. Discomfort and disastisfaction arises. Their ego is confused. The pursued becomes the hurt and neglected - a whiplash giving the romance a bitter aftertaste. \n\nA deep need to prove self worth is often the root of this cycle. One avoids discomforts about the self through pursuing the drug of feeling accepted by another, even if the behavior is acting from falsehood. These behaviors are best understood rather than demonized. Taken to extremes, it can be described as on the narcisistic spectrum. This is a form of 'taking', in order to fill a deep fear of unlovability or undeservedness. \n\nThis is not a project for you to solve, but a living lesson to give grace, kindness and thanks while you move forward, to somwhere more loving, elsewhere." 
      },  
      {
        "id": "oracle",
        "title": "The Oracle",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/cc91f607-cc52-4094-a394-1a8c658a72a8/the+seer.png",
        "time": "Future",
        "energy": "Spirit",
        "location": "Quantum Perception",
        "element": "Light",
        "sun_meaning": "The Oracle receives intuitive messages with a rare depth of sight and intense clarity of form. When she is willing to open her heart to accepting her gift and its responsibilities, she can channel valuable information to be so clear and divinely tuned, that it can effortlessly initiate others to their highest potential. \n\nWhen she surrenders to the force of this gift and the service it grants others, her life will transform! However, not everyone can wield this ability to mastery. We live in a world where tender hands, heart-connected intellect and brave yet pain-aware tongues are rare in combination. The Oracle highlights that you are not respecting your intuition. \n\nYou are blessed with this very real gift and this is an urgent call for you to treat it with a more serious and reverent honoring. This is a calling to use your intuition and associated abilities more frequently in your life.",
        "moon_meaning": "It's time to question whether you are being truthful to yourself. Have you distorted your intuition to serve an egoic high? A love of being seen as important for example? Is feeling valued in this way allowing you to avoid pain and shame? Are you blurring your intellect and intuition so you can give permission to yourself to advise or criticize others, while avoiding your growth? \n\nCould you be taking better care of yourself? These questions are meant to inspire authentic inquiry, not shame. As a wise uncle once told his insect-powered nephew*, 'With great power comes great responsibility'. All those in service have a responsibility to check where they're misaligned. \n\nIt can feel stifling to consider self-inquiry as a responsibility to maintain the quality of your service, so it may feel more energizing to consider it a way to enhance, deepen and upkeep your abilities. Because in the short and long term, it absolutely is!\n\n*Spider-Man" 
      },  
      {
        "id": "beauty",
        "title": "The Beauty",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/810a091b-6d79-4629-9258-ef36f0d22a6d/beauty+main.png",  
        "time": "The Present",
        "energy": "Appreciate or Disassociate",
        "location": "Home",
        "element": "Earth",
        "sun_meaning": "Beauty is one of nature's most powerful qualities to bring people to a point of attention or recognition. It can be found everywhere in existence, from the perfect to the profane and even the painful. Beauty is as abundant as it is subjective. It can be recognized in a deeply authentic moment, or it can be noticed out of the corner of one's eye. \n\nBeauty is also often so unaware of itself. Genuine beauty isn't seeking to be recognized; it simply radiates what it is in all its honesty and powerfully affects all who meet it. \n\nThe ancient wise folk deliberately utilized beauty so their temples would inspire awe, as awe is a feeling believed to connect us to the rememberance of divinity. Beauty is transformative. It inspires people to a grand goal internal and external. \n\nHow are you using beauty in a positive manner in your life? Are you appreciating what is beautiful around you? This is a reminder.",
        "moon_meaning": "Beauty is often misinterpreted and misused in today's world. Sometimes we feel we're attracted to beauty when what we're really drawn to is an energy representing an incomplete emotional cycle, or trauma, mirrored through another. \n\nAttraction as we experience it when misaligned, is a recognition of a force pulling us toward it, but not always with the awareness of what the truth of the attraction is; thinking it as 'beauty'. We let it consume our thoughts and distract us. That is, until we seek to comprehend what we are truly drawn to. \n\nIs it beauty, or is it a pain we've not yet learned or allowed ourselves to heal? Are we feeling attraction to what is good for us, or something comfortable and familiar? \n\nThis invitation is to explore what you currently find beautiful, and exmaine the truth of the feeling. Chances are you've missed a key detail and may be moving toward something that is not as initially interpreted." 
      },  
      {
        "id": "sleepy",
        "title": "Sleeper Cat",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/96707f72-c722-4dca-a8ab-1ce74caf78a8/cloudcat.png",
        "time": "Late Evening",
        "energy": "Rest or Resist",
        "location": "Sanctuary",
        "element": "Air",
        "sun_meaning": "Finally! A space to rest. To simply let the body, mind and heart take a deep breath in, and exhale all tension held in the body for so long. The deeper and more meaningful the rest, the greater the movements to follow. The kind of rest calling to you is the slowing down, de-armoring, rejuvinating kind. \n\nThe type you cannot shortcut or speed up. Where guilt is prohibited from eyeballing you as you surrender to your nerves de-escalating day by day. The kind where your digital notifications remain ignored, or at least significantly de-prioritized. A rest that is enhanced over time, so muscles can slowly empty of tension, over-use and labor. \n\nDespite societal assertions to the contrary, rest is not a thing we earn; it's a neccessity so our bodies, minds and hearts can empty of emotional inflamations, then reconfigure and synchronize to guide us toward our most aligned excitement and fulfilling life. It is this ever-evolving grounding point that becomes our true foundation of where our most radiant inner light grows from. No music has meaningful peaks without the constrasting dips",
        "moon_meaning": "If you find yourself stagnant, uninspired and unmotivated, yet desiring to create something meaningful, this is your cue to prioritize inspiration. When we feel stagnation for a long period of time, but hold a yearning to create something, it's due to a lack of inspiration as a guiding light or propelling force. \n\nInspiration rarely fails to awaken the energies within, however, when felt, it's also a signal sign-posting toward something connected to your authentic alignment. Does a person ever feel inspired by something they don't care for? Looking for that which genuinely awakens your excitement is one of the most reliable ways to find alignment, and a path to your authentic voice and heart. \n\nThis is a message to use your full senses to find what inspires the fire within you. Do not give in to the temptation of the familiar and easy; seek that which reminds you why you want to be alive, here on this Earth, even right now. It may be something obvious, or something that surprises you completely. \n\nBe open to all possibilities!" 
      },  
      {
        "id": "warlock",
        "title": "The Warlock",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/87108913-f250-4eb8-ba36-ff62501a019d/Manipulator.png",  
        "time": "Unstable",
        "energy": "Influence and Control",
        "location": "A stormy ocean",
        "element": "Wind",
        "sun_meaning": "This one uses their charisma and intellect to shape reality to their desires. Able to tune in to the needs and desires of others, this one is adpet at shaping realities through dialogue and influence. Influential is a great way to describe them at their best. Their key leadership quality is combining magnetic presence and an eluring vision to draw support. \n\nFollowers eventually become inspired to lead a mass-calling or movement which can take on a life of its own! Movements can shift cultures, societies and communities. Movements can seed entire companies and eco systems into immediate success. \n\nWhen one naturally influences movements, they have great power to play with. Choose thoughtfully how to use your influence and be mindful to remain aligned with your true values. Power like this can be easy to polute and corrupt.",
        "moon_meaning": "This one in their shadow uses their influence and 'power' to gain more, as if the power is the grounding point, the purpose and the reward. When will satiation come? When power is grounded in a purpose aligned with a person's heart, it becomes magnetic and can generate a transformative movement. \n\nWhen power is grounded in the pursuit of more power, it becomes a cycle of hunger and disastisfaction. It can seem like progress is happening. Growth, gain, validation, attraction... all the classic addictions of a glutonous ego. 'Progress' is happening in those areas, but it won't sustain long term. \n\nIn silence, the weight of many ignored messages of the heart are being carried. Over time, the weight will wear this one down. For whoever that is, remember this famous Japanese proverb... \n\nIf you get on the wrong train, get off at the nearest station. The longer it takes you to get off, the more expensive the return trip will be." 
      },  
      {
        "id": "kept",
        "title": "The Kept One",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/85bca295-c859-4497-a90a-d13686920f1c/kept+43.png",  
        "time": "Long term",
        "energy": "Dependency, Sovereignty",
        "location": "Home",
        "element": "Dark",
        "sun_meaning": "This one desires to be cared for, and in exchange can 'become' whomever the keeper desires. The Kept One enjoys the pleasures of safety in forms that also amplify status in material and societal ways. They know how to anticipate and tap into the needs of others, ideally serving them exactly what they desire, whether egoic or medicinal in need. \n\nThe Kept One is often judged from afar, yet the role they have chosen is one of exchange; a role for a lifestyle. With consenting adults, is it any different to taking a 9-5 in a job to maintain a lifestyle for self or family? \n\nSometimes we exchange values like uncertainty and adventure for security and stability in a clean transaction. It may not be flashy, romantic, or other standards people hold high. However, for this being, it works and works well. If this is you, this is a calling to reject shame and the 'morals' of others in your quest for what you hold dear, and accept and allow what is important to you.",
        "moon_meaning": "The kept one will often lose their sense of self in the pursuit of managing their partner's needs as a direct condition of their perceived survival. Eventually, when the relationship or agreement is out of alignment, they may adapt to habits of control and manipulation as a way of seeking to restablish the ease or illusion of control the dynamic once contained. \n\nUltimately, all dynamics based on this arrangement will have their end, either through the mutual needs changing or a death. When the kept one is no longer getthing their needs met, the questions to ask are, 'When did you abandon your ability to meet your own needs?', 'When and where did you feel disempowered or abandoned by life and how can you transform the underlying beliefs?', and, 'Who are you and what drives you when you connect to your heart?'. \n\nThe answers received will need to be explored through deep, raw self-honesty. If that is difficult to discover alone, the Kept One should consult a specialist such as a psychologist, hypnotherapist, shaman, or otherwise who creates enough safety and invites enough surrender of the mind's control. \n\nThis is a process and will require time, patience and kindness toward the self. If you drew this oracle for yourself, remember that you were able to meet the needs of another very well. Now it's time to learn to do that for yourself and change your life in new, powerful and magnificent ways. \n\nYou are loved and supported, perhaps in a way you don't yet recognize." 
      },
      {
        "id": "traveler",
        "title": "The Traveler",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/027d426f-ce46-4635-b6d0-e42639e96b3c/traveler.png",  
        "time": "A season",
        "energy": "Freedom, Trapped",
        "location": "Anywhere",
        "element": "Air, Spirit",
        "sun_meaning": "Freedom of choice. Adventures. Following inspiration. Uncertainty and excitement! The life of a traveler is potent dose of the best things life has to offer. You won't know if you're about to land in a place where you'll find a community of people you didn't think could possibly exist, your new home, an amazing adventure that transforms you at your core, or even the love of your life!\n\n The most free-spirited of travelers tend to have no structure other than to flow and follow their impulses. Every new step or location is a gateway to witnessing new parts of self, unexpected paths of growth and rich moments of living. To embody the traveler, acceptance of the unknown, leaning into inttuition and patience is key. \n\nIt's a path of self discovery through experience. The traveler is signing up for adventure and mysterious reward, for new energy and inspiration. Boredom struggles to exist here.",
        "moon_meaning": "Travel is an expansive, unpredictable, exciting experience, but as with all things in life, it has an appropriate time and a season. Some folks who get into the traveler energy can find themselves craving pause, or grounding. Others may find themselves lost and aimless, simply traveling as habit or escape from something challenging emerging within themselves. \n\nThe traveler is an adventurer by nature. However, adventure is a phase of the journey. Another phase of the journey is integration, another is rest and another is share your discoveries and bounties with others (though some may simply hoard). It's time to ask yourself if your traveling still has purpose for you at this time? \n\nIs this the season for travel, or for something else? Are you simply seeking to escape? Struggling to be with yourself? Hanging on to times past attached to an earlier version of self? Are you afraid of commiting to something arising from within, waiting to be birthed? \n\nIt's time to get honest with yourself before making your next move. The human experience has many chapters, seasons and flavors and perhaps the flavor of your next adventure is one undertaken in a different form than globetrotting." 
      },
      {
        "id": "shaman",
        "title": "The Shaman",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/4fc67205-22bd-453a-bf4a-eecbb63eb553/eldershaman.png",  
        "time": "Quantum",
        "energy": "Macro and Micro",
        "location": "Anywhere and Everywhere",
        "element": "Soul",
        "sun_meaning": "The Shaman represents one in service to guiding the spiritual growth of others, utilizing mastery of perceiving energies across multiple layers of existence - a bridge between physical and subtle realms. Those with this calling can interpret physical cues from the body, such as the pulse, all the way through to the emotions hanging in the auric field, the ancestral connections to them, and even messaging from those ancestors. \n\nThe title was originally a translation of a Tungus word meaning 'One who knows'. This being represents someone adept in experiencing a breadth of subtle forms of information, in service to others. This also means they feel much more of life, even lives not their own, sometimes to the detriment of their own lived experience. With mastery, this challenge will be overcome. \n\nThe shaman is truly unique. Know that this being represents more of a calling backed by cultivated abilities, not a set of qualifications that can be purchased. This is a true 'embodied' archetype only few genuinely carry. \n\nIf this card represents you, know that you are being told you have a similar or direct match to this being, and utilizing it in service is certainly part of your path. ",
        "moon_meaning": "The Shaman's failings begin when they forget their pact to be in service. This often arises in the use their gifts for exploitation. A shaman is a human who knows to play in the layers of perception where most perceive no-thing. As in all spaces of the natural world, subtle forces are made up the gentle and the hostile, the supportive and destructive, the docile and the predatory... and all inbetween. \n\nNo shaman is invincible, but in a destitute world where a shaman can feel all-powerful, the utterings of spirit when their egos are inflamed can convince them otherwise and have them drunk on their own power fantasies. \n\nA shaman is many things; a medium between planes of reality. A translator of subtle forces. A conductor of those forces for means of service. A wisdom keeper of traditions ancient, old and new. A connector of energetic forces to make magic happen. \n\nIf you've drawn this card for yourself, this is a confirmation that you are yet to make peace with a deep wound, and you are making choices from fear. In this space, your ability to serve will be hampered by this suffering, and it is encouraged that you withdraw from service to others until you've realized the wound's truest impact upon you." 
      },
      {
        "id": "death",
        "title": "Death",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/2656e5bf-69ce-481a-b9d1-c79a1676d8bf/death.png",  
        "time": "The end",
        "energy": "Ending, Beginning",
        "location": "The end",
        "element": "Soul",
        "sun_meaning": "This is the one who activates a definitive ending. A finishing of cycles, habits, and / or entire ways of being. The ending will likely activate discomfort and disruption. Know that the changes to come will be more in alignment for you than this current one is. This being or force may be here to end something small or something large. \n\nWhile 'death' as a concept instills fear, the real fear usually underneath the fear of death, is a meeting of the unknown in open vulnerability; no control, resistance, nor hiding will protect you from feeling what is to come. \n\nThis is a good thing ultimately. This being is here to finally help remove what is holding you back.",
        "moon_meaning": "Sometimes we must take it upon ourselves to remove discomforts from our lives to eliminate pain, suffering and better our lives. In this case, the message is that you may be trying to remove something before comprehending what it truly represents for you. \n\nWhen we express habitual 'get rid of it' protective behavior, it's often from fear. We know it's in our lives when we witness being in the same cycle at a later time, with different people, places or things playing the same roles! This is not a punishment, but a teaching not yet complete. \n\nUnfortunately, those teachings can become experiences that feel like punishment. This is an invitation to explore what this person, place or thing represents and is catalyzing for your evolution. \n\nBe brave in your exploration and perhaps even ask for insight from those you trust. Once you experience a confident, deep knowing that you've found the truths revealing your true motivations, review your choices and move from there. \n\nSafety is easy to create with continual removal of challenging people, but to cultivate it deeply within us in a way that sustains long term and opens us to richer life experiences, we must explore truths and meet discomforts within before we choose disconnections." 
      },
      {
        "id": "tibetan",
        "title": "Tibetan Monk",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/44bf4ca1-4d6e-4326-89eb-f0ec7526b8ce/Tibetan+Monk.png",  
        "time": "Eternity, Here and Now",
        "energy": "Wisdom, Adolescence",
        "location": "The Mountain",
        "element": "Air, Spirit, Ether",
        "sun_meaning": "Tibetan Monks are masters of thousands year-old teachings around consciousness and the mind. They speak easily to modern thinking minds with a grounding in the knowings of a more natural world. They are guides, teachers and explorers of the subconscious. \n\nThis being represents those who are dedicated teachers, particularly the kind who care to articulate complex concepts easily. They have great analytical minds, articulate mouths, soft hearts and grounded spirits. \n\nIn their explorations, they can navigate from complex math to abstract dreaming and are well-respected by spiritualists and intellectuals. Their journey is one of mastering concepts at grander levels of depth, and refining and rehsaping wisdoms to be shared with the masses. \n\nIf this represents you or someone you know, consider breaking down your wisdom into a teachable form. It could be a book, a program, documentary or other media format. Your lived experience holds treasures to share.",
        "moon_meaning": "The Tibetan Monk is their most radiantly embodied when sharing their wisdom with others. However, this takes time to cultivate. True wisdom requires a wealth of lived experiences to form and refine into lasting and powerful teachings. Teaching is a great responsibility and the experience is required to be able to message the gained wisdom towards many types of thinker. \n\nThis message comes to you to assure that your time will come, but it is not now. You're in the midst of a quest, but the book, program, art or otherwise that you will use to share it is not ready. Stay patient and inspired. \n\nKeep working on what you have and know when the time is right you will be called forward to give your message impactfully." 
      },
      {
        "id": "twopath",
        "title": "Gatekeeper",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/96cc23d6-b191-47a6-9494-f21146cd01e9/cup22.png",  
        "time": "Now",
        "energy": "Free Choice or Obliged Choice",
        "location": "Within",
        "element": "Earth, Air",
        "sun_meaning": "The one who this card represents is at a fork in the road. This is a choice point placed before two pathways. This is helpful to view as, 'who will I choose to be?', rather than, 'what do I do?'. \n\nMany get stuck in the 'what am I meant to choose', but that is a symptom of one who is not fully aware of their abilities in authoring their existence. You have agency and free will. You are the creator of the art that is the paintbrush known as 'you' and the painting known as 'your life'. \n\nPre-determinism is often a symptom to resigning the responsibility as one given the gift of life. You have the gift. Now is when you get to choose how you wish to play with it.",
        "moon_meaning": "Is the one this card connects to taking their status for granted? Do they want to have it all without the comprehension of what that will cost? Sometimes we want all paths at once, but lack the grounding or sense of thoughtfulness in how to wield that reality. \n\nThe ones that seem to have it all often get there through a strong vision and making of choices, some of which are challenging. They know what it's like to steward a vision. To be respons-able. \n\nTo choose their desired vision with a knowing and commitment of having give of self to achieve it. Change of self on this path is inevitable. Making a choice which leads to change is unavoidable. \n\nContinuing to stay in a place of avoiding a choice is actively choosing to not be author of your change. Life will force your hand if you stay there too long."
      },
      {
        "id": "romanbikes",
        "title": "Tribal Alignment",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/f1f0d35a-4465-46f8-8d2f-e01921e8d123/roman+cats+and+bikes.png",  
        "time": "In Conflict",
        "energy": "Harmony or Discord",
        "location": "The Tribe",
        "element": "All",
        "sun_meaning": "A harmonious alignment between people in a shared vision and passion is a powerful force of nature. When the fire of one wanes, another will burn their's to keep momentum in the mission. \n\nWhen one values their tribe as if parts of a greater self, as if parts of an extended nerve(ous) system to their own, they adapt to support instead of triage. \n\nWhen we enter a tribe with a commitment to a shared mission, individuals are cared for, but individualist survivalism takes a back seat. This is a sign that you are in an united and wholeness-centered tribe, or about to create one with this spirit running through it. \n\nAll for one and one for all!",
        "moon_meaning": "For a team in discord, there is often a division of unspoken or unacknowledged motives and inspirations. Conflict is not combat! Conflict is driven by a desire for alignment. \n\nCombat emerges when individuals fear their identity's survival is threatened and needs protection. \n\nIf one knows they are on the same mission, cared for as the team succeeds, or supported if they cannot continue forward for a period, does fear have space to breathe? \n\nA unified and interdepedent, kindship-oriented team is a magical and truly special experience. If there is frequent conflict arising in your tribe, ask these questions: \n\nDoes everyone have what they need to feel safe? Do all feel their needs are met? Do all feel there is a fair protocol for reward? Do all know if they fall, they will be cared for? Can all navigate conflict toward healthy transformation? \n\nWherever a 'no' was answered is where the work is." 
      },
      { 
        "id": "medicinevictor",
        "title": "The Victory Drink",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/b261b383-8196-460b-81ba-5a63ebbf7d52/cheers+bro.png",  
        "time": "The Past",
        "energy": "Acknowledge or Ignore",
        "location": "Mountain Top",
        "element": "Spirit",
        "sun_meaning": "This one claims a hard earned victory! An important chapter is complete. Now is the time where blessings flow, including wisdom, rewards and more. \n\nEffort, work ethic, perseverance, and inner strength are qualities which have increased in this period. New life paths and opprtunities follow.",
        "moon_meaning": "A gift of victory is the ability to bask in the glow of an earned reward. However, sometimes the desire for that high can blind us to a premature celebration. \n\nThe encouragement in this moment is not to rush towards claiming the win, but to pause and review. You are close, but not there yet! In this pause, truths will arise and victory can then be given a plan to secure." 
      },
    ];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': isAllowedOrigin ? new URL(referer).origin : 'https://www.themagickmechanic.com',
        'Cache-Control': 'no-store, private',
        'Pragma': 'no-cache'
      },
      body: JSON.stringify(cards)
    };
  } catch (error) {
    console.log('Error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
