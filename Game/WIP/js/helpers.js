export function getDateFormat() { 
    let date = new Date()
    return `${date.getMonth()}-${date.getDate()}`
}