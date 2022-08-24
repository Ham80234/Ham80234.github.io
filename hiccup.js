function AddData(){ 
    var date = new Date()
    var DMY = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    var time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`


    var elm = document.getElementById("dataTable")
    let item = document.createElement("tr")
    let count = elm.childElementCount;
    let countItem = document.createElement("th")
    countItem.textContent = `${count+1}`
    countItem.setAttribute("scope", "row")
    let dateItem = document.createElement("td")
    dateItem.textContent = DMY
    let timeItem = document.createElement("td")
    timeItem.textContent = time


    item.appendChild(countItem)
    item.appendChild(dateItem)
    item.appendChild(timeItem)

    elm.appendChild(item)
}

function Cleardata(){ 
    var elm = document.getElementById("dataTable")
    elm.innerHTML = ""
}