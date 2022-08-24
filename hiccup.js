function populate(){ 
    var LS = window.localStorage.getItem("data") || window.localStorage.setItem('data', JSON.stringify({items: []}))
    LS = JSON.parse(LS)["items"]
    console.log(LS)
    LS.forEach(element => {
        createTableEntry(element[0], element[1], element[2])
    });
}


function AddData(Setting){ 
    var date = new Date()
    var DMY = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    var time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    var data = JSON.parse(window.localStorage.getItem("data"))
    data["items"].push([DMY, time, Setting])


   window.localStorage.setItem("data", JSON.stringify(data))

    createTableEntry(DMY, time, Setting)

}

function createTableEntry(date, time, desc){
    var elm = document.getElementById("dataTable")
    let item = document.createElement("tr")
    let count = elm.childElementCount;
    let countItem = document.createElement("th")
    countItem.textContent = `${count+1}`
    countItem.setAttribute("scope", "row")
    let dateItem = document.createElement("td")
    dateItem.textContent = date
    let timeItem = document.createElement("td")
    timeItem.textContent = time

    let descItem = document.createElement("td")
    descItem.textContent = desc


    item.appendChild(countItem)
    item.appendChild(dateItem)
    item.appendChild(timeItem)
    item.appendChild(descItem)

    elm.appendChild(item)
}

function Cleardata(){ 
    var elm = document.getElementById("dataTable")
    elm.innerHTML = ""
    window.localStorage.setItem("data", JSON.stringify({items: []}))
}

