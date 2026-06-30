const avatarNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
] as const

type AvatarNumber = typeof avatarNumbers[number]

export type AvatarId = `avatar${AvatarNumber}`

export interface CharacterAvatar {
  id: AvatarId
}

export interface AvatarOption {
  value: AvatarId
  image: string
  alt: string
}

const avatarImages = import.meta.glob<string>('../assets/images/avatar/avatar*.png', {
  eager: true,
  import: 'default',
})

const legacyAvatarIds: Record<string, AvatarId> = {
  'chibi-boy-classic': 'avatar1',
  'chibi-boy-winter': 'avatar2',
  'chibi-girl-mint': 'avatar3',
  'chibi-girl-rose': 'avatar4',
}

export const AVATAR_OPTIONS: AvatarOption[] = avatarNumbers
  .map((number) => {
    const value = `avatar${number}` as AvatarId
    const image = avatarImages[`../assets/images/avatar/${value}.png`]

    return image
      ? {
          value,
          image,
          alt: `Avatar ${number}`,
        }
      : null
  })
  .filter((option): option is AvatarOption => option !== null)

const avatarOptionById = new Map(AVATAR_OPTIONS.map((option) => [option.value, option]))

export function createDefaultAvatar(): CharacterAvatar {
  return { id: AVATAR_OPTIONS[0]!.value }
}

export function getAvatarOption(avatar?: { id?: string } | null): AvatarOption {
  const avatarId = normalizeAvatarId(avatar?.id)
  return avatarOptionById.get(avatarId) ?? AVATAR_OPTIONS[0]!
}

function normalizeAvatarId(id?: string): AvatarId {
  if (id && avatarOptionById.has(id as AvatarId)) return id as AvatarId
  if (id && legacyAvatarIds[id]) return legacyAvatarIds[id]
  return AVATAR_OPTIONS[0]!.value
}
