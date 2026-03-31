import { LESSONS, type Lesson, type Question } from '~/data/lessons'

export interface StreetHouse {
  id: string
  words: string[]
  vocabIndices: number[]
  questionIds: string[]
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
    if (question.type === 'multiple-choice') {
      uniqueOptions.add(question.options[question.correctIndex])
    } else {
      uniqueOptions.add(question.correctAnswer)
    }
  }

  return [...uniqueOptions].slice(0, 6)
}

function questionMatchesWords(question: Question, enWords: string[], esWords: string[]): boolean {
  const text = question.question.toLowerCase()
  const correctText = question.type === 'written'
    ? question.correctAnswer.toLowerCase()
    : question.options[question.correctIndex].toLowerCase()

  for (let i = 0; i < enWords.length; i++) {
    const en = enWords[i].toLowerCase()
    const es = esWords[i]?.toLowerCase() ?? ''
    if (text.includes(en) || text.includes(es) || correctText.includes(en) || correctText.includes(es)) {
      return true
    }
  }

  return false
}

function matchQuestionsToHouses(lesson: Lesson, houses: StreetHouse[]): void {
  if (!houses.length) return

  const assigned = new Set<string>()

  if (lesson.vocabulary?.length) {
    for (const question of lesson.questions) {
      for (const house of houses) {
        const enWords = house.words
        const esWords = house.vocabIndices.map((i) => lesson.vocabulary![i].es)
        if (questionMatchesWords(question, enWords, esWords)) {
          house.questionIds.push(question.id)
          assigned.add(question.id)
          break
        }
      }
    }

    let robin = 0
    for (const question of lesson.questions) {
      if (!assigned.has(question.id)) {
        houses[robin % houses.length].questionIds.push(question.id)
        robin++
      }
    }
  } else {
    let robin = 0
    for (const question of lesson.questions) {
      houses[robin % houses.length].questionIds.push(question.id)
      robin++
    }
  }
}

export function getLessonStreetHouses(lesson: Lesson): StreetHouse[] {
  const hasVocab = Boolean(lesson.vocabulary?.length)
  const lessonWords = lesson.vocabulary?.map((word) => word.en) ?? getFallbackWords(lesson)
  const groups = chunkWords(lessonWords, 2)
  const safeGroups = groups.length ? groups : [[lesson.title]]

  const houses: StreetHouse[] = safeGroups.map((words, index) => {
    const startVocabIndex = index * 2
    const vocabIndices = hasVocab
      ? words.map((_, offset) => startVocabIndex + offset).filter((i) => i < (lesson.vocabulary?.length ?? 0))
      : []

    return {
      id: `${lesson.id}-house-${index + 1}`,
      words,
      vocabIndices,
      questionIds: [],
      position: 16 + index * (64 / Math.max(safeGroups.length - 1, 1)),
      palette: HOUSE_PALETTES[index % HOUSE_PALETTES.length],
    }
  })

  matchQuestionsToHouses(lesson, houses)

  return houses
}

export function getHouseById(lessonId: string, houseId: string): StreetHouse | undefined {
  const lesson = LESSONS.find((l) => l.id === lessonId)
  if (!lesson) return undefined

  return getLessonStreetHouses(lesson).find((h) => h.id === houseId)
}

export function getStreetLessons(): Lesson[] {
  return [...LESSONS].sort((left, right) => left.order - right.order)
}