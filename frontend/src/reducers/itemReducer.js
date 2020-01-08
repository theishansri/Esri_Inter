const initState = {
    items: {},
    cart: {}
}
const itemReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADDCART':
            return {
                ...state,
                items: { ...action.payload }
            }
        case 'ITEMS_GET':
            let cart = {}
            for (let i = 0; i < action.payload.length; i++) {
                cart[action.payload[i]['ItemName']] = action.payload[i]['ItemPrice']

            }
            return {
                ...state,
                cart
            };
        default:
            return state;
    }
}
export default itemReducer