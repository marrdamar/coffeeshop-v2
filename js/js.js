function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function showAlert() {
    const email = document.getElementById('email').value;
    if (email == '') {
        alert('Silahkan isi email anda');
    } else {
        document.getElementById('message').innerHTML = 'Click here if you dont receive any link in 1 minutes';
        var fiveMinutes = 60,
            display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    }
}

