export interface KawaiiMonster {
  id: string
  name: string
  title: string
  image: string
  alt: string
  catchphrase: string
}

const monsterImages = import.meta.glob<string>('../assets/images/monster/monster*.png', {
  eager: true,
  import: 'default',
})

const sortedMonsterImages = Object.entries(monsterImages)
  .sort(([left], [right]) => left.localeCompare(right, undefined, { numeric: true }))
  .map(([, image]) => image)

const transparentMonster = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

function getMonsterImage(index: number): string {
  if (!sortedMonsterImages.length) return transparentMonster
  return sortedMonsterImages[index % sortedMonsterImages.length]!
}

export const KAWAII_MONSTERS: KawaiiMonster[] = [
  {
    id: 'mimo',
    name: 'Mimo',
    title: 'el monstruo de los saludos',
    image: getMonsterImage(0),
    alt: 'Mimo, monstruo manga chibi transparente',
    catchphrase: 'Primero escuchamos, luego respondemos con calma.',
  },
  {
    id: 'pofu',
    name: 'Pofu',
    title: 'la monstruilla contadora',
    image: getMonsterImage(1),
    alt: 'Pofu, monstruilla manga chibi transparente',
    catchphrase: 'Contar en voz alta ayuda a recordarlo mejor.',
  },
  {
    id: 'lili',
    name: 'Lili',
    title: 'la guardiana de los colores',
    image: getMonsterImage(2),
    alt: 'Lili, guardiana manga chibi transparente',
    catchphrase: 'Asocia cada palabra con una imagen brillante.',
  },
  {
    id: 'bubu',
    name: 'Bubu',
    title: 'el vecino de las familias',
    image: getMonsterImage(3),
    alt: 'Bubu, monstruo manga chibi transparente',
    catchphrase: 'Piensa en tu propia familia para memorizar.',
  },
  {
    id: 'noki',
    name: 'Noki',
    title: 'el chef monstruoso',
    image: getMonsterImage(4),
    alt: 'Noki, chef manga chibi transparente',
    catchphrase: 'Si imaginas la escena, la palabra entra mejor.',
  },
  {
    id: 'tuki',
    name: 'Tuki',
    title: 'la exploradora del tiempo',
    image: getMonsterImage(5),
    alt: 'Tuki, exploradora manga chibi transparente',
    catchphrase: 'Repite la palabra tres veces y ya es tuya.',
  },
  {
    id: 'zuri',
    name: 'Zuri',
    title: 'la guardiana de los verbos',
    image: getMonsterImage(6),
    alt: 'Zuri, guardiana manga chibi transparente',
    catchphrase: 'Cada verbo es una acci\u00f3n: \u00a1imag\u00ednala!',
  },
  {
    id: 'kipo',
    name: 'Kipo',
    title: 'el monstruo viajero',
    image: getMonsterImage(7),
    alt: 'Kipo, monstruo manga chibi transparente',
    catchphrase: 'Viaja con la mente y aprende con el coraz\u00f3n.',
  },
  {
    id: 'miru',
    name: 'Miru',
    title: 'la inventora de palabras',
    image: getMonsterImage(8),
    alt: 'Miru, inventora manga chibi transparente',
    catchphrase: 'Inventa una frase con cada palabra nueva.',
  },
  {
    id: 'roko',
    name: 'Roko',
    title: 'el monstruo musical',
    image: getMonsterImage(9),
    alt: 'Roko, monstruo manga chibi transparente',
    catchphrase: 'Canta la palabra y nunca la olvidar\u00e1s.',
  },
  {
    id: 'nala',
    name: 'Nala',
    title: 'la monstruilla so\u00f1adora',
    image: getMonsterImage(10),
    alt: 'Nala, monstruilla manga chibi transparente',
    catchphrase: 'Cierra los ojos y visualiza la palabra.',
  },
  {
    id: 'bobi',
    name: 'Bobi',
    title: 'el monstruo de las risas',
    image: getMonsterImage(11),
    alt: 'Bobi, monstruo manga chibi transparente',
    catchphrase: 'Re\u00edrse ayuda a recordar. \u00a1Ja, ja, ja!',
  },
  {
    id: 'yumi',
    name: 'Yumi',
    title: 'la monstruilla de las estrellas',
    image: getMonsterImage(12),
    alt: 'Yumi, monstruilla manga chibi transparente',
    catchphrase: 'Cada palabra aprendida es una estrella m\u00e1s.',
  },
  {
    id: 'dino',
    name: 'Dino',
    title: 'el monstruo prehist\u00f3rico',
    image: getMonsterImage(13),
    alt: 'Dino, monstruo manga chibi transparente',
    catchphrase: 'Paso a paso, como los dinosaurios.',
  },
]

export function getMonsterForLesson(lessonId: string): KawaiiMonster {
  const numericSeed = lessonId
    .split('')
    .reduce((total, char) => total + char.charCodeAt(0), 0)

  return KAWAII_MONSTERS[numericSeed % KAWAII_MONSTERS.length]!
}
