export type FaceShape = 'soft-round' | 'round' | 'oval' | 'square' | 'heart'
export type EyeColor = 'midnight' | 'hazel' | 'emerald' | 'sky' | 'violet'
export type EyeStyle = 'sparkle' | 'happy' | 'wink' | 'sleepy' | 'starry'
export type HairStyle = 'twin-tails' | 'bob' | 'bangs' | 'long' | 'bald'
export type HairColor = 'amber' | 'orange' | 'stone' | 'rose' | 'teal'
export type OutfitStyle = 'tee-pants' | 'long-dress' | 'tee-skirt' | 'tee-jeans' | 'hoodie-shorts'
export type ShoesStyle = 'sneakers' | 'boots' | 'sandals' | 'mary-janes' | 'rollers'
export type CheekStyle = 'none' | 'round' | 'oval' | 'star'
export type CheekColor = 'rose' | 'peach' | 'pink' | 'coral' | 'berry'

export interface CharacterAvatar {
  faceShape: FaceShape
  eyeColor: EyeColor
  eyeStyle: EyeStyle
  hair: HairStyle
  hairColor: HairColor
  outfit: OutfitStyle
  shoes: ShoesStyle
  cheeks: CheekStyle
  cheekColor: CheekColor
}

interface AvatarOption<T extends string> {
  value: T
  label: string
}

export const FACE_SHAPE_OPTIONS: AvatarOption<FaceShape>[] = [
  { value: 'soft-round', label: 'Redondita suave' },
  { value: 'round', label: 'Redonda' },
  { value: 'oval', label: 'Ovalada' },
  { value: 'square', label: 'Cuadradita' },
  { value: 'heart', label: 'Corazón' },
]

export const EYE_COLOR_OPTIONS: AvatarOption<EyeColor>[] = [
  { value: 'midnight', label: 'Negro noche' },
  { value: 'hazel', label: 'Miel' },
  { value: 'emerald', label: 'Verde menta' },
  { value: 'sky', label: 'Azul cielo' },
  { value: 'violet', label: 'Lila' },
]

export const EYE_STYLE_OPTIONS: AvatarOption<EyeStyle>[] = [
  { value: 'sparkle', label: 'Brillantes' },
  { value: 'happy', label: 'Sonrientes' },
  { value: 'wink', label: 'Guiño' },
  { value: 'sleepy', label: 'Dormilones' },
  { value: 'starry', label: 'Estrella' },
]

export const HAIR_OPTIONS: AvatarOption<HairStyle>[] = [
  { value: 'twin-tails', label: 'Coletas' },
  { value: 'bob', label: 'Melena corta' },
  { value: 'bangs', label: 'Flequillo' },
  { value: 'long', label: 'Pelo largo' },
  { value: 'bald', label: 'Sin pelo' },
]

export const HAIR_COLOR_OPTIONS: AvatarOption<HairColor>[] = [
  { value: 'amber', label: 'Castaño' },
  { value: 'orange', label: 'Naranja' },
  { value: 'stone', label: 'Negro' },
  { value: 'rose', label: 'Rosado' },
  { value: 'teal', label: 'Turquesa' },
]

export const OUTFIT_OPTIONS: AvatarOption<OutfitStyle>[] = [
  { value: 'tee-pants', label: 'Camiseta y pantalón' },
  { value: 'long-dress', label: 'Vestido largo' },
  { value: 'tee-skirt', label: 'Camiseta y falda' },
  { value: 'tee-jeans', label: 'Camiseta y tejanos' },
  { value: 'hoodie-shorts', label: 'Sudadera y shorts' },
]

export const SHOES_OPTIONS: AvatarOption<ShoesStyle>[] = [
  { value: 'sneakers', label: 'Bambas' },
  { value: 'boots', label: 'Botas' },
  { value: 'sandals', label: 'Sandalias' },
  { value: 'mary-janes', label: 'Merceditas' },
  { value: 'rollers', label: 'Patines' },
]

export const CHEEK_STYLE_OPTIONS: AvatarOption<CheekStyle>[] = [
  { value: 'none', label: 'Sin mofletes' },
  { value: 'round', label: 'Redondos' },
  { value: 'oval', label: 'Ovalados' },
  { value: 'star', label: 'Estrellitas' },
]

export const CHEEK_COLOR_OPTIONS: AvatarOption<CheekColor>[] = [
  { value: 'rose', label: 'Rosa' },
  { value: 'peach', label: 'Melocotón' },
  { value: 'pink', label: 'Fucsia' },
  { value: 'coral', label: 'Coral' },
  { value: 'berry', label: 'Frambuesa' },
]

export function createDefaultAvatar(): CharacterAvatar {
  return {
    faceShape: 'soft-round',
    eyeColor: 'sky',
    eyeStyle: 'sparkle',
    hair: 'twin-tails',
    hairColor: 'amber',
    outfit: 'tee-pants',
    shoes: 'sneakers',
    cheeks: 'round',
    cheekColor: 'rose',
  }
}