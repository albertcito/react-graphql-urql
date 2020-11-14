export interface LangProperties {
  langID: string;
  name: string;
  localName: string;
  active: boolean;
  isBlocked: boolean;
}

export const langs: LangProperties[] = [
  {
    langID: 'ES',
    name: 'Spanish',
    localName: 'Espa\u00F1ol',
    active: true,
    isBlocked: true,
  },
  {
    langID: 'EN',
    name: 'English',
    localName: 'English',
    active: true,
    isBlocked: true,
  },
];
