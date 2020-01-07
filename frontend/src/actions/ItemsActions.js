export const addCart = item => dispatch => {
    console.log("Ac", item)
    dispatch({
        type: 'ADDCART',
        payload: item
    })
}