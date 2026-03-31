import { LESSONS, type Lesson } from '~/data/lessons'

export interface StreetHouse {
  id: string
  words: string[]
  position: number
  palette: {
    roof: string
    wall: string
    door: string
  }
}

const HOUSE_PALETTES = [
  { roof: 'bg-rose-400', wall: 'bg-rose-100', door: 'bg-rose-600' },
  { roof: 'bg-sky-400', wall: 'bg-sky-100', door: 'bg-sky-600' },
  { roof: 'bg-emerald-400', wall: 'bg-emerald-100', door: 'bg-emerald-600' },
  { roof: 'bg-amber-400', wall: 'bg-amber-100', door: 'bg-amber-600' },
]

function chunkWords(words: string[], size: number): string[][] {
  const groups: string[][] = []

  for (let index = 0; index < words.length; index += size) {
    groups.push(words.slice(index, index + size))
  }

  return groups
}

function getFallbackWords(lesson: Lesson): string[] {
  const uniqueOptions = new Set<string>()

  for (const question of lesson.questions) {
    uniqueOptions.add(question.options[question.correctIndex])
  }

  return [...uniqueOptions].slice(0, 6)
}

export function getLessonStreetHouses(lesson: Lesson): StreetHouse[] {
  const lessonWords = lesson.vocabulary?.map((word) => word.en) ?? getFallbackWords(lesson)
  const groups = chunkWords(lessonWords, 2)
  const safeGroups = groups.length ? groups : [[lesson.title]]

  return safeGroups.map((words, index) => ({
    id: `${lesson.id}-house-${index + 1}`,
    words,
    position: 16 + index * (64 / Math.max(safeGroups.length - 1, 1)),
    palette: HOUSE_PALETTES[index % HOUSE_PALETTES.length],
  }))
}

export function getStreetLessons(): Lesson[] {
  return [...LESSONS].sort((left, right) => left.order - right.order)
}