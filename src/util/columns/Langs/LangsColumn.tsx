import LangColumn from './LangColumn';

export default function getLangColumns<T>() {
  const columns: LangColumn<T>[] = [];
  // langs.forEach((lang: any) => columns.push(new LangColumn({ indexID })));
  return columns;
}
