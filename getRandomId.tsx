
export function getRandomId(length: number = 10): string {
    return "a"+Math.random().toString(36).slice(2, length + 2);
}