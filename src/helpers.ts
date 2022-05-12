export function dateToNorwegianString(date: string) {
  return new Date(date).toLocaleDateString("nb-NO");
}

export function dateToNorwgianStringTodayIfNow(date: string) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateToCompare = new Date(date);
  if (
    dateToCompare.getDate() === today.getDate() &&
    dateToCompare.getMonth() === today.getMonth() &&
    dateToCompare.getFullYear() === today.getFullYear()
  ) {
    return "I dag";
  }
  return dateToNorwegianString(date);
}
