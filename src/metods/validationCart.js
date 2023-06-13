export const validationCart = (setItems) => {
    let localItems = []
    try {
        localItems = JSON.parse(localStorage.getItem('cart'))
    } catch {
        localStorage.setItem('cart', JSON.stringify([]))
    }
    if (localItems === null){
        localStorage.setItem('cart', JSON.stringify([]))
        localItems = []
    }
    for (let i = 0; i < localItems.length; i++) {
        if (Object.keys(localItems[i])[0] !== 'id' || Object.keys(localItems[i])[1] !== 'count') {
            localItems.splice(i, 1);
            i -= 1
        } else if (typeof localItems[i].id !== 'number' || typeof localItems[i].count !== 'number') {
            console.log(typeof localItems[i].id)
            localItems.splice(i, 1);
            i -= 1
        }
        else {

        }
    }
    localStorage.setItem('cart', JSON.stringify(localItems))
    setItems(localItems)
}
