// Convert full names for days into abbreviations
export function convertDaysToAbbs(days: string[]): string[] {

    const dayMap: { [key: string]: string } = {
        'monday': 'Mon',
        'tuesday': 'Tue',
        'wednesday': 'Wed',
        'thursday': 'Thu',
        'friday': 'Fri',
        'saturday': 'Sat',
        'sunday': 'Sun'
    };
    return days.map(day => dayMap[day.toLowerCase()] || day);
}