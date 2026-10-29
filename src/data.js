export const topics = [
  { id: "unit1", name: "Unit 1", description: "Greetings, farewells, introductions and numbers", icon: "everyday", tone: "mint" },
  { id: "unit2", name: "Unit 2", description: "My friends, family and numbers", icon: "vocabulary", tone: "lilac" },
  { id: "unit3", name: "Unit 3", description: "Commands, instructions, requests and numbers", icon: "grammar", tone: "peach" },
  { id: "unit4", name: "Unit 4", description: "Sounds, rhymes and numbers", icon: "reading", tone: "sky" },
  { id: "unit5", name: "Unit 5", description: "Their days: school, village and city life", icon: "writing", tone: "lemon" },
  { id: "unit6", name: "Unit 6", description: "Cleanliness and good habits", icon: "sparkles", tone: "mint" },
  { id: "unit7", name: "Unit 7", description: "Save our planet and water", icon: "everyday", tone: "sky" },
  { id: "unit8", name: "Unit 8", description: "Facts, fables and stories", icon: "reading", tone: "peach" },
];

export const passages = {
  jerin: {
    unitLabel: "Unit 1 · Introducing a student",
    title: "Meet Jerin",
    text: "Jerin is eight years old. She studies in Class 3 at Mohonpur Primary School and lives with her family in Mohonpur.",
  },
  sabiha: {
    unitLabel: "Unit 2 · My family",
    title: "Sabiha's family",
    text: "Sabiha is a Class 3 student. There are four people in her family. Her father is a teacher, her mother works at a bank, and her little brother is one year old.",
  },
  sunil: {
    unitLabel: "Unit 2 · My friend",
    title: "Sunil and Rahat",
    text: "Sunil is eight years old. His best friend Rahat is also eight. They live near each other, go to the same school, and play football in the afternoon.",
  },
  porshi: {
    unitLabel: "Unit 5 · Joyful school time",
    title: "A clean school",
    text: "Porshi's school groups take turns cleaning the playground, wash block, classrooms and garden. They use bins and help one another. The groups do this on Thursdays.",
  },
  rani: {
    unitLabel: "Unit 5 · Joyful school time",
    title: "Porshi and Rani",
    text: "Rani and Porshi are neighbours and classmates. Rani uses a wheelchair. Her friends include her in class activities, and students borrow storybooks from the school library each Thursday.",
  },
  nusair: {
    unitLabel: "Unit 6 · Good habits",
    title: "Nusair learns to wash his hands",
    text: "Nusair enjoys playing outside. His mother notices dirt under his fingernails and explains that germs can make him sick. She shows him how to wash with soap and clean water, especially before eating and after playing.",
  },
  water: {
    unitLabel: "Unit 7 · Water pollution",
    title: "Keep the river clean",
    text: "Shihab and Kaniz see rubbish and plastic floating in a river. They ask a man not to throw waste into the water. They worry that polluted water can harm people and put fish in danger.",
  },
  ant: {
    unitLabel: "Unit 8 · The ant and the grasshopper",
    title: "A summer's work",
    text: "During summer, a grasshopper sings and dances while an ant gathers food for winter. When the cold days come, the grasshopper cannot find food. The ant has stored enough food to be safe.",
  },
  festival: {
    unitLabel: "Unit 8 · Enjoying the hill festivals",
    title: "Anika visits Sangma",
    text: "Anika visits her friend Sangma in the hills. On Phulbiju, girls float flowers to wish everyone a happy new year. On Mulbiju, young people spray water and share good wishes.",
  },
  russel: {
    unitLabel: "Unit 8 · A wonderful boy",
    title: "A kind boy",
    text: "The story tells of a boy who loves pigeons. He feeds the birds with his mother and does not eat the birds he cares for. The story describes him as kind-hearted.",
  },
};

