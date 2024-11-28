export function flattenMapError(errMap: Record<string, string[]>): string[] {
  const errArr = Object.values(errMap).flatMap(errStr => errStr);

  return errArr;
}
