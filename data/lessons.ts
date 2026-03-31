export interface Question {
  id: string
  question: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  xpReward: number
}

export interface VocabWord {
  en: string
  es: string
  example?: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  icon: string
  color: string
  level: 'A1' | 'A2' | 'B1'
  order: number
  vocabulary?: VocabWord[]
  questions: Question[]
}

export const LESSONS: Lesson[] = [
  // ─── A1 ──────────────────────────────────────────────────────────────────
  {
    id: 'a1-greetings',
    title: 'Saludos',
    description: 'Di hola y presenta tu nombre',
    icon: '👋',
    color: 'sky',
    level: 'A1',
    order: 1,
    vocabulary: [
      { en: 'Hello', es: 'Hola', example: 'Hello, how are you?' },
      { en: 'Goodbye', es: 'Adiós', example: 'Goodbye, see you later!' },
      { en: 'Good morning', es: 'Buenos días', example: 'Good morning, teacher.' },
      { en: 'Good evening', es: 'Buenas tardes/noches', example: 'Good evening, sir.' },
      { en: 'My name is…', es: 'Me llamo…', example: 'My name is Ana.' },
      { en: 'How are you?', es: '¿Cómo estás?', example: 'Hi! How are you?' },
      { en: 'Nice to meet you', es: 'Encantado de conocerte', example: 'Nice to meet you, Carlos.' },
      { en: 'I am fine', es: 'Estoy bien', example: 'I am fine, thank you.' },
      { en: 'Please', es: 'Por favor', example: 'Please, sit down.' },
      { en: 'Thank you', es: 'Gracias', example: 'Thank you very much!' },
    ],
    questions: [
      {
        id: 'g1',
        question: '¿Cómo se dice "Hola" en inglés?',
        options: ['Goodbye', 'Hello', 'Please', 'Thank you'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'g2',
        question: '¿Qué significa "My name is Ana"?',
        options: ['Me llamo Ana', 'Soy de Ana', 'Conozco a Ana', 'Llamo a Ana'],
        correctIndex: 0,
        xpReward: 10,
      },
      {
        id: 'g3',
        question: '¿Cómo se dice "Buenos días"?',
        options: ['Good night', 'Good evening', 'Good morning', 'Good afternoon'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'g4',
        question: '¿Qué significa "How are you?"?',
        options: ['¿Cómo te llamas?', '¿Dónde estás?', '¿Cómo estás?', '¿Cuántos años tienes?'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'g5',
        question: '"Nice to meet you" significa…',
        options: ['Hasta luego', 'Encantado de conocerte', 'Por favor', 'De nada'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'g6',
        question: '¿Cómo se dice "Adiós"?',
        options: ['Hello', 'Sorry', 'Goodbye', 'Please'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'g7',
        question: '"I am fine" se traduce como…',
        options: ['Tengo frío', 'Estoy bien', 'Me voy', 'Soy nuevo'],
        correctIndex: 1,
        xpReward: 10,
      },
    ],
  },
  {
    id: 'a1-numbers',
    title: 'Números',
    description: 'Aprende a contar del 1 al 20',
    icon: '🔢',
    color: 'emerald',
    level: 'A1',
    order: 2,
    questions: [
      {
        id: 'n1',
        question: '¿Cuánto es "five"?',
        options: ['3', '4', '5', '6'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'n2',
        question: '¿Cómo se dice "doce" en inglés?',
        options: ['eleven', 'twelve', 'thirteen', 'twenty'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'n3',
        question: '"Fifteen" significa…',
        options: ['50', '15', '5', '51'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'n4',
        question: '¿Cómo se escribe el número 8 en inglés?',
        options: ['six', 'seven', 'eight', 'nine'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'n5',
        question: '"Twenty" es igual a…',
        options: ['10', '12', '20', '22'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'n6',
        question: '"Three" más "four" es…',
        options: ['five', 'six', 'seven', 'eight'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'n7',
        question: '¿Cuál es el número "seventeen"?',
        options: ['7', '70', '17', '71'],
        correctIndex: 2,
        xpReward: 10,
      },
    ],
  },
  {
    id: 'a1-colors',
    title: 'Colores',
    description: 'Nombra los colores del arcoíris',
    icon: '🎨',
    color: 'violet',
    level: 'A1',
    order: 3,
    vocabulary: [
      { en: 'Red', es: 'Rojo', example: 'The apple is red.' },
      { en: 'Blue', es: 'Azul', example: 'The sky is blue.' },
      { en: 'Yellow', es: 'Amarillo', example: 'The sun is yellow.' },
      { en: 'Green', es: 'Verde', example: 'The grass is green.' },
      { en: 'White', es: 'Blanco', example: 'The snow is white.' },
      { en: 'Black', es: 'Negro', example: 'The cat is black.' },
      { en: 'Purple', es: 'Morado', example: 'I like purple flowers.' },
      { en: 'Orange', es: 'Naranja', example: 'This orange is big.' },
      { en: 'Brown', es: 'Marrón', example: 'The dog is brown.' },
    ],
    questions: [
      {
        id: 'c1',
        question: '¿Cómo se dice "rojo" en inglés?',
        options: ['Blue', 'Green', 'Red', 'Yellow'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'c2',
        question: '"Yellow" significa…',
        options: ['Amarillo', 'Naranja', 'Verde', 'Morado'],
        correctIndex: 0,
        xpReward: 10,
      },
      {
        id: 'c3',
        question: '¿Cómo se dice "azul"?',
        options: ['Black', 'Blue', 'Brown', 'White'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'c4',
        question: '"Green" es…',
        options: ['Gris', 'Naranja', 'Verde', 'Rosa'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'c5',
        question: '¿Qué color es "white"?',
        options: ['Negro', 'Blanco', 'Gris', 'Beige'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'c6',
        question: '"Purple" se traduce como…',
        options: ['Rosa', 'Morado', 'Naranja', 'Marrón'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'c7',
        question: '¿Cómo se dice "negro"?',
        options: ['Grey', 'Navy', 'Black', 'Dark'],
        correctIndex: 2,
        xpReward: 10,
      },
    ],
  },
  {
    id: 'a1-family',
    title: 'Familia',
    description: 'Habla de tus seres queridos',
    icon: '👨‍👩‍👧',
    color: 'rose',
    level: 'A1',
    order: 4,
    questions: [
      {
        id: 'f1',
        question: '¿Cómo se dice "madre" en inglés?',
        options: ['Father', 'Sister', 'Mother', 'Aunt'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'f2',
        question: '"Brother" significa…',
        options: ['Hermana', 'Hermano', 'Primo', 'Tío'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'f3',
        question: '¿Cómo se dice "abuelo"?',
        options: ['Uncle', 'Cousin', 'Grandfather', 'Father'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'f4',
        question: '"Daughter" se traduce como…',
        options: ['Hijo', 'Hija', 'Sobrina', 'Nieta'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'f5',
        question: '¿Qué significa "My sister is young"?',
        options: ['Mi hermano es mayor', 'Mi hermana es joven', 'Mi prima es bonita', 'Mi hija es nueva'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'f6',
        question: '"Parents" hace referencia a…',
        options: ['Los hijos', 'Los abuelos', 'Los padres', 'Los tíos'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'f7',
        question: '¿Cómo se dice "esposa"?',
        options: ['Husband', 'Wife', 'Partner', 'Cousin'],
        correctIndex: 1,
        xpReward: 10,
      },
    ],
  },
  {
    id: 'a1-food',
    title: 'Comida',
    description: 'Ordena en un restaurante',
    icon: '🍎',
    color: 'amber',
    level: 'A1',
    order: 5,
    vocabulary: [
      { en: 'Apple', es: 'Manzana', example: 'I eat an apple every day.' },
      { en: 'Bread', es: 'Pan', example: 'Can I have some bread?' },
      { en: 'Milk', es: 'Leche', example: 'I drink milk in the morning.' },
      { en: 'Chicken', es: 'Pollo', example: 'We have chicken for dinner.' },
      { en: 'Vegetables', es: 'Verduras', example: 'Eat your vegetables!' },
      { en: 'Breakfast', es: 'Desayuno', example: 'Breakfast is at 8 o\'clock.' },
      { en: 'I am hungry', es: 'Tengo hambre', example: 'I am hungry, let\'s eat.' },
      { en: 'Water', es: 'Agua', example: 'Can I have some water?' },
      { en: 'Rice', es: 'Arroz', example: 'I like rice with chicken.' },
    ],
    questions: [
      {
        id: 'fo1',
        question: '¿Cómo se dice "manzana"?',
        options: ['Orange', 'Apple', 'Banana', 'Grape'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'fo2',
        question: '"Bread" significa…',
        options: ['Arroz', 'Pasta', 'Pan', 'Sopa'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'fo3',
        question: '¿Cómo se dice "leche"?',
        options: ['Water', 'Juice', 'Milk', 'Coffee'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'fo4',
        question: '"I am hungry" significa…',
        options: ['Tengo sed', 'Tengo hambre', 'Estoy cansado', 'Me gusta comer'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'fo5',
        question: '¿Qué es "chicken"?',
        options: ['Cerdo', 'Pescado', 'Ternera', 'Pollo'],
        correctIndex: 3,
        xpReward: 10,
      },
      {
        id: 'fo6',
        question: '"Vegetables" se refiere a…',
        options: ['Frutas', 'Verduras', 'Carnes', 'Bebidas'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'fo7',
        question: '¿Cómo se dice "desayuno"?',
        options: ['Lunch', 'Dinner', 'Breakfast', 'Snack'],
        correctIndex: 2,
        xpReward: 10,
      },
    ],
  },
  {
    id: 'a1-time',
    title: 'Tiempo y horas',
    description: 'Pregunta y di la hora',
    icon: '⏰',
    color: 'cyan',
    level: 'A1',
    order: 6,
    questions: [
      {
        id: 't1',
        question: '"What time is it?" significa…',
        options: ['¿Cuánto tiempo tienes?', '¿Qué hora es?', '¿Cuándo llegaste?', '¿A qué hora sales?'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 't2',
        question: '¿Cómo se dice "lunes"?',
        options: ['Tuesday', 'Sunday', 'Monday', 'Friday'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 't3',
        question: '"Yesterday" significa…',
        options: ['Mañana', 'Hoy', 'Ayer', 'Ahora'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 't4',
        question: '¿Cómo se dice "semana"?',
        options: ['Month', 'Year', 'Day', 'Week'],
        correctIndex: 3,
        xpReward: 10,
      },
      {
        id: 't5',
        question: '"It is half past three" significa…',
        options: ['Son las 3 menos cuarto', 'Son las 3 y media', 'Son las 3 en punto', 'Son las 3 y cuarto'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 't6',
        question: '¿Qué día es "Wednesday"?',
        options: ['Martes', 'Jueves', 'Miércoles', 'Viernes'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 't7',
        question: '"Tomorrow" se traduce como…',
        options: ['Ayer', 'Hoy', 'Esta tarde', 'Mañana'],
        correctIndex: 3,
        xpReward: 10,
      },
    ],
  },
  {
    id: 'a1-places',
    title: 'Lugares',
    description: 'Pide direcciones y ubícate',
    icon: '📍',
    color: 'teal',
    level: 'A1',
    order: 7,
    vocabulary: [
      { en: 'School', es: 'Escuela', example: 'Where is the school?' },
      { en: 'Hospital', es: 'Hospital', example: 'The hospital is far away.' },
      { en: 'Supermarket', es: 'Supermercado', example: 'I go to the supermarket.' },
      { en: 'Airport', es: 'Aeropuerto', example: 'The airport is very big.' },
      { en: 'Turn left', es: 'Gira a la izquierda', example: 'Turn left at the corner.' },
      { en: 'Turn right', es: 'Gira a la derecha', example: 'Turn right after the park.' },
      { en: 'Straight ahead', es: 'Todo recto', example: 'Go straight ahead.' },
      { en: 'Near', es: 'Cerca', example: 'It is near here.' },
      { en: 'Far', es: 'Lejos', example: 'The station is far from here.' },
    ],
    questions: [
      {
        id: 'p1',
        question: '"Where is the school?" significa…',
        options: ['¿Hay una escuela?', '¿Dónde está la escuela?', '¿Qué es una escuela?', '¿Cuándo abre la escuela?'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'p2',
        question: '¿Cómo se dice "hospital"?',
        options: ['Market', 'School', 'Hospital', 'Library'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'p3',
        question: '"Turn left" significa…',
        options: ['Sigue recto', 'Gira a la derecha', 'Gira a la izquierda', 'Para aquí'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'p4',
        question: '¿Qué es "supermarket"?',
        options: ['Farmacia', 'Supermercado', 'Librería', 'Banco'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'p5',
        question: '"It is near here" significa…',
        options: ['Está muy lejos', 'Está aquí dentro', 'Está cerca de aquí', 'No está aquí'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'p6',
        question: '¿Cómo se dice "aeropuerto"?',
        options: ['Station', 'Port', 'Airport', 'Bus stop'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'p7',
        question: '"Straight ahead" significa…',
        options: ['A la izquierda', 'A la derecha', 'Todo recto', 'Hacia atrás'],
        correctIndex: 2,
        xpReward: 10,
      },
    ],
  },
  {
    id: 'a1-verbs',
    title: 'Verbos básicos',
    description: 'Los verbos más usados en inglés',
    icon: '⚡',
    color: 'indigo',
    level: 'A1',
    order: 8,
    questions: [
      {
        id: 'v1',
        question: '"To eat" significa…',
        options: ['Beber', 'Comer', 'Dormir', 'Correr'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'v2',
        question: '¿Cómo se dice "hablar"?',
        options: ['To listen', 'To read', 'To speak', 'To write'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'v3',
        question: '"I go to school" significa…',
        options: ['Fui a la escuela', 'Voy a la escuela', 'Estoy en la escuela', 'Salgo de la escuela'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'v4',
        question: '"To sleep" se traduce como…',
        options: ['Caminar', 'Saltar', 'Dormir', 'Volar'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'v5',
        question: '¿Qué significa "She likes music"?',
        options: ['Ella no gusta de la música', 'A ella le gusta la música', 'Ella toca música', 'Ella estudia música'],
        correctIndex: 1,
        xpReward: 10,
      },
      {
        id: 'v6',
        question: '"To have" significa…',
        options: ['Ser', 'Estar', 'Tener', 'Hacer'],
        correctIndex: 2,
        xpReward: 10,
      },
      {
        id: 'v7',
        question: '"They work every day" significa…',
        options: ['Ellos trabajaron ayer', 'Ellos trabajan cada día', 'Ellos no trabajan hoy', 'Ellos van a trabajar'],
        correctIndex: 1,
        xpReward: 10,
      },
    ],
  },
]

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id)
}

export function getNextLesson(completedIds: string[]): Lesson | undefined {
  return LESSONS.find((l) => !completedIds.includes(l.id))
}
