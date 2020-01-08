export const addCart = item => dispatch => {
    dispatch({
        type: 'ADDCART',
        payload: item
    })
}
export const itemsArray = items => dispatch => {
    dispatch({
        type: 'ITEMS_GET',
        payload: items
    })
}