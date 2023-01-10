export const displayDate = (date: Date): string => {
    return date.toLocaleDateString();
}

export const displayFullHour = (date: Date): string => {
    return date.getHours() + 'h' + displayMinutes(date.getMinutes().toString());
}

export const displayMinutes = (minutes: string): string => {
    return minutes.length < 2 ? '0' + minutes : minutes;
}

export const displayDateAndTime = (date: Date): string => {
    return `${ displayDate(date) } - ${ displayFullHour(date) }`;
}

export const displayDuration = (duration: number): string => {
    const [hours, hundredthOfAnHour] = (duration/60).toFixed(2).split('.');
    const minutes: string = (parseInt(hundredthOfAnHour)*60/100).toFixed(0);
    return hours + 'h' + displayMinutes(minutes);
}