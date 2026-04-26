import avatar1 from '~/assets/images/avatar/avatar1.png'
import avatar2 from '~/assets/images/avatar/avatar2.png'
import avatar3 from '~/assets/images/avatar/avatar3.png'
import avatar4 from '~/assets/images/avatar/avatar4.png'

export type AvatarId = 'chibi-boy-classic' | 'chibi-boy-winter' | 'chibi-girl-mint' | 'chibi-girl-rose'

export interface CharacterAvatar {
  id: AvatarId
}

export interface AvatarOption {
  value: AvatarId
  description: string
  image: string
  alt: string
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    value: 'chibi-boy-classic',
    description: 'Look chibi alegre',
    image: avatar1,
    alt: 'Avatar manga chibi de cuerpo completo con estilo alegre',
  },
  {
    value: 'chibi-boy-winter',
    description: 'Look chibi de invierno',
    image: avatar2,
    alt: 'Avatar manga chibi de cuerpo completo con ropa de invierno',
  },
  {
    value: 'chibi-girl-mint',
    description: 'Look chibi brillante',
    image: avatar3,
    alt: 'Avatar manga chibi de cuerpo completo con estilo brillante',
  },
  {
    value: 'chibi-girl-rose',
    description: 'Look chibi dulce',
    image: avatar4,
    alt: 'Avatar manga chibi de cuerpo completo con estilo dulce',
  },
]

export function createDefaultAvatar(): CharacterAvatar {
  return { id: AVATAR_OPTIONS[0].value }
}

export function getAvatarOption(avatar?: Partial<CharacterAvatar> | null): AvatarOption {
  return AVATAR_OPTIONS.find((option) => option.value === avatar?.id) ?? AVATAR_OPTIONS[0]
}
