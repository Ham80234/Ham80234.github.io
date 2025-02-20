function Setup () { 
    if(!localStorage.getItem('game')){ 
        localStorage.setItem('game', {
            players: [],
            totals: []
        })
    }
}

let currentPlayer = 0