export const questions = [
  // Unit 1 — Greetings, Farewells, Introductions and Numbers
  {
    id: "u1q1", topic: "unit1", lesson: "Lesson 1 · Hello", type: "choice",
    prompt: 'Fatiha says, “Good morning. What is your name?” Which reply fits the dialogue?',
    options: ["Good morning. My name is Sanjoy.", "Good night. I am going home.", "I like to play football."],
    answer: 0,
    explanation: "The lesson models a morning greeting followed by a name introduction.",
  },
  {
    id: "u1q2", topic: "unit1", lesson: "Lesson 9 · Numbers 11–20", type: "choice",
    prompt: "Which number is written as fourteen?",
    options: ["40", "14", "4"],
    answer: 1,
    explanation: "Fourteen is the number after thirteen and before fifteen.",
  },
  {
    id: "u1q3", topic: "unit1", lesson: "Lesson 7 · Introducing a student", type: "choice", passageId: "jerin",
    prompt: "How old is Jerin?",
    options: ["Seven years old", "Eight years old", "Nine years old"],
    answer: 1,
    explanation: "The passage introduces Jerin as eight years old.",
  },
  {
    id: "u1q4", topic: "unit1", lesson: "Lesson 7 · Introducing a student", type: "choice", passageId: "jerin",
    prompt: "Which school does Jerin attend?",
    options: ["Mohonpur Primary School", "Chechua Government Primary School", "Sylhet City School"],
    answer: 0,
    explanation: "Jerin studies at Mohonpur Primary School.",
  },
  {
    id: "u1q5", topic: "unit1", lesson: "Lesson 7 · Introducing a student", type: "writing",
    prompt: "Write three short sentences to introduce yourself. Include your name, age and class or school.",
    sampleAnswer: "Hello! My name is Rupa. I am eight years old. I am in Class 3 at Green Primary School.",
    tip: "Use your own details. Start each sentence with a capital letter and end it with a full stop.",
  },

  // Unit 2 — My Friends, Family and Numbers
  {
    id: "u2q1", topic: "unit2", lesson: "Lesson 1 · Talking about friends and family", type: "choice",
    prompt: 'Rishat asks, “Would you like to play with me?” Which reply is polite?',
    options: ["Yes, I would like that, thank you.", "No, I am a classroom.", "Good night, yesterday."],
    answer: 0,
    explanation: "The dialogue gives a friendly, polite reply to an invitation.",
  },
  {
    id: "u2q2", topic: "unit2", lesson: "Lesson 3 · My family", type: "choice", passageId: "sabiha",
    prompt: "How many people are in Sabiha's family?",
    options: ["Three", "Four", "Five"],
    answer: 1,
    explanation: "The passage says there are four members in Sabiha's family.",
  },
  {
    id: "u2q3", topic: "unit2", lesson: "Lesson 3 · My family", type: "choice", passageId: "sabiha",
    prompt: "What does Sabiha's mother do?",
    options: ["She teaches at a school.", "She works at a bank.", "She drives a bus."],
    answer: 1,
    explanation: "Sabiha's mother works in a bank.",
  },
  {
    id: "u2q4", topic: "unit2", lesson: "Lesson 4 · It's a happy home", type: "choice",
    prompt: "Which word names a part of the house in the rhyme?",
    options: ["roof", "river", "garden"],
    answer: 0,
    explanation: "The rhyme names a window, a door, a roof and a floor.",
  },
  {
    id: "u2q5", topic: "unit2", lesson: "Lesson 5 · My friend", type: "choice", passageId: "sunil",
    prompt: "What do Sunil and Rahat play in the afternoon?",
    options: ["Football", "Cricket", "Badminton"],
    answer: 0,
    explanation: "The reading says that Sunil and Rahat play football in the afternoon.",
  },

  // Unit 3 — Commands, Instructions, Requests and Numbers
  {
    id: "u3q1", topic: "unit3", lesson: "Lesson 3 · Hello hello", type: "choice",
    prompt: "Which sentence is a polite request from the unit's language pattern?",
    options: ["Can you open the door, please?", "You opened a door yesterday.", "The door is brown."],
    answer: 0,
    explanation: "The unit practises requests using “Can you + action word + please?”",
  },
  {
    id: "u3q2", topic: "unit3", lesson: "Lesson 1 · Simple commands", type: "choice",
    prompt: "Which one is a command a teacher may use during an exercise?",
    options: ["Keep your body straight.", "What is your favourite game?", "My family lives near school."],
    answer: 0,
    explanation: "The lesson practises giving and following short commands.",
  },
  {
    id: "u3q3", topic: "unit3", lesson: "Lesson 2 · Making a kite", type: "choice",
    prompt: "After folding the A4 paper in half, what is the next kite-making step?",
    options: ["Place a top corner on the opposite side.", "Paint the kite and fly it.", "Tie the string to the tail."],
    answer: 0,
    explanation: "The instructions next move a top corner across; the same is then done on the other side.",
  },
  {
    id: "u3q4", topic: "unit3", lesson: "Lesson 2 · Making a kite", type: "choice",
    prompt: "What do you do with the string to fly the kite?",
    options: ["Thread it through a hole and tie it.", "Put it inside the folded paper.", "Staple it to the tail."],
    answer: 0,
    explanation: "The instructions say to make a hole near the staple, thread the string through and tie it.",
  },
  {
    id: "u3q5", topic: "unit3", lesson: "Lesson 3 · Making requests", type: "writing",
    prompt: "Write one polite classroom request using “Can you …, please?”",
    sampleAnswer: "Can you pass me the pencil, please?",
    tip: "Use Can you, an action word, the thing you need, and please.",
  },

  // Unit 4 — Let's Play with Sounds and Numbers
  {
    id: "u4q1", topic: "unit4", lesson: "Lesson 1 · Middle sounds /æ/ and /e/", type: "choice",
    prompt: "Which pair has the same middle vowel sound?",
    options: ["pen / ten", "pen / pan", "bed / cat"],
    answer: 0,
    explanation: "Pen and ten share the same short middle vowel sound; the other pairs differ.",
  },
  {
    id: "u4q2", topic: "unit4", lesson: "Lesson 2 · Middle sounds /ɪ/ and /iː/", type: "choice",
    prompt: "Which word has the long middle sound heard in “sheep”?",
    options: ["ship", "sheep", "hit"],
    answer: 1,
    explanation: "Sheep has the long /iː/ sound; ship and hit have a short /ɪ/ sound.",
  },
  {
    id: "u4q3", topic: "unit4", lesson: "Lesson 5 · Numbers 91–100", type: "choice",
    prompt: "How do you write 100 in words?",
    options: ["One hundred", "One thousand", "Ten hundred"],
    answer: 0,
    explanation: "The number 100 is written as one hundred.",
  },
  {
    id: "u4q4", topic: "unit4", lesson: "Lesson 6 · Ordinal numbers", type: "choice",
    prompt: "What is the ordinal word for 3?",
    options: ["Three", "Third", "Thirteen"],
    answer: 1,
    explanation: "The ordinal form of 3 is third.",
  },
  {
    id: "u4q5", topic: "unit4", lesson: "Lesson 3 · Row, Row, Row Your Boat", type: "choice",
    prompt: "In the rhyme, what should you do if you see a crocodile?",
    options: ["Shriek", "Go to sleep", "Feed it"],
    answer: 0,
    explanation: "The rhyme says to shriek if you see a crocodile.",
  },

  // Unit 5 — Their Days
  {
    id: "u5q1", topic: "unit5", lesson: "Lesson 1 · Joyful school time", type: "choice", passageId: "porshi",
    prompt: "On which day do Porshi's school groups clean the school?",
    options: ["Sunday", "Thursday", "Friday"],
    answer: 1,
    explanation: "Porshi's school groups clean the school by turns every Thursday.",
  },
  {
    id: "u5q2", topic: "unit5", lesson: "Lesson 1 · Joyful school time", type: "choice", passageId: "porshi",
    prompt: "What do the school groups use for rubbish?",
    options: ["Bins", "School bags", "Flower pots"],
    answer: 0,
    explanation: "The reading says the students use bins while cleaning.",
  },
  {
    id: "u5q3", topic: "unit5", lesson: "Lesson 2 · Joyful school time", type: "choice", passageId: "rani",
    prompt: "How are Rani and Porshi connected?",
    options: ["They are neighbours and classmates.", "They are sisters in different schools.", "They are teacher and student."],
    answer: 0,
    explanation: "The lesson describes Rani and Porshi as neighbours who go to school together.",
  },
  {
    id: "u5q4", topic: "unit5", lesson: "Lesson 2 · Capital letters for days", type: "choice",
    prompt: "Which sentence uses a capital letter correctly?",
    options: ["We borrow books on thursday.", "We borrow books on Thursday.", "we borrow books on Thursday."],
    answer: 1,
    explanation: "Names of days begin with a capital letter, and a sentence begins with one too.",
  },
  {
    id: "u5q5", topic: "unit5", lesson: "Lesson 4 · Oyshi's city life", type: "writing",
    prompt: "Put the words in order: borrows / She / a / book",
    sampleAnswer: "She borrows a book.",
    tip: "Begin with the person, then the action, then the thing. Finish with a full stop.",
  },

  // Unit 6 — Cleanliness
  {
    id: "u6q1", topic: "unit6", lesson: "Lesson 1 · Good habits", type: "choice", passageId: "nusair",
    prompt: "Why does Nusair's mother warn him about dirt on his hands?",
    options: ["Germs in dirt can make him sick.", "Dirt helps him grow taller.", "Dirt makes his hands warmer."],
    answer: 0,
    explanation: "The lesson explains that germs in dirt can make people ill.",
  },
  {
    id: "u6q2", topic: "unit6", lesson: "Lesson 1 · Good habits", type: "choice", passageId: "nusair",
    prompt: "What does Nusair use to wash his hands properly?",
    options: ["Soap and clean water", "Sand and leaves", "Only a dry towel"],
    answer: 0,
    explanation: "His mother shows him how to wash with soap and water.",
  },
  {
    id: "u6q3", topic: "unit6", lesson: "Lesson 3 · When to wash your hands", type: "choice", passageId: "nusair",
    prompt: "When should Nusair wash his hands?",
    options: ["Before eating and after playing", "Only before sleeping", "Only when it rains"],
    answer: 0,
    explanation: "The lesson advises washing hands before eating and after playing.",
  },
  {
    id: "u6q4", topic: "unit6", lesson: "Grammar focus · Plurals", type: "choice",
    prompt: "What is the plural of box?",
    options: ["boxs", "boxes", "boxies"],
    answer: 1,
    explanation: "For a word ending in x, add -es: box becomes boxes.",
  },
  {
    id: "u6q5", topic: "unit6", lesson: "Grammar focus · Plurals", type: "choice",
    prompt: "What is the plural of baby?",
    options: ["babys", "babies", "babyes"],
    answer: 1,
    explanation: "For a word ending in consonant + y, change y to i and add -es.",
  },

  // Unit 7 — Save Our Planet
  {
    id: "u7q1", topic: "unit7", lesson: "Lesson 1 · Water pollution", type: "choice", passageId: "water",
    prompt: "What do Shihab and Kaniz see floating in the river?",
    options: ["Rubbish and plastic", "Books and pencils", "Flowers and fruit"],
    answer: 0,
    explanation: "The reading describes rubbish and plastic floating in the river.",
  },
  {
    id: "u7q2", topic: "unit7", lesson: "Lesson 1 · Water pollution", type: "choice", passageId: "water",
    prompt: "Why are fish in danger in polluted water?",
    options: ["They may get caught in plastic bags.", "They cannot see the sun.", "They eat too many flowers."],
    answer: 0,
    explanation: "The lesson explains that fish can get caught in polythene bags.",
  },
  {
    id: "u7q3", topic: "unit7", lesson: "Lesson 2 · Uses of water", type: "choice",
    prompt: "Which is a main source of water named in the lesson?",
    options: ["A river", "A notebook", "A classroom"],
    answer: 0,
    explanation: "The lesson names oceans, rivers, rain and ponds as water sources.",
  },
  {
    id: "u7q4", topic: "unit7", lesson: "Lesson 3 · Saving water", type: "choice",
    prompt: "What should you do with the tap while brushing your teeth?",
    options: ["Turn it off", "Leave it running", "Fill a bucket and spill it"],
    answer: 0,
    explanation: "The saving-water tips say to turn off the tap while brushing.",
  },
  {
    id: "u7q5", topic: "unit7", lesson: "Lesson 3 · Saving water", type: "writing",
    prompt: "Write two ways to save water at home or at school.",
    sampleAnswer: "I turn off the tap while brushing my teeth. I use only the water I need when watering plants.",
    tip: "Use two different, practical ideas from the unit's saving-water tips.",
  },

  // Unit 8 — Facts and Fables
  {
    id: "u8q1", topic: "unit8", lesson: "Lesson 1 · The ant and the grasshopper", type: "choice", passageId: "ant",
    prompt: "What does the ant do during summer?",
    options: ["Stores food for winter", "Sleeps all day", "Throws away the food"],
    answer: 0,
    explanation: "The ant gathers and stores food so she has enough in winter.",
  },
  {
    id: "u8q2", topic: "unit8", lesson: "Lesson 1 · The ant and the grasshopper", type: "choice", passageId: "ant",
    prompt: "What happens to the grasshopper when winter comes?",
    options: ["He cannot find food and becomes weak.", "He finds a store full of food.", "He moves to a warm island."],
    answer: 0,
    explanation: "The grasshopper did not store food, so he has little to eat in winter.",
  },
  {
    id: "u8q3", topic: "unit8", lesson: "Lesson 2 · Enjoying the hill festivals", type: "choice", passageId: "festival",
    prompt: "What do girls do on Phulbiju in the story?",
    options: ["Float flowers", "Collect books", "Fly kites"],
    answer: 0,
    explanation: "The story says girls float flowers to wish everyone a happy new year.",
  },
  {
    id: "u8q4", topic: "unit8", lesson: "Lesson 3 · A wonderful boy", type: "choice", passageId: "russel",
    prompt: "How does the boy show that he cares for the pigeons?",
    options: ["He feeds them and does not eat them.", "He sends them away from home.", "He keeps them from his mother."],
    answer: 0,
    explanation: "The story shows his kindness through the way he cares for the pigeons.",
  },
  {
    id: "u8q5", topic: "unit8", lesson: "Grammar focus · Punctuation", type: "choice",
    prompt: "Which punctuation mark ends a sentence that shows surprise?",
    options: ["A comma (,)", "A question mark (?)", "An exclamation mark (!)"],
    answer: 2,
    explanation: "The unit's grammar focus uses an exclamation mark to show surprise.",
  },
];
