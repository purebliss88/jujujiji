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
        "sun_meaning": "A sensitive being who calls in youthful bravery and strength as they head into their soul's dark corners. The medicine being ingested currently is transforming divisive perceptions of self to more loving ones. This is a challenging step in learning to accept those things one might desire to attack in themselves. \n\nThis phase of self-inquiry is a pivotal one, and eyes can see ahead toward the prize. However, there's more to drink, and the prize can only be claimed when the drink is finished.",
        "moon_meaning": "As we learn to witness the previously less-liked parts of ourselves, bitter tasting truths can scare us from exploring further. A pause in this moment can be helpful to ground ourselves, collect courage, ease our nerves or integrate hard-to-swallow realizations. \n\nIn this phase, settling into comforts and old habits can set in, allowing extended pauses to emerge. Be careful the pauses do not become avoidance or procrastination. This is not a time to hope things will just go away or change without discomforts being met. \n\nYou will be victorious, and you are supported. Remember this, complete the pause, then drink the rest of your medicine."
      },
      {
        "id": "twin",
        "title": "The Twin",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/0e8160d8-4d26-45e4-ba44-3460ac6af728/Twins.png",
        "time": "Pause",
        "energy": "Reflect",
        "location": "Home",
        "element": "Light",
        "sun_meaning": "One who effortlessly reflects another at a level of uncomfortably disrobing depth. More than a typical brother, sister or partner, they see and hear the other at what may seem like their deepest level of self. This energy arises when we are ready to face ourselves, with the bonus added support-stilts of being lovingly held and seen. \n\nWhen a spotlight is upon someone treated like a criminal, the light can feel hot and uncomfortable. When a spotlight is held by one who truly embraces us and is supporting our transformations, unmasking can feel relieving. \n\nA twin energy is one of life's gifts to help us evolve, with love. It's worth remembering this when tough times arise with this person. And to remember that sometimes when we need to be the one who reflects others with that level of raw depth, it is rarely a welcomed or easy job. Bravery and a gentle tongue help together.",
        "moon_meaning": "A twin in our lives, while a gift, can make it more challenging to ground into desired ease, old habits or comforts. While love is easy to give and receive with a 'twin', to claim personal space, boundaries or your own path can create an experience of betrayal - fear of doing it, or receiving it - even if not accurate. \n\nHowever, this is a healthier path than to betray ourselves which will ultimately betray the health of the relationship. This refinement of self is a critical growth point for all, and when honored and cultivated grants the grandest and deepest rewards... eventually. This typically benefits a meaningful connection between two people, even if it leads to the closing of a chapter. \n\nWhen both in a relationship choose to be their truest self, the world around them changes to an aligned one. If this alignment creates division; temporary or otherwise, then it's important to honor that. In life, when a relationship is no longer supportive and falls away, a new more harmonious relationship is likely to come."
      },
      {
        "id": "creator",
        "title": "The Creator",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/fef6a9e9-1ab1-429f-8587-c85215436420/thecreator.png",
        "time": "Create",
        "energy": "Birth",
        "location": "Within",
        "element": "Life",
        "sun_meaning": "You have the power to bring visions to light, provided that you allow the energy coming through to guide the work fully. This may take you into new territories including feelings of uncertainty. Creation is most empowered when you allow the spirit of 'it' to lead the work. \n\nIf you try to control or steer the spirit against its nature, you may pervert its essence and goal. As a creator nurturing a garden of vision seeds, one is cultivating an idea from seed to fruition through all weather. You plant and water that seed. For that seed to grow best, it must be given the right environment, nutrients and watering schedule. \n\nYou are not who dictates what it needs, you are the one who identifies and responds to its needs and serves the seed to its successful fruiting.",
        "moon_meaning": "You and your life is the seed to tend in the garden of a creator. This may be a time to evaluate your environment, your nourishment and your safety to grow. The irony of creators is some fail to care for themselves in the passion of birthing the creation. \n\nIn this case, the message is that without you, there is no creation. There's no vision, art or creation without the steward. If a plant has nobody to tend it, or the wrong conditions to grow, it won't fruit, or the fruit will taste foul. \n\nSee yourself as a plant. Are your roots safe to deepen and grow here? Are you hydrated? Are you getting out in the sun? Are you connecting with the Earth? There's no need to believe in the myth of the suffering artist."
      },
      {
        "id": "child",
        "title": "The Child",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/f238437b-130a-49b6-9fc2-4ed2d407b525/thenoob.png",
        "time": "Begin",
        "energy": "Play",
        "location": "Inspiration",
        "element": "Fire",
        "sun_meaning": "It's a lovely experience to not know or need to know what's next. To feel like a child again, innocently poking and prodding things without harsh consequence. Testing boundaries and limits. Enjoying innocence, excitement and play, and the safety of a supportive environment and friends to learn from mistakes. \n\nWith that, comes natural course-correction when needed. Enjoy this phase as the forward path forms, whether that results in your gathering of your resources to move forward powerfully, or a movement into a more deliberate and surrendered state of recharging.",
        "moon_meaning": "A child with no assumed responsibilities can attain self-discovered insight, learning and play. For an adult, this is helpful in phases, but to be in this too long could mean a frozen state where there is an unseen betrayal of self and a secret fear of responsibility keeping this in play. \n\nThis can manifest in the symptom of repeated cycles of drifting or procrastination and avoidance. When a person's forward movement seems to start and stop continually, it's usually down to the simple idea of them not feeling 'safe' to go further; an idea likely seeded at a moment of pain in a more innocent time. If this is you, you would benefit to ask yourself these questions: \n\nWhat do you feel protected from, by not moving forward? What are you afraid to be responsible for? What are you afraid of in imagined scenarios of shame and failure? What do you fear to lose? Does rejection, ridicule or shame from others scare you? It's time to be honest with self. \n\nIt is time to choose the vision and all that it costs, or stay in a falsehood and continue betraying the heart, soul and the best possible life path."
      },
      {
        "id": "dimensional",
        "title": "The Dimensional Traveler",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/ac6fbecc-5a0a-465e-b5ae-cc81fdf3b1e2/Dimensional.png",
        "time": "Non Linear",
        "energy": "Explore",
        "location": "Everywhere",
        "element": "Ether",
        "sun_meaning": "One who so naturally perceives so many angles, perspectives, textures, realities, probabilities and concepts, whether intuitive or logical in nature. Your perception, imagination and intellect can sometimes be unbelievable even to you. It can be overwhelming to perceive so much while living in a society that encourages limiting and reductive beliefs of 'reality'. \n\nDo you have to distort your perception to fit in? F* no. Your job isn't to fit in. You have sight and vision beyond the norm. You can interact with and relate to the world in a rare way. You are meant to help stretch the vision of those around you, so do not dare contort your spirit to fit in anyone else's ideas of what you are to them. \n\nYour perception and mind are qualities that can be experienced not unlike a gift to yourself and one that can help others, while also fulfilling your exploratory desires. It's ok to ignore the pressure of knowing who you are. Part of the fun is realizing the who is some of the art you get to create as a daily process in fresh brush strokes. Some of the people you help might even give you new brushes!",
        "moon_meaning": "The gift of a rich, multi-layered perception can also come with the continued challenge to believe in the self as the self isn't like other selves we think we're supposed to be like. How does anyone sit with the constant messaging to identify with something that doesn't fit their experience of self? \n\nThe scare tactic can be summarized as 'be like this, or risk being alone'... but you're never alone, even when you feel lonely. There are always those who care, whether you know them today or not. In low times, it can be hard to remember this. \n\nIf we were all the same, wouldn't life's experience become flat? Wouldn't relationships be redundant? The more you let yourself be you, as you know yourself to be right now, the more people who appreciate you will emerge. When the season's right, more people like you will show up. But not too many! Such is the price of being unique."
      }, 
      { 
        "id": "highness",
        "title": "Her Highness",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/039e6f41-121f-4c47-97f0-3b217267e188/HerHighness.png",  
        "time": "The Present",
        "energy": "Appreciate or Neglect",
        "location": "Here",
        "element": "Earth",
        "sun_meaning": "Her Highness is surrounded by riches and quality in every area of their life. She wears it, breathes it, and it fills her environment on all levels. Her wealth continues to self-perpetuate the more she learns to see, acknwoledge and feel all that she has. When she continues to honor it, it allow it to continue flowing to her with ease. \n\nTo fall out of recognizing what wealth she owns and receives regularly can pull her out of sync with that frequency. This means a key part of maintaining this lifestyle is maintaining the frequency first and foremost. To also choose what aspects of this wealth are to be perpetuated and what aspects are meant to be transitioned away from. \n\nThis means that choosing your social circles and behaviors you are willing to accept from others is key to maintaining the frequency. The moment Her Highness chooses what is perceived as low quality or lesser from the feeling of wealth she embodies, is the moment that frequency becomes the new present reality. Choose with thoughtful intention.",
        "moon_meaning": "Her Highness can become stuck in fears of 'enoughness'. That what she has, is, and will have, will never be enough. She is always looking ahead to the next thing, but nothing truly satisfies. She may simply hunger for more, thinking satisfaction is a trapping of complacency. \n\nWhat does she need? She needs to stop looking ahead and look at where she is. If she could see her as others do, she'd notice the abundant blessings all around her. For the one reading this, you are being urged to look at what you have in all its beauty. Is the universe a scarce place? Of course not. It’s absolutely abundant with life and energy. \n\nEveryone is a microcosm of that universe so surely anything claiming scarcity as truth is built on lies?" 
      },
      {
        "id": "emperor",
        "title": "The Emperor",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/bd9768b8-b5ee-4291-bb90-4d170ee38e55/king+sword.png", 
        "time": "Now",
        "energy": "Progress",
        "location": "Cities and Empires",
        "element": "Earth",
        "sun_meaning": "Clarity, inner strength and a fierce intellect are core qualities of The Emperor. An aura of stillness and authority emanates naturally, lacking the force a misaligned ego may display. This is a confident director and leader rooted in lived experiences as their teacher. This energy thrives on creating preparation and structure. \n\nTheir prayer is consistency, persistence and dedication. They may direct their gifts toward a cause, a collective benefit, a service to many or a mission. Call upon and cultivate this energy and their qualities to help propel yourself to the next phase of your life.", 
        "moon_meaning": "While the qualities of an emperor are associated with leadership and power, these success-oriented qualities can create a one-dimensional experience of life when taken to imbalance. When taken to extremes, consistency and structure can become a hollow rigidity. When responsibility becomes 'duty' or 'obligation', resentment blossoms and disconnects the heart. \n\nA 'why' based on intellectual ideas, with no basis in a heart-rooted inspiration will ultimately feel hollow and require force or other's hearts to propel forward. In this case, the Emperor must question what aspect of their humanity has been sacrificed on the path... and what inspired them to let it go. \n\nSacrifice as a concept has been perverted to encourage self-abuse as honorable. However, a kinder concept is this: sacrifice can be part of committing to a path and can be taken to extremes where not aligned alongside a heartfelt objective. When the heart as a North Star is lacking, people are suddenly betraying friends, exploiting both friends and strangers, and even abusing their own health, heart and humanity. \n\nIf this message speaks to you, heed this as a moment to observe the path of choices that got you here and re-allocate the future steps of your journey today. There is always the ability and opportunity to change our path and future. Ask where that exists for you." // come back to this one \n\n I'm up to here now
      },
      {
        "id": "kungfusifu",
        "title": "The Kung Fu Sifu",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/8b4d5b3e-cfc3-4285-8501-d6f8fb400f02/kungfumaster.png", 
        "time": "Eternity",
        "energy": "Immediacy",
        "location": "Mountains, Temples, Dojos",
        "element": "Air",
        "sun_meaning": "A sagely teacher in continual discovery of great wisdoms from within. One who is walking this path through a high level of devotion and discipline. They are an eternal learner and student, dedicated to evolution and mastery of self, through physical and mental development. \n\nConflicts are chosen with discernment, and battles even moreso, with wins and losses seen as equally valuable. Body/Mind-Awareness, devotion and discipline are the qualities this one holds sacred as pillars of their life path. They embody self respect and seriousness towards this and remain in peace and confidence in this strategy.",
        "moon_meaning": "The Sifu may take seriousness to an extreme. To a strict disciplinarian, pleasures of life are often viewed as superfluous and distracting, with the added risk of becoming an addiction. To this mindset, engaging activities of pleasure and joy are misconstrued as symptoms of weakness, or a lack of dedication. \n\nWhile declining some pleasures is a necessary sacrifice in discipline, it is a distortion to assume all pleasures are such. Pleasure can serve a necessary expansive ally to serious dedication for the reflections and lessons only contrast can bring. It can also serve to remind one of the full human experience available to them, flavoring the depths of how they may integrate revelations on the path of mastery. For one seeking mastery, celibacy, long term fasting and other forms of pleasure removal are seen as reliable tools to receive deep insights. Commonly, wisdom in the nature of one's addictions and hidden poisons of the psyche are attained. However, if done in an inappropriate environment, time or set of conditions, or to excess, this can create imbalance and misalignment in your full discovery of self. For some - not all - the path of mastery includes play, pleasure, love and joy. Many great masters have experienced technique through all textures of life including happiness, sadness, anger, delight, grief and ecstacy. Consider this a sign to inquire if this is what is missing for you."
      },
      {
        "id": "vampire",
        "title": "The Prince of Darkness",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/6c3a3922-c77f-4483-9306-e43f016b7265/Prince+of+Darkness.png",
        "time": "Not Yet",
        "energy": "Hibernation",
        "location": "Inside, Caverns, The Womb",
        "element": "Darkness",
        "sun_meaning": "The one who is perfectly at peace in solitude and often believed to be a hermit, or recluse. In the safety of their castle, they are safe and undisturbed, preferring their peace and space to develop themselves or whatever they choose. It's here they can meditate upon musings in great depth. \n\nUnmoved by social pressures, they are rarely seen in common gatherings and may be the subject of gossip among the basic-minded. Maybe the stories are true? This one remains unmoved. If needed, they can always leave the confines of their abode and remind others of their uniqueness and presence, but for now, this is not needed. Enjoy this phase of disconnection from the herd, and the joy of exploration in the playgrounds of your rich imagination and mind.", 
        "moon_meaning": "Too much reclusion can erode into an avoidance of life's beauty. When one stops engaging with all the good things in living, it can be easy to fall into the heavier emotional cycles such as bitterness and depression. There's a reason solitary confinement is considered punishment in prisons. \n\nTo get the most richness out of our lived experience, other people can add reflection, contrast and expansion. Being around certain people helps us grow, face ourselves, love ourselves in ways we didn't see before, and thrive! The Zulu tribe of Africa are founded upon a level of inter-connectedness and harmony that the modern world has lost almost entirely; essentially operating on a shared nervous system. The message here is to explore whether you are denying yourself parts of life that could expand you. Has hiding turned you bitter or afraid when in connection to others? If you are experiencing a state of loneliness or depression, perhaps finding or connecting with people - even prioritizing finding your tribe, your chosen family - is the medicine you need. At the least, you'd do well to get some sunlight."
      },
      {
        "id": "merchant",
        "title": "The Merchant",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/744ad478-5cb1-44a0-8f43-da8663c7fe7a/The+Merchant.png",
        "time": "Work Hours",
        "energy": "Building, Opportunity",
        "location": "Social environments, Markets",
        "element": "Water",
        "sun_meaning": "The one who has a keen eye in recognizing opportunities for the growth of self or others. This one has a talent to match-make services or items of value to the needs of a type of person. The Merchant at their best is in alignment with the often unrecognized artistry hidden in the corners of their opportunistic inspirations. \n\nThis one is particularly gifted to enhance the life experiences of many through helping to meet and anticipate needs. While able to use these talents, they also gain additional advancements in other skills. When a developed form of this self, they are able to easily spin up systems, and networks of operation and flow to deliver the value they decide to provide. These talents in completion of form can yield fortune, fast, intense lessons and a greater field of inspiration and choices to the one aligned with this form of self.", 
        "moon_meaning": "This one has great talent in recognizing opportunity, but can easily become addicted to the flow of fortunes that can unlock with a successful operation. In this addiction can come a reduction of integrity, and loss of connection to self. \n\nWithout taking heed of one's alignment, the merchant can fall into habits of exploitation of self, team mates and their markets. Providing false values and eroding their own self respect in known low-value solutions, presented disingenuously. One with the talents of a merchant is able to have many opportunities at fortune and reward, but in the same breath, many opportunities to waste energy chasing money, where the reason for collection is simply to hoard it. When the merchant is working in alignment with their values and inspiration, money often has inspired places to move. When the merchant operates as a machine of commerce unconnected from self, they become a hungry ghost, unable to satiate a hunger born of disconnection to self, and emptiness."
      },
      {
        "id": "meditator",
        "title": "The Meditator",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/a80324db-00e4-42d9-9b61-7d61e3a93058/Meditator.png",
        "time": "Eternal",
        "energy": "Stillness",
        "location": "Inside",
        "element": "Spirit",
        "sun_meaning": "Inner calm, eased reflection and a deep awareness of self are the traits of the meditator. When advanced, equanimity becomes the central quality the meditator draws upon. This one knows what rest truly means. Not simply sleep, but to pause, to slow down and be present. \n\nIn full present awareness, all questions and answers are found. All sensations are felt, witnessed and accepted. Experiences that activate self-protection in the forms of numbness, avoidance, disconnection and addiction are able to blossom fully into the emotional wisdom they contain and finally integrated into the experience of self. The meditator is the one who knows how to be, rather than do. They know that rest is to simply be in presence; not to disassociate. Presence is how we unwrap the gifts in every situation.",
        "moon_meaning": "This is your call to rest. Be present in whichever your forms of meditation are. Allow that which you've been avoiding be fully felt and receive the gifts of wisdom to come. You've likely been avoiding what the messages inside and around you have been saying to you. \n\nThat can be a helpful strategy but not forever. This is now the time to stop. Moving forward in the way you have been is now arresting a critical part of your journey. How? Give yourself permission to take your foot off the gas. Trust you have always been provided for in some form, otherwise how would you be here today. Trust you are and will continue to be provided for and in the spirit of loving yourself fully, grant yourself the space, time and permission to witness all you've not. Sometimes stopping and being in presence with yourself, is the fastest path to the doing of what you're destined to do. All in perfect, divinely orchestrated timing."
      },
      {
        "id": "warrior",
        "title": "The Warrior",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/1f8ef801-9480-4a21-822a-dc00978d8bc6/celtic+warrior.png",
        "time": "When Correct",
        "energy": "Drive",
        "location": "In the Conflict",
        "element": "Fire",
        "sun_meaning": "Unstoppable drive and commitment to The Mission, whatever it may be. These spirits can persevere through anything. With a force of clarity and drive to break through any obstacle, the fire of the warrior is essential when challenges arise. \n\nSometimes the mission given is one of protection. Sometimes it's a mission of resilient non-action when the desire is to act. To be able to dedicate oneself to the presence of responsibility for the safety of others is truly a special and sacred task. To be capable of this level of selflessness requires a caring heart and one in dedication to the servitude of others. The qualities of the warrior are not just for combat, but can be used in matters of healing, of transformation, of peace, and to build a new life when the old no longer works.", 
        "moon_meaning": "The warrior spirit is often misconstrued with violence. Often, many develop warrior-like attitudes to survive times of violence, oppression or dense challenge. After the passing of those times, it common to continue using the warrior spirit's power and intensity to move through life. \n\nThis is often a mistake. Imagine using a rocket to go to a shop 2 minutes walk away. Though exhilarating perhaps the first few times, it would be needlessly intense and put the nerves on a high alert state. Eventually, the adrenaline highs are followed by crashes and energy levels oscillate between absolute exhaustion and hyper-arousal. The warrior is one aspect of being human, albeit a powerful one. All warriors need a rest, balance, harmony, joy, play, love and peace. After all, what's the point of being a warrior if there's no enjoyment of the peace earned from battle? In case it wasn't obvious, this is a sign to look to where you are over-exerting yourself, picking battles where none are needed, and staying in the fight when it's past the point of being in service to anybody."
      },
      {
        "id": "firedancer",
        "title": "The Fire Dancer",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/6878efab-339d-48be-abee-8f7c6911a154/fire+dancer.png",
        "time": "Now",
        "energy": "Expression",
        "location": "Playful Spaces",
        "element": "Fire",
        "sun_meaning": "Playful, brave, child-like and lively. This one is a ray of sunshine beaming through the clouds, wearing a party hat. Even a grouch can't help being touched by the warmth and vital nature of the Fire Dancer, even if they're in a particular dour mood or opting to hang onto one. \n\nThis youthful being loves to play and put on a show. They inspire and entertain as a form of presence, which can also be healing for others. They attain mastery through being as their form of doing. Their presence can feel like a taste of freedom and joy.", 
        "moon_meaning": "The fire dancer is a breath of fresh air for many. A living dose of inspiration. Seeing the Fire Dancer may be an invitation to let more of your child-like mirthful qualities come through you and to lean into more being rather than doing for this moment in your life. \n\nThe free-spirited nature of the Fire Dancer may indeed be pointing towards your constriction of expression. Where are you hiding parts of yourself from being seen? What are you ashamed of? What do you 'hate' about yourself? Are you afraid to be vulnerable to the eyes of others? These are the spots for you to be tender and inquisitive, much like an inquiring child, rather than judgmental and divisive like a strict adult. When you truly free yourself from these prison bars of judgement, you can finally step into the feeling of freedom and the vitality it naturally opens up. It's time to free your heart's truth and show who you really are!"
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
        "moon_meaning": "Uncertainty of what's next is not something that typically bothers one like yourself. When a lack of clarity remains in one's path for an extended period of time, it can bring up fears of abandonment, loneliness, inadequacy and more. \n\nDepression and other experiences can emerge. Oftentimes depression and anxiety are symptoms. These symptoms can be signs you've been emotionally and mentally revisiting the past, to your near-term living detriment. How can one move forward if they keep looking back? This is your sign to check in with yourself on why you struggle to let go of the past. What are you ashamed of from that time? What pain haven't you let your body witness and free? Why don't you think you deserve your visions? These questions will help lead you to the truth."
      },
      {
        "id": "dreamsurfer",
        "title": "The Dream Surfer",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/173f2297-f46d-4659-a0f8-9484c1413235/dream+traveler.png",
        "time": "No time",
        "energy": "Play",
        "location": "Your soul",
        "element": "Ether",
        "sun_meaning": "The one who feels at home in the mysteries of dreaming and ethers. Connected deeply and widely to their intuition. A channeler or vision and deeply creative. Deciphering the language of subtle energy. The knowing that everything in life is part of your dream. \n\nYour mind is able to play with textures, layers and abstraction as natural language. Your mind is a playground and your younger self's imagination designed the sand pit. This is a reminder to look for opportunities to play with this aspect of yourself more, as a meaningful expansion of your experience of self is on the horizon. Maybe explore dream yoga, art, music, poetry and play. Find a game you can play with others that allows you to flex this unique set of proverbial muscles.",
        "moon_meaning": "The one who can play in layers of abstraction as normality can often get lost and isolated in this part of their human experience. If you feel alone at this time, the recommendation is to ground yourself. \n\nGo into a forest, a beach or your garden and plant your bare feet on the Earth and slow and deepen your breathing. Feel yourself breathing from and into the Earth and bring your attention to feeling sensations in your body. Do this until an emotion, perhaps one that's felt held back or hidden, arises and moves through you. It can help to continue this type of breathing until you reach a place of ease, calm and a feeling of completion. Sometimes all we need to shift out of chaos is to plant ourselves in the Earth and feel what our minds have been racing past."
      },
      {
        "id": "ringmaster",
        "title": "The Ringmaster",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/5a27c194-2bae-46c5-bb2a-4188fe604ddc/Ring+master.png",
        "time": "The Present",
        "energy": "Chaos, Rhythm",
        "location": "Your team",
        "element": "Air",
        "sun_meaning": "Mastery amidst chaos. The show-runner. Ability to maintain level-headedness as the eye of the storm. The co-ordinator among the madness. This is the image of one who is a great leader in the challenges of chaos and disarray. \n\nThey are connected with the flow of creation, the fields of their team members and all else. They thrive in the uncertain knowing success will reveal a path. To own this skillset is to be capable of great changes and co-creations in a servant-leader role.",
        "moon_meaning": "Sometimes mastery of chaos can make moments of stillness a challenge. When the high goes away, are you able to enjoy the nothing? Does the elimination of stimuli frighten you? Play and dance are great ways to fill that void, but what about when the need for the self is simply to be. \n\nTo witness the aftermath of self as victorious from the chaos. To be able to witness the chaos outside and not need to connect with it. To be able to expand and contract when the self needs. And if support is needed to come back to yourself, to allow the vulnerability within to ask for that support from those who you might otherwise be a pillar for."
      },
      {
        "id": "devotee",
        "title": "The Devotee",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/bbd9f042-0037-4272-9b20-ded5130a5404/devotee.png",
        "time": "Always",
        "energy": "Commitment, Avoidance",
        "location": "Wild Earth",
        "element": "Earth",
        "sun_meaning": "A being who is consciously, ecstatically living their purpose. They are heart-forward in their devotion to their cause. To them, it is their service. This energy can extend into a job role, a spiritual leadership, a tribe, a familial status or otherwise community-centric position. \n\nThe devotee is incredibly protected and supported in the claiming of this role, watched over by the protectors of those they serve. In this devotional choice of being, the heart-forward devotee surrenders to being a vessel for something greater than themselves. In that, they become in tune with the needs of whom they serve, and the environment around them. When plugged-in this way, they become a channel for the most aligned things to come through.",
        "moon_meaning": "In a devotional life, some can fall into trappings that although look like devotion, are actually a shirking of responsibility through handing over power. Another way to look at this is to consider the difference between a vessel and a puppet. \n\nIf one is not truly, internally heart-driven by their devotion, it's possible they've become a puppet for a dogma or force. This mask is often born from a desire to avoid responsibility for their life, and feelings of discomfort and disempowerment arising from the challenge of that. Beware these trappings of false devotion. This is a message to explore the deeper truths and motives of devotion around whom this being represents in your oracle."
      },
      {
        "id": "phoenix",
        "title": "The Phoenix",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/e700d531-af11-4703-89e1-5891c77b1a7a/meditator-phoenix.png",  
        "time": "Now",
        "energy": "Death and Rebirth",
        "location": "The Soul",
        "element": "Fire",
        "sun_meaning": "The phoenix arises! Their power is ignited, alive and ready to blaze new trails from an aligned place! This is a fertile and powerful time for whomever has drawn the Pheonix. Anything that may cause obstruction cannot be given energy. \n\nIf an obstruction causes fears to activate a state of drainage, or a nerve system panic, simply refocus attention and re-choose your path of most aligned excitement, passion and expansion, knowing that now this is active for you. This is a meaningful rebirth process. Regardless of the point in the process, this is a pivotal time that will feel rewarding and life-affirming. Keep going!", 
        "moon_meaning": "Ignited with desires and an aligned path before us, moving toward a clear direction, we feel free, powerful and alive! However, the smoke-tail of our propulsion eventually diminishes and we may be slowing for a good reason! \n\nIt’s valuable in this moment to explore where we’re at instead of becoming fearful around the loss of that momentum. We can't always be charging ahead. The blast-off energy and powerful movement is an exciting feeling which is easy to attach to. However, it’s important to still remain present and review where you’re at when the propulsion fades. Perhaps now is time for a rest or pause? Regardless, a review of your progress is wise, as it may be neccessary to explore a path adjustment." 
      },
      {
        "id": "pioneer",
        "title": "The Pioneer",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/e358874e-b9eb-4c59-b00f-0c057680c138/Pioneer.png",
        "time": "Your future",
        "energy": "Courage, Vulnerability",
        "location": "The Unknown",
        "element": "Destiny",
        "sun_meaning": "The brave one who moves forward even when they cannot see what's ahead. They trust their impulse, their guidance and their inspiration. It pushes from within and propells forward, with support appearing as if by magic. \n\nIt gives energy, life and excitement. This being is typically unswayed by the projections of others. Affected emotionally? Sometimes. The ones who cling to the comfort of certainty aren't aligned with the Pioneer. The Pioneer can be present in fear, but they do not give in to it. Fear is a place to explore to the Pioneer. Is the fear saying that you're be tested if you step forward? Are your nerves tensing in response to a place or experience that caused discomfort or harm before? Is it time to face these discomforts and move through them? Are you ready to go through another death and rebirth cycle? Pioneers experience intense cycles of life more than most. Those on this path are well-supported, guided and catalyzed into powerful transformations through trusting their path.",
        "moon_meaning": "Venturing into the unknown can be exhilirating, life-affirming and even thrill-seeking. Moving forward like this can become addictive and become an unconscious pattern. True pioneering is following a calling, but what happens to us when we know nothing else and we yearn for the highs? \n\nWhat if one struggles to find satsifaction when this isn't happening? Will boredom become an intollerable state? How does one know when they're following the pull or stuck in an ego trap? If it feels like you're in your calling, that's when the forces of the universe, or 'God' as some call it, are working through you. Remember this if you feel stuck in a cycle of chasing The Pioneer's High. Sometimes this is a hunt for a validation hit caused by an unhealed parental or societal wound. And if your identity doesn't know how not to be a pioneer, remember that sometimes we can enter long phases of feeling lost, and needing to wonder, dream, pause or rest completely when pioneering. Part of exploring the unknown is to be occasionally lost, in doubt or process a particularly dense lesson of identity attachment. It's this phase of exploration where questions are formed and eventually, new steps appear to the next destination."
      },
      {
        "id": "darkarts",
        "title": "Master of the Dark Arts",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/ad739379-290b-4f7d-8648-8468e30f59af/darkarts.png",  
        "time": "2 Weeks",
        "energy": "Oneness, Duality",
        "location": "The Shadows",
        "element": "Darkness",
        "sun_meaning": "Cold, sharp and dark is how they appear to many, but that’s a mis-read. This is one who is able to sit peacefully within darkness and remains grounded. They are able to observe that darkness which many become devoured or consumed by. \n\nThey can sit in great horror and witness it as flavors of the life experience, with wisdom and riches within to gain. Because they’ve been through many-a-hell and come out the other end each time, they intimately know in their body that all discomforts are temporary, and that they will eventually, once again prevail. And they can guide others to do the same.", 
        "moon_meaning": "In the shadow, the master of the dark arts can lose sight of the strength of their own light. We all have the light and the darkness within us, and in exploration of the shadow we can sometimes lose sight of our truth and forget our power. \n\nIs there a path or experience rooted in joy that you’re afraid to engage? Has your identity become too entrenched in your mastery of discomfort? Has it become an ego trap? A rejection of joy as protection from disappointment? This is a message to take a moment to reconnect with your light. Your power is there, especially when you're drowning in darkness." 
      },
      {
        "id": "curator",
        "title": "The Curator",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/42552a41-8eb4-443f-b98d-c52ca740af08/curator.png",  
        "time": "The Present",
        "energy": "Discern",
        "location": "Where you feel pulled",
        "element": "Light",
        "sun_meaning": "You’ve tasted and explored the richness of life, immersing yourself through a variety of experiences to be where you are today. Bravery and discernment are key qualities you utilize. \n\nSeasoned and comfortable in following inspiration, you’re meeting a new opportunity to expand once again. At this stage, you may be embarking on something very new and may be wondering if this what you're supposed to be doing. For you, the answer is this - you have explored and experienced much, not just of your outer world but in how it’s re-sculpted your inner world, inspirations and perceptions. Sometimes after much effort, we get attached to having the final answer. Of course, that’s a trapping of the parts of ego that want safety through ease. The truth is that you’re constantly evolving, changing and shaping yourself, each change curated from the life experiences you’ve been brave to attend to. You’re a continual work in progress. Celebrate yourself as a great piece of living art.", 
        "moon_meaning": "When self confidence and faith in self takes a hit, we can lose peace with where we are. This is a sign to take a broad view of where you’ve been and where you are today. A rich life is one where many textures have existed. \n\nMuch like a song has pauses or big build-ups before your favorite bit, life too has its slow moments, its peaceful parts and the moments where experiences are less enjoyable. This can simply mean we’re in a period of reflection, appreciation or re-evaluation. Maybe the next steps you take are meant to bring all your experiences together in one big crescendo where it all clicks? Maybe you’re moving into another set of events that bring you another flavor to add to your magical repertoire? Perhaps you’re simply being given the space you need to integrate all before today. Perhaps you are being challenged to re-evaluate how you exercise discernment in your choices." 
      },
      {
        "id": "suave",
        "title": "The Suave One",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/5051e080-f5a4-4d74-a739-2fbd5bfd86c2/douchebag.png",  
        "time": "Later or Never",
        "energy": "Agress or Disengage",
        "location": "Away",
        "element": "Dark",
        "sun_meaning": "Romantic, smooth and adventurous, this being enjoys the thrill of a won seduction, with love gained seen as a prize. They enjoy richness in life by way of sensory pleasures and highs, such as delicious foods, gorgeous art and general luxuries. \n\nFor this one, life and experiences become moments to be romanticized and perhaps dramatized. This person moves with a sense of drive when in pursuit of what arouses and excites. It is not immediately clear to the chased that this purpose may be compelled by an unexamined wounding or desire. They possess assertiveness, boldness and appear confident, and at times, this can over-correct into aggressive and overbearing presence. Complex and rich, and sometimes sweet with a hidden innocence, this is a unique being and should be met with patience when in the dance of getting to know them.",
        "moon_meaning": "The shadow of romanticism can sometimes be hiding deep wounds bound in misunderstood innocence. This being can often fall in the trap of seeking only that which arouses or excites. This often leads to an addiction of chasing highs. \n\nWhat happens when the pursued is caught? The hit lands and the high fades away. The interest disappears and the pursued becomes the neglected - a whiplash giving the romance a foul aftertaste. A romantic soul possesses much beauty but when the driving forces are misunderstood, the one who chases can appear as cold, heartless, narcissistic or sociopathic. This is because the addiction of the high pulls us out of the heart - the place the romantic is believed to be behaving from. This is what happens when compulsions are unexamined. Narcissistic spectrum behaviors are best understood rather than demonized. They are a condition to pursue love with low awareness and high selfishness. At extremes, it's a form of 'taking', in order to fill a deep fear of unlovability. This is not a project for you to solve, but a living lesson to give grace, kindness and thanks while you move forward, to somwhere more loving, elsewhere." 
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
        "moon_meaning": "A gift of victory is the ability to bask in the glow of an earned reward. However, sometimes the desire for that high can blind us to a premature celebration. \n\nThe encouragement in this moment is not to rush towards claiming the win, but to pause and review. You are close, but not there yet! In this pause, truths will arise and victory can then given final steps to secure." 
      },
      {
        "id": "oracle",
        "title": "The Oracle",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/cc91f607-cc52-4094-a394-1a8c658a72a8/the+seer.png",
        "time": "Future",
        "energy": "Spirit",
        "location": "Quantum Perception",
        "element": "Light",
        "sun_meaning": "The Oracle receives intuitive messages with a rare depth of sight and intense clarity of form. When she is willing to open her heart to accepting her gift and its responsibilities, she can channel valuable information to be clear and divinely tuned, that it can effortlessly initiate others to their highest potential. \n\nWhen she surrenders to the force of this gift and the service it grants others, her life will transform! However, not everyone can wield this ability to mastery. We live in a world where tender hands, heart-connected intellect and brave yet pain-aware tongues are rare in combination. The Oracle highlights that you are not respecting your intuition. \n\nYou are blessed with this very real gift and this is an urgent call for you to treat it with a more serious and reverent honoring. This is a calling to use this gift more frequently in your life.",
        "moon_meaning": "It's time to question whether you are being truthful to yourself. Have you distorted your intuition to serve an egoic high? A love of being seen as important for example? Is feeling valued in this way allowing you to avoid pain and shame? Are you blurring your intellect and intuition so you can give permission to yourself to advise or criticize others, while avoiding your growth? \n\nCould you be taking better care of yourself? These questions are meant to inspire authentic inquiry, not shame. As a wise uncle once told his insect-powered nephew, 'With great power comes great responsibility'. All those in service have a responsibility to check where they're misaligned. \n\nIt can feel stifling to consider self-inquiry as a duty, so it may feel more energizing to consider it a way to enhance your abilities. Because it is!" // rewrite this
      },
      {
        "id": "beauty",
        "title": "The Beauty",
        "image_url": "https://images.squarespace-cdn.com/content/63851693a72d772add4d6c00/5a160bde-760e-4102-9020-c1e94fb56863/child+of+beauty.png",  
        "time": "The Present",
        "energy": "Appreciate or Disassociate",
        "location": "Home",
        "element": "Earth",
        "sun_meaning": "Beauty is one of nature's most powerful qualities to bring people to a point of attention or recognition. It can be found everywhere in existence, from the perfect to the profane and even the painful. Beauty is as abundant as it is subjective. It can be recognized in a deeply authentic moment, or it can be noticed out of the corner of one's eye. \n\n. Beauty is also often so unaware of itself. Genuine beauty isn't seeking to be recognized; it simply radiates what it is in all its honesty and powerfully affects all who meet it. \n\nThe ancient wise folk deliberately utilized beauty so their temples would inspire awe, as awe is a feeling believed to connect us to the rememberance of divinity. Beauty is transformative. It inspires people to a grand goal internal and external. \n\nHow are you using beauty in a positive manner in your life? Are you appreciating what is beautiful around you? This is a reminder.",
        "moon_meaning": "Beauty is often misinterpreted and misused in today's world. Sometimes we feel we're attracted to beauty when what we're really drawn to is an energy representing an incomplete emotional cycle, or trauma. \n\nBeauty as we recognize it when misaligned, is a recognition of something we are magnetized to, as if a force pulling us toward it. We let it consume our thoughts and distract us. That is, until we seek to comprehend what we are truly drawn it. \n\nIs it beauty, or is it a pain we've not yet learned or allowed ourselves to heal? This invitation is to explore what you currently find beautiful, and exmaine the truth of this feeling. Chances are you've missed a key detail and may be moving toward something that is not as initially interpreted." 
      },
      // Keep all your other cards here - I've removed them for brevity
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
