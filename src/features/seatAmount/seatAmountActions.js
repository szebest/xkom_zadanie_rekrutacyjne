export const setAmountAction = (reservedPlaces, nextToEachOther) => {
    return {
        type: 'SETAMOUNT',
        reservedPlaces,
        nextToEachOther
    }
}

export const incrementAction = () => {
    return {
        type: 'INCREMENT',
    }
}

export const decrementAction = () => {
    return {
        type: 'DECREMENT',
    }
}