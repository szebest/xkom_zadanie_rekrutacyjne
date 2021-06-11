const initialState = {
    reservedPlaces: 0,
    nextToEachOther: false
}

const seatAmountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SETAMOUNT': {
            state = {
                reservedPlaces: action.reservedPlaces,
                nextToEachOther: action.nextToEachOther
            }
            return state
        }
        case 'INCREMENT': {
            state = {
                reservedPlaces: state.reservedPlaces + 1,
                nextToEachOther: state.nextToEachOther
            }
            return state
        }
        case 'DECREMENT': {
            state = {
                reservedPlaces: state.reservedPlaces - 1,
                nextToEachOther: state.nextToEachOther
            }
            return state
        }
        default: {
            return state
        }
    }
}

export default seatAmountReducer