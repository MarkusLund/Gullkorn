export function datoToPrettyString(date: Date) {
  return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function dateToNorwegianString(date: Date) {
  return date.toLocaleDateString('nb-NO');
}
