const LESSONS = [
  // ─── A1 ──────────────────────────────────────────────────────────────────
  {
    id: "a1-greetings",
    title: "Saludos",
    description: "Di hola y presenta tu nombre",
    icon: "\u{1F44B}",
    color: "sky",
    level: "A1",
    order: 1,
    vocabulary: [
      { en: "Hello", es: "Hola", example: "Hello, how are you?" },
      { en: "Goodbye", es: "Adi\xF3s", example: "Goodbye, see you later!" },
      { en: "Good morning", es: "Buenos d\xEDas", example: "Good morning, teacher." },
      { en: "Good evening", es: "Buenas tardes/noches", example: "Good evening, sir." },
      { en: "My name is\u2026", es: "Me llamo\u2026", example: "My name is Ana." },
      { en: "How are you?", es: "\xBFC\xF3mo est\xE1s?", example: "Hi! How are you?" },
      { en: "Nice to meet you", es: "Encantado de conocerte", example: "Nice to meet you, Carlos." },
      { en: "I am fine", es: "Estoy bien", example: "I am fine, thank you." },
      { en: "Please", es: "Por favor", example: "Please, sit down." },
      { en: "Thank you", es: "Gracias", example: "Thank you very much!" }
    ],
    questions: [
      {
        id: "g1",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "Hola" en ingl\xE9s?',
        options: ["Goodbye", "Hello", "Please", "Thank you"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "g2",
        type: "multiple-choice",
        question: '\xBFQu\xE9 significa "My name is Ana"?',
        options: ["Me llamo Ana", "Soy de Ana", "Conozco a Ana", "Llamo a Ana"],
        correctIndex: 0,
        xpReward: 10
      },
      {
        id: "g3",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "Buenos d\xEDas"?',
        options: ["Good night", "Good evening", "Good morning", "Good afternoon"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "g4",
        type: "multiple-choice",
        question: '\xBFQu\xE9 significa "How are you?"?',
        options: ["\xBFC\xF3mo te llamas?", "\xBFD\xF3nde est\xE1s?", "\xBFC\xF3mo est\xE1s?", "\xBFCu\xE1ntos a\xF1os tienes?"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "g5",
        type: "multiple-choice",
        question: '"Nice to meet you" significa\u2026',
        options: ["Hasta luego", "Encantado de conocerte", "Por favor", "De nada"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "g6",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "Adi\xF3s"?',
        options: ["Hello", "Sorry", "Goodbye", "Please"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "g7",
        type: "multiple-choice",
        question: '"I am fine" se traduce como\u2026',
        options: ["Tengo fr\xEDo", "Estoy bien", "Me voy", "Soy nuevo"],
        correctIndex: 1,
        xpReward: 10
      }
    ]
  },
  {
    id: "a1-numbers",
    title: "N\xFAmeros",
    description: "Aprende a contar del 1 al 20",
    icon: "\u{1F522}",
    color: "emerald",
    level: "A1",
    order: 3,
    questions: [
      {
        id: "n1",
        type: "multiple-choice",
        question: '\xBFCu\xE1nto es "five"?',
        options: ["3", "4", "5", "6"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "n2",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "doce" en ingl\xE9s?',
        options: ["eleven", "twelve", "thirteen", "twenty"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "n3",
        type: "multiple-choice",
        question: '"Fifteen" significa\u2026',
        options: ["50", "15", "5", "51"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "n4",
        type: "multiple-choice",
        question: "\xBFC\xF3mo se escribe el n\xFAmero 8 en ingl\xE9s?",
        options: ["six", "seven", "eight", "nine"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "n5",
        type: "multiple-choice",
        question: '"Twenty" es igual a\u2026',
        options: ["10", "12", "20", "22"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "n6",
        type: "multiple-choice",
        question: '"Three" m\xE1s "four" es\u2026',
        options: ["five", "six", "seven", "eight"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "n7",
        type: "multiple-choice",
        question: '\xBFCu\xE1l es el n\xFAmero "seventeen"?',
        options: ["7", "70", "17", "71"],
        correctIndex: 2,
        xpReward: 10
      }
    ]
  },
  {
    id: "a1-colors",
    title: "Colores",
    description: "Nombra los colores del arco\xEDris",
    icon: "\u{1F3A8}",
    color: "violet",
    level: "A1",
    order: 5,
    vocabulary: [
      { en: "Red", es: "Rojo", example: "The apple is red." },
      { en: "Blue", es: "Azul", example: "The sky is blue." },
      { en: "Yellow", es: "Amarillo", example: "The sun is yellow." },
      { en: "Green", es: "Verde", example: "The grass is green." },
      { en: "White", es: "Blanco", example: "The snow is white." },
      { en: "Black", es: "Negro", example: "The cat is black." },
      { en: "Purple", es: "Morado", example: "I like purple flowers." },
      { en: "Orange", es: "Naranja", example: "This orange is big." },
      { en: "Brown", es: "Marr\xF3n", example: "The dog is brown." }
    ],
    questions: [
      {
        id: "c1",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "rojo" en ingl\xE9s?',
        options: ["Blue", "Green", "Red", "Yellow"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "c2",
        type: "multiple-choice",
        question: '"Yellow" significa\u2026',
        options: ["Amarillo", "Naranja", "Verde", "Morado"],
        correctIndex: 0,
        xpReward: 10
      },
      {
        id: "c3",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "azul"?',
        options: ["Black", "Blue", "Brown", "White"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "c4",
        type: "multiple-choice",
        question: '"Green" es\u2026',
        options: ["Gris", "Naranja", "Verde", "Rosa"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "c5",
        type: "multiple-choice",
        question: '\xBFQu\xE9 color es "white"?',
        options: ["Negro", "Blanco", "Gris", "Beige"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "c6",
        type: "multiple-choice",
        question: '"Purple" se traduce como\u2026',
        options: ["Rosa", "Morado", "Naranja", "Marr\xF3n"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "c7",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "negro"?',
        options: ["Grey", "Navy", "Black", "Dark"],
        correctIndex: 2,
        xpReward: 10
      }
    ]
  },
  {
    id: "a1-family",
    title: "Familia",
    description: "Habla de tus seres queridos",
    icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
    color: "rose",
    level: "A1",
    order: 7,
    questions: [
      {
        id: "f1",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "madre" en ingl\xE9s?',
        options: ["Father", "Sister", "Mother", "Aunt"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "f2",
        type: "multiple-choice",
        question: '"Brother" significa\u2026',
        options: ["Hermana", "Hermano", "Primo", "T\xEDo"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "f3",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "abuelo"?',
        options: ["Uncle", "Cousin", "Grandfather", "Father"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "f4",
        type: "multiple-choice",
        question: '"Daughter" se traduce como\u2026',
        options: ["Hijo", "Hija", "Sobrina", "Nieta"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "f5",
        type: "multiple-choice",
        question: '\xBFQu\xE9 significa "My sister is young"?',
        options: ["Mi hermano es mayor", "Mi hermana es joven", "Mi prima es bonita", "Mi hija es nueva"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "f6",
        type: "multiple-choice",
        question: '"Parents" hace referencia a\u2026',
        options: ["Los hijos", "Los abuelos", "Los padres", "Los t\xEDos"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "f7",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "esposa"?',
        options: ["Husband", "Wife", "Partner", "Cousin"],
        correctIndex: 1,
        xpReward: 10
      }
    ]
  },
  {
    id: "a1-food",
    title: "Comida",
    description: "Ordena en un restaurante",
    icon: "\u{1F34E}",
    color: "amber",
    level: "A1",
    order: 9,
    vocabulary: [
      { en: "Apple", es: "Manzana", example: "I eat an apple every day." },
      { en: "Bread", es: "Pan", example: "Can I have some bread?" },
      { en: "Milk", es: "Leche", example: "I drink milk in the morning." },
      { en: "Chicken", es: "Pollo", example: "We have chicken for dinner." },
      { en: "Vegetables", es: "Verduras", example: "Eat your vegetables!" },
      { en: "Breakfast", es: "Desayuno", example: "Breakfast is at 8 o'clock." },
      { en: "I am hungry", es: "Tengo hambre", example: "I am hungry, let's eat." },
      { en: "Water", es: "Agua", example: "Can I have some water?" },
      { en: "Rice", es: "Arroz", example: "I like rice with chicken." }
    ],
    questions: [
      {
        id: "fo1",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "manzana"?',
        options: ["Orange", "Apple", "Banana", "Grape"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "fo2",
        type: "multiple-choice",
        question: '"Bread" significa\u2026',
        options: ["Arroz", "Pasta", "Pan", "Sopa"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "fo3",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "leche"?',
        options: ["Water", "Juice", "Milk", "Coffee"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "fo4",
        type: "multiple-choice",
        question: '"I am hungry" significa\u2026',
        options: ["Tengo sed", "Tengo hambre", "Estoy cansado", "Me gusta comer"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "fo5",
        type: "multiple-choice",
        question: '\xBFQu\xE9 es "chicken"?',
        options: ["Cerdo", "Pescado", "Ternera", "Pollo"],
        correctIndex: 3,
        xpReward: 10
      },
      {
        id: "fo6",
        type: "multiple-choice",
        question: '"Vegetables" se refiere a\u2026',
        options: ["Frutas", "Verduras", "Carnes", "Bebidas"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "fo7",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "desayuno"?',
        options: ["Lunch", "Dinner", "Breakfast", "Snack"],
        correctIndex: 2,
        xpReward: 10
      }
    ]
  },
  {
    id: "a1-time",
    title: "Tiempo y horas",
    description: "Pregunta y di la hora",
    icon: "\u23F0",
    color: "cyan",
    level: "A1",
    order: 11,
    questions: [
      {
        id: "t1",
        type: "multiple-choice",
        question: '"What time is it?" significa\u2026',
        options: ["\xBFCu\xE1nto tiempo tienes?", "\xBFQu\xE9 hora es?", "\xBFCu\xE1ndo llegaste?", "\xBFA qu\xE9 hora sales?"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "t2",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "lunes"?',
        options: ["Tuesday", "Sunday", "Monday", "Friday"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "t3",
        type: "multiple-choice",
        question: '"Yesterday" significa\u2026',
        options: ["Ma\xF1ana", "Hoy", "Ayer", "Ahora"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "t4",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "semana"?',
        options: ["Month", "Year", "Day", "Week"],
        correctIndex: 3,
        xpReward: 10
      },
      {
        id: "t5",
        type: "multiple-choice",
        question: '"It is half past three" significa\u2026',
        options: ["Son las 3 menos cuarto", "Son las 3 y media", "Son las 3 en punto", "Son las 3 y cuarto"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "t6",
        type: "multiple-choice",
        question: '\xBFQu\xE9 d\xEDa es "Wednesday"?',
        options: ["Martes", "Jueves", "Mi\xE9rcoles", "Viernes"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "t7",
        type: "multiple-choice",
        question: '"Tomorrow" se traduce como\u2026',
        options: ["Ayer", "Hoy", "Esta tarde", "Ma\xF1ana"],
        correctIndex: 3,
        xpReward: 10
      }
    ]
  },
  {
    id: "a1-places",
    title: "Lugares",
    description: "Pide direcciones y ub\xEDcate",
    icon: "\u{1F4CD}",
    color: "teal",
    level: "A1",
    order: 13,
    vocabulary: [
      { en: "School", es: "Escuela", example: "Where is the school?" },
      { en: "Hospital", es: "Hospital", example: "The hospital is far away." },
      { en: "Supermarket", es: "Supermercado", example: "I go to the supermarket." },
      { en: "Airport", es: "Aeropuerto", example: "The airport is very big." },
      { en: "Turn left", es: "Gira a la izquierda", example: "Turn left at the corner." },
      { en: "Turn right", es: "Gira a la derecha", example: "Turn right after the park." },
      { en: "Straight ahead", es: "Todo recto", example: "Go straight ahead." },
      { en: "Near", es: "Cerca", example: "It is near here." },
      { en: "Far", es: "Lejos", example: "The station is far from here." }
    ],
    questions: [
      {
        id: "p1",
        type: "multiple-choice",
        question: '"Where is the school?" significa\u2026',
        options: ["\xBFHay una escuela?", "\xBFD\xF3nde est\xE1 la escuela?", "\xBFQu\xE9 es una escuela?", "\xBFCu\xE1ndo abre la escuela?"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "p2",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "hospital"?',
        options: ["Market", "School", "Hospital", "Library"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "p3",
        type: "multiple-choice",
        question: '"Turn left" significa\u2026',
        options: ["Sigue recto", "Gira a la derecha", "Gira a la izquierda", "Para aqu\xED"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "p4",
        type: "multiple-choice",
        question: '\xBFQu\xE9 es "supermarket"?',
        options: ["Farmacia", "Supermercado", "Librer\xEDa", "Banco"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "p5",
        type: "multiple-choice",
        question: '"It is near here" significa\u2026',
        options: ["Est\xE1 muy lejos", "Est\xE1 aqu\xED dentro", "Est\xE1 cerca de aqu\xED", "No est\xE1 aqu\xED"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "p6",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "aeropuerto"?',
        options: ["Station", "Port", "Airport", "Bus stop"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "p7",
        type: "multiple-choice",
        question: '"Straight ahead" significa\u2026',
        options: ["A la izquierda", "A la derecha", "Todo recto", "Hacia atr\xE1s"],
        correctIndex: 2,
        xpReward: 10
      }
    ]
  },
  {
    id: "a1-verbs",
    title: "Verbos b\xE1sicos",
    description: "Los verbos m\xE1s usados en ingl\xE9s",
    icon: "\u26A1",
    color: "indigo",
    level: "A1",
    order: 15,
    questions: [
      {
        id: "v1",
        type: "multiple-choice",
        question: '"To eat" significa\u2026',
        options: ["Beber", "Comer", "Dormir", "Correr"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "v2",
        type: "multiple-choice",
        question: '\xBFC\xF3mo se dice "hablar"?',
        options: ["To listen", "To read", "To speak", "To write"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "v3",
        type: "multiple-choice",
        question: '"I go to school" significa\u2026',
        options: ["Fui a la escuela", "Voy a la escuela", "Estoy en la escuela", "Salgo de la escuela"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "v4",
        type: "multiple-choice",
        question: '"To sleep" se traduce como\u2026',
        options: ["Caminar", "Saltar", "Dormir", "Volar"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "v5",
        type: "multiple-choice",
        question: '\xBFQu\xE9 significa "She likes music"?',
        options: ["Ella no gusta de la m\xFAsica", "A ella le gusta la m\xFAsica", "Ella toca m\xFAsica", "Ella estudia m\xFAsica"],
        correctIndex: 1,
        xpReward: 10
      },
      {
        id: "v6",
        type: "multiple-choice",
        question: '"To have" significa\u2026',
        options: ["Ser", "Estar", "Tener", "Hacer"],
        correctIndex: 2,
        xpReward: 10
      },
      {
        id: "v7",
        type: "multiple-choice",
        question: '"They work every day" significa\u2026',
        options: ["Ellos trabajaron ayer", "Ellos trabajan cada d\xEDa", "Ellos no trabajan hoy", "Ellos van a trabajar"],
        correctIndex: 1,
        xpReward: 10
      }
    ]
  },
  // ─── A1 Escritura ────────────────────────────────────────────────────────
  {
    id: "a1-write-greetings",
    title: "Escribe saludos",
    description: "Practica escribiendo saludos en ingl\xE9s",
    icon: "\u270D\uFE0F",
    color: "sky",
    level: "A1",
    order: 2,
    questions: [
      {
        id: "wg1",
        type: "written",
        question: 'Escribe "Hola" en ingl\xE9s',
        correctAnswer: "Hello",
        acceptedAnswers: ["hello", "Hello"],
        xpReward: 15
      },
      {
        id: "wg2",
        type: "written",
        question: 'Escribe "Adi\xF3s" en ingl\xE9s',
        correctAnswer: "Goodbye",
        acceptedAnswers: ["goodbye", "Goodbye", "bye", "Bye"],
        xpReward: 15
      },
      {
        id: "wg3",
        type: "written",
        question: 'Escribe "Buenos d\xEDas" en ingl\xE9s',
        correctAnswer: "Good morning",
        acceptedAnswers: ["good morning", "Good morning", "Good Morning"],
        xpReward: 15
      },
      {
        id: "wg4",
        type: "written",
        question: '\xBFC\xF3mo escribes "Gracias" en ingl\xE9s?',
        correctAnswer: "Thank you",
        acceptedAnswers: ["thank you", "Thank you", "Thanks", "thanks"],
        xpReward: 15
      },
      {
        id: "wg5",
        type: "written",
        question: 'Escribe "Por favor" en ingl\xE9s',
        correctAnswer: "Please",
        acceptedAnswers: ["please", "Please"],
        xpReward: 15
      }
    ]
  },
  {
    id: "a1-write-numbers",
    title: "Escribe n\xFAmeros",
    description: "Escribe los n\xFAmeros en ingl\xE9s",
    icon: "\u270F\uFE0F",
    color: "emerald",
    level: "A1",
    order: 4,
    questions: [
      {
        id: "wn1",
        type: "written",
        question: "Escribe el n\xFAmero 7 en ingl\xE9s",
        correctAnswer: "seven",
        acceptedAnswers: ["seven", "Seven"],
        xpReward: 15
      },
      {
        id: "wn2",
        type: "written",
        question: "Escribe el n\xFAmero 12 en ingl\xE9s",
        correctAnswer: "twelve",
        acceptedAnswers: ["twelve", "Twelve"],
        xpReward: 15
      },
      {
        id: "wn3",
        type: "written",
        question: "Escribe el n\xFAmero 15 en ingl\xE9s",
        correctAnswer: "fifteen",
        acceptedAnswers: ["fifteen", "Fifteen"],
        xpReward: 15
      },
      {
        id: "wn4",
        type: "written",
        question: "Escribe el n\xFAmero 20 en ingl\xE9s",
        correctAnswer: "twenty",
        acceptedAnswers: ["twenty", "Twenty"],
        xpReward: 15
      },
      {
        id: "wn5",
        type: "written",
        question: 'Escribe el resultado de "three + four" en ingl\xE9s',
        correctAnswer: "seven",
        acceptedAnswers: ["seven", "Seven"],
        xpReward: 15
      }
    ]
  },
  {
    id: "a1-write-colors",
    title: "Escribe colores",
    description: "Practica escribiendo los colores",
    icon: "\u{1F58A}\uFE0F",
    color: "violet",
    level: "A1",
    order: 6,
    questions: [
      {
        id: "wc1",
        type: "written",
        question: 'Escribe "rojo" en ingl\xE9s',
        correctAnswer: "red",
        acceptedAnswers: ["red", "Red"],
        xpReward: 15
      },
      {
        id: "wc2",
        type: "written",
        question: 'Escribe "azul" en ingl\xE9s',
        correctAnswer: "blue",
        acceptedAnswers: ["blue", "Blue"],
        xpReward: 15
      },
      {
        id: "wc3",
        type: "written",
        question: 'Escribe "amarillo" en ingl\xE9s',
        correctAnswer: "yellow",
        acceptedAnswers: ["yellow", "Yellow"],
        xpReward: 15
      },
      {
        id: "wc4",
        type: "written",
        question: 'Escribe "verde" en ingl\xE9s',
        correctAnswer: "green",
        acceptedAnswers: ["green", "Green"],
        xpReward: 15
      },
      {
        id: "wc5",
        type: "written",
        question: 'Escribe "negro" en ingl\xE9s',
        correctAnswer: "black",
        acceptedAnswers: ["black", "Black"],
        xpReward: 15
      }
    ]
  },
  {
    id: "a1-write-family",
    title: "Escribe familia",
    description: "Escribe palabras de la familia en ingl\xE9s",
    icon: "\u{1F4DD}",
    color: "rose",
    level: "A1",
    order: 8,
    questions: [
      {
        id: "wf1",
        type: "written",
        question: 'Escribe "madre" en ingl\xE9s',
        correctAnswer: "mother",
        acceptedAnswers: ["mother", "Mother", "mom", "Mom", "mum", "Mum"],
        xpReward: 15
      },
      {
        id: "wf2",
        type: "written",
        question: 'Escribe "padre" en ingl\xE9s',
        correctAnswer: "father",
        acceptedAnswers: ["father", "Father", "dad", "Dad"],
        xpReward: 15
      },
      {
        id: "wf3",
        type: "written",
        question: 'Escribe "hermano" en ingl\xE9s',
        correctAnswer: "brother",
        acceptedAnswers: ["brother", "Brother"],
        xpReward: 15
      },
      {
        id: "wf4",
        type: "written",
        question: 'Escribe "hermana" en ingl\xE9s',
        correctAnswer: "sister",
        acceptedAnswers: ["sister", "Sister"],
        xpReward: 15
      },
      {
        id: "wf5",
        type: "written",
        question: 'Escribe "abuelo" en ingl\xE9s',
        correctAnswer: "grandfather",
        acceptedAnswers: ["grandfather", "Grandfather", "grandpa", "Grandpa"],
        xpReward: 15
      }
    ]
  },
  {
    id: "a1-write-food",
    title: "Escribe comida",
    description: "Escribe palabras de comida en ingl\xE9s",
    icon: "\u{1F58B}\uFE0F",
    color: "amber",
    level: "A1",
    order: 10,
    questions: [
      {
        id: "wfo1",
        type: "written",
        question: 'Escribe "manzana" en ingl\xE9s',
        correctAnswer: "apple",
        acceptedAnswers: ["apple", "Apple"],
        xpReward: 15
      },
      {
        id: "wfo2",
        type: "written",
        question: 'Escribe "pan" en ingl\xE9s',
        correctAnswer: "bread",
        acceptedAnswers: ["bread", "Bread"],
        xpReward: 15
      },
      {
        id: "wfo3",
        type: "written",
        question: 'Escribe "leche" en ingl\xE9s',
        correctAnswer: "milk",
        acceptedAnswers: ["milk", "Milk"],
        xpReward: 15
      },
      {
        id: "wfo4",
        type: "written",
        question: 'Escribe "agua" en ingl\xE9s',
        correctAnswer: "water",
        acceptedAnswers: ["water", "Water"],
        xpReward: 15
      },
      {
        id: "wfo5",
        type: "written",
        question: 'Escribe "pollo" en ingl\xE9s',
        correctAnswer: "chicken",
        acceptedAnswers: ["chicken", "Chicken"],
        xpReward: 15
      }
    ]
  },
  {
    id: "a1-write-time",
    title: "Escribe tiempo",
    description: "Escribe palabras de tiempo en ingl\xE9s",
    icon: "\u2328\uFE0F",
    color: "cyan",
    level: "A1",
    order: 12,
    questions: [
      {
        id: "wt1",
        type: "written",
        question: 'Escribe "lunes" en ingl\xE9s',
        correctAnswer: "Monday",
        acceptedAnswers: ["monday", "Monday"],
        xpReward: 15
      },
      {
        id: "wt2",
        type: "written",
        question: 'Escribe "ayer" en ingl\xE9s',
        correctAnswer: "yesterday",
        acceptedAnswers: ["yesterday", "Yesterday"],
        xpReward: 15
      },
      {
        id: "wt3",
        type: "written",
        question: 'Escribe "ma\xF1ana" (futuro) en ingl\xE9s',
        correctAnswer: "tomorrow",
        acceptedAnswers: ["tomorrow", "Tomorrow"],
        xpReward: 15
      },
      {
        id: "wt4",
        type: "written",
        question: 'Escribe "semana" en ingl\xE9s',
        correctAnswer: "week",
        acceptedAnswers: ["week", "Week"],
        xpReward: 15
      },
      {
        id: "wt5",
        type: "written",
        question: 'Escribe "mi\xE9rcoles" en ingl\xE9s',
        correctAnswer: "Wednesday",
        acceptedAnswers: ["wednesday", "Wednesday"],
        xpReward: 15
      }
    ]
  },
  {
    id: "a1-write-places",
    title: "Escribe lugares",
    description: "Escribe nombres de lugares en ingl\xE9s",
    icon: "\u{1F5D2}\uFE0F",
    color: "teal",
    level: "A1",
    order: 14,
    questions: [
      {
        id: "wp1",
        type: "written",
        question: 'Escribe "escuela" en ingl\xE9s',
        correctAnswer: "school",
        acceptedAnswers: ["school", "School"],
        xpReward: 15
      },
      {
        id: "wp2",
        type: "written",
        question: 'Escribe "hospital" en ingl\xE9s',
        correctAnswer: "hospital",
        acceptedAnswers: ["hospital", "Hospital"],
        xpReward: 15
      },
      {
        id: "wp3",
        type: "written",
        question: 'Escribe "supermercado" en ingl\xE9s',
        correctAnswer: "supermarket",
        acceptedAnswers: ["supermarket", "Supermarket"],
        xpReward: 15
      },
      {
        id: "wp4",
        type: "written",
        question: 'Escribe "aeropuerto" en ingl\xE9s',
        correctAnswer: "airport",
        acceptedAnswers: ["airport", "Airport"],
        xpReward: 15
      },
      {
        id: "wp5",
        type: "written",
        question: 'Escribe "cerca" en ingl\xE9s',
        correctAnswer: "near",
        acceptedAnswers: ["near", "Near", "close", "Close"],
        xpReward: 15
      }
    ]
  }
];
function getLessonById(id) {
  return LESSONS.find((l) => l.id === id);
}
function getNextLesson(completedIds) {
  return LESSONS.find((l) => !completedIds.includes(l.id));
}

export { LESSONS as L, getLessonById as a, getNextLesson as g };
//# sourceMappingURL=lessons-AvHbDgNI.mjs.map
