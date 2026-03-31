export interface KawaiiMonster {
  id: string
  name: string
  title: string
  bodyColor: string
  accentColor: string
  cheekColor: string
  hornColor: string
  eyeStyle: 'round' | 'sleepy' | 'sparkle'
  earStyle: 'horns' | 'wings' | 'leaf'
  pattern: 'spots' | 'belly' | 'stripes' | 'heart'
  catchphrase: string
}

export const KAWAII_MONSTERS: KawaiiMonster[] = [
  {
    id: 'mimo',
    name: 'Mimo',
    title: 'el monstruo de los saludos',
    bodyColor: 'bg-sky-300',
    accentColor: 'bg-sky-100',
    cheekColor: 'bg-rose-200',
    hornColor: 'bg-sky-500',
    eyeStyle: 'round',
    earStyle: 'horns',
    pattern: 'belly',
    catchphrase: 'Primero escuchamos, luego respondemos con calma.',
  },
  {
    id: 'pofu',
    name: 'Pofu',
    title: 'la monstruilla contadora',
    bodyColor: 'bg-emerald-300',
    accentColor: 'bg-emerald-100',
    cheekColor: 'bg-orange-200',
    hornColor: 'bg-emerald-500',
    eyeStyle: 'sleepy',
    earStyle: 'leaf',
    pattern: 'spots',
    catchphrase: 'Contar en voz alta ayuda a recordarlo mejor.',
  },
  {
    id: 'lili',
    name: 'Lili',
    title: 'la guardiana de los colores',
    bodyColor: 'bg-fuchsia-300',
    accentColor: 'bg-fuchsia-100',
    cheekColor: 'bg-pink-200',
    hornColor: 'bg-fuchsia-500',
    eyeStyle: 'sparkle',
    earStyle: 'wings',
    pattern: 'heart',
    catchphrase: 'Asocia cada palabra con una imagen brillante.',
  },
  {
    id: 'bubu',
    name: 'Bubu',
    title: 'el vecino de las familias',
    bodyColor: 'bg-amber-300',
    accentColor: 'bg-amber-100',
    cheekColor: 'bg-rose-200',
    hornColor: 'bg-amber-500',
    eyeStyle: 'round',
    earStyle: 'leaf',
    pattern: 'stripes',
    catchphrase: 'Piensa en tu propia familia para memorizar.',
  },
  {
    id: 'noki',
    name: 'Noki',
    title: 'el chef monstruoso',
    bodyColor: 'bg-rose-300',
    accentColor: 'bg-rose-100',
    cheekColor: 'bg-orange-200',
    hornColor: 'bg-rose-500',
    eyeStyle: 'sleepy',
    earStyle: 'horns',
    pattern: 'spots',
    catchphrase: 'Si imaginas la escena, la palabra entra mejor.',
  },
]

export function getMonsterForLesson(lessonId: string): KawaiiMonster {
  const numericSeed = lessonId
    .split('')
    .reduce((total, char) => total + char.charCodeAt(0), 0)

  return KAWAII_MONSTERS[numericSeed % KAWAII_MONSTERS.length]
}