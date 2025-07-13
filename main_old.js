function openMenu(event) { 
    let menu = document.getElementById('mobile')
    console.log(menu.classList)

    if (menu.classList.length === 1) { 
        console.log('adding class')
        menu.classList += ' aside-open'
    }else { 
        menu.classList.remove('aside-open')
    }
}

openMenu()