import dayjs from 'dayjs';


export function getMonth(month = dayjs().month()){
    // month returned as between 0 and 11
    const year = dayjs().year()

    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day()
    // creates dayjs object for first day of the month, having the .day gives you 0 to 6 DoW

    let monthCounter = 0 - firstDayOfMonth
    const daysMatrix = new Array(6).fill([]).map(() => {
        // for each array we return another array 
        return new Array(7).fill(null).map(() => {
            monthCounter ++
            return dayjs(new Date(year, month, monthCounter))
        })
    })

    return daysMatrix

}