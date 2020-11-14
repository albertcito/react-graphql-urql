import LangColumn from './LangColumn';

interface LangProperties {
  langID: string;
}

export default function getLangColumns<T>(indexID: keyof T, langs: LangProperties[], langIDGlobal: string) {
  const columns: LangColumn<T>[] = [];
  langs.forEach(({ langID }) => columns.push(new LangColumn({ indexID, langID, langIDGlobal })));
  return columns;
}
