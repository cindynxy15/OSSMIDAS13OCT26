export type PersonaKey = 'mentor' | 'navigator' | 'detective' | 'builder';

export type OptionLetter = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  letter: OptionLetter;
  text: string;
  personaKey: PersonaKey;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  subtext?: string;
  options: QuizOption[];
  botRemark?: string;
  goldenPonder?: string;
}

export interface PersonaDetails {
  key: PersonaKey;
  letter: OptionLetter;
  title: string;
  statement: string;
  midasConnection: string;
  superpower: string;
  howYouCollaborate: string;
  imageSrc: string;
  medallionImageSrc: string;
  quote: string;
  goldenTitle: string;
  goldenTouchLore: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    badgeBg: string;
  };
  collaborations: {
    partner: string;
    role: string;
  }[];
}

export interface BlendedPersonaResult {
  isBlended: boolean;
  topKeys: PersonaKey[];
  title: string;
  statement: string;
  midasConnection: string;
  superpower: string;
  howYouCollaborate: string;
  quote: string;
  goldenTitle: string;
  goldenTouchLore: string;
  medallionImageSrc: string;
  primaryPersonas: PersonaDetails[];
}

export type ScoreRecord = Record<PersonaKey, number>;
