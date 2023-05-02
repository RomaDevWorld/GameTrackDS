const formatTime = (ms: number, loc: string): string => {
    let seconds = (ms / 1000)
    let minutes = (ms / (1000 * 60))
    let hours = (ms / (1000 * 60 * 60))
    let days = (ms / (1000 * 60 * 60 * 24))
    
    const locale = locValues(loc)
    
    if (seconds < 60) return seconds.toFixed(0) + locale.seconds;
    else if (minutes < 60) return minutes.toFixed(0) + locale.minutes;
    else if (hours < 24) return hours.toFixed(0) + locale.hours;
    else return days.toFixed(0) + locale.days;
};

export default formatTime;

const locValues = (loc: string) => {
    const localization: Localization = {
        'en-US': {
            "seconds": " seconds",
            "minutes": " minutes",
            "hours": " hours",
            "days": " days"
        },
        'uk': {
            "seconds": " секунд",
            "minutes": " хвилин",
            "hours": " годин",
            "days": " днів"
        }
    };

    if(!localization[loc]) return localization['en-US'];
    return localization[loc];

    interface Localization {
        [key: string]: {
          [key: string]: string;
        };
    }
};