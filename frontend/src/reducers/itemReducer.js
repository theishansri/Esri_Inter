const initState = {
    items: {}
}
const itemReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADDCART':
            return {
                ...state,
                items: { ...action.payload }
            }
        default:
            return state;
    }
}
export default itemReducer