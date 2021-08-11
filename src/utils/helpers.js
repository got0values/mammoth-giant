export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-IS', {
        style:'currency',
        currency:'USD'
    }).format(number / 100)
    return newNumber
}

export const getUniqueValues = () => {}
