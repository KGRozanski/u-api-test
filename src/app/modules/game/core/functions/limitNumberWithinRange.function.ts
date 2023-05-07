export function limitNumberWithinRange(num: number): number {
    if(num > 0) {
        return 5;
    } else if (num < 0) {
        return -5;
    } else {
        return 0;
    }
}
