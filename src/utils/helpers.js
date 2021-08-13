export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-IS', {
        style:'currency',
        currency:'USD'
    }).format(number / 100)
    return newNumber
}

export const getUniqueValues = (data,type) => {
    let unique = data.map((item) => item[type])
    //converts color to html color code
    if (type === 'colors') {
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
}
