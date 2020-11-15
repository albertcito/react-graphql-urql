export interface TranslationCreateProperties {
  code?: string;
  isBlocked?: boolean;
  texts: {
    text: string;
    langID: string;
  }[]
}

export interface TranslationUpdateProperties extends TranslationCreateProperties {
  translationID: number;
}
