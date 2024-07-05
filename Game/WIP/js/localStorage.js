
export function getItem(key) {
    // if item doesnt exist return -1
    let res = window.getItem(key)
    return res ? res : -1
}

export function setItem(key, value) { 
    window.localStorage.setItem(key, value)
}


