    window.onload = function() {
        
    };


    let showManagment = false

    function toggleManagment() {
        if (!showManagment) {
            document.getElementsByClassName('display-none')[0].classList.remove('display-none')
            showManagment = !showManagment
        }else {
            document.getElementsByClassName('button-container')[0].classList.add('display-none')
            showManagment = !showManagment
        }
    }