const seatsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SETSEATS': {
            return action.data.map(a => ({...a}))
        }
        default: {
            return state
        }
    }
}

export default seatsReducer