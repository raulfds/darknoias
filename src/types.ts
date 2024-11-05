export interface Weapon {
  Icon: string;
  Arma: string;
  Categoria: string;
  "Desbloqueia em": string;
}

export interface CamoProgress {
  gold: boolean;
  diamond: boolean;
  darkSpice: boolean;
  darkMatter: boolean;
}

export type WeaponProgress = Record<string, CamoProgress>;