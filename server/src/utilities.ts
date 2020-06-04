const chars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];
// and then just do:
export const randomID = len => [...Array(len)].map(() => chars[(Math.random() * chars.length) | 0]).join('');

export const chooseOne = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const chooseN = (arr, size, exclude = []) => {
  const result = [];
  while (result.length < size) {
    const current = chooseOne(arr);
    if (result.indexOf(current) == -1 && exclude.indexOf(current) == -1) {
      result.push(current);
    }
  }
  return result;
};
