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
    roofHex: string
    wallHex: string
    doorHex: string
  }
}

const HOUSE_PALETTES = [
  { roof: 'bg-rose-400', wall: 'bg-rose-100', door: 'bg-rose-600', roofHex: '#fb7185', wallHex: '#ffe4e6', doorHex: '#e11d48' },
  { roof: 'bg-sky-400', wall: 'bg-sky-100', door: 'bg-sky-600', roofHex: '#38bdf8', wallHex: '#e0f2fe', doorHex: '#0284c7' },
  { roof: 'bg-emerald-400', wall: 'bg-emerald-100', door: 'bg-emerald-600', roofHex: '#34d399', wallHex: '#d1fae5', doorHex: '#059669' },
  { roof: 'bg-amber-400', wall: 'bg-amber-100', door: 'bg-amber-600', roofHex: '#fbbf24', wallHex: '#fef3c7', doorHex: '#d97706' },
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
    } else if (question.type === 'matching') {
      for (const pair of question.pairs) uniqueOptions.add(pair.en)
    } else {
      uniqueOptions.add(question.correctAnswer)
    }
  }

  return [...uniqueOptions].slice(0, 6)
}

function questionMatchesWords(question: Question, enWords: string[], esWords: string[]): boolean {
  const text = question.question.toLowerCase()
  let correctText: string
  if (question.type === 'multiple-choice') {
    correctText = question.options[question.correctIndex].toLowerCase()
  } else if (question.type === 'matching') {
    correctText = question.pairs.map((pair) => pair.en).join(' ').toLowerCase()
  } else {
    correctText = question.correctAnswer.toLowerCase()
  }

  for (let i = 0; i < enWords.length; i++) {
    const en = enWords[i]?.toLowerCase() ?? ''
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
        const esWords = house.vocabIndices.map((i) => lesson.vocabulary![i]?.es ?? '')
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
        houses[robin % houses.length]!.questionIds.push(question.id)
        robin++
      }
    }
  } else {
    let robin = 0
    for (const question of lesson.questions) {
      houses[robin % houses.length]!.questionIds.push(question.id)
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
      position: 30 + index * (40 / Math.max(safeGroups.length - 1, 1)),
      palette: HOUSE_PALETTES[index % HOUSE_PALETTES.length]!,
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