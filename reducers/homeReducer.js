const initialState = {
    name: '',
    quantity: 50
};

export const homeReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'SET_QUANTITY':
            return {
                ...state,
                quantity: action.payload
            }
        default:
            return state;
    }
}

