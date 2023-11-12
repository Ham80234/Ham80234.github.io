function Setup () { 
    if(!localStorage.getItem('players')){ 
        localStorage.setItem('players', [])
    }
}