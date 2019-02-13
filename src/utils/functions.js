// displays any number as double digits
export const doubleDigits = (number) => {
    let doubleString = "0" + number;
    return doubleString.slice(-2)
}

// capitalizes first letter
export const firstCapital = (string) => {
    return string.substring(0,1).toUpperCase() + string.substring(1);
}

// calculates seconds from number of minutes
export const minToSec = (minutes) => {
    return minutes * 60;
}