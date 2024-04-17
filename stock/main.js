function triggerDrop() { 
    let item = document.getElementById('present')
    let message = document.getElementById('message')
    item.classList.remove('animate__jackInTheBox')
    item.classList.add('animate__bounceOutDown')
    message.classList.remove('invisible')
}