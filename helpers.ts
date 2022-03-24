export function dateToNorwegianString(date: string) {
  return new Date(date).toLocaleDateString('nb-NO');
}
