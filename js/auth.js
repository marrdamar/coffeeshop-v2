let email = "",
    password = "",
    phone = "";

// cek email sudah pernah register atau belum
async function getAPI(url) {
    // membuat fungsi getAPI dan menerima parameter URL
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log('endpoint mati nih bos', err)
        return 'err'
    }
}

async function postAPI(url, data = {}) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

async function cekEmail(email) {
    const res = await getAPI('http://localhost:3004/users?email=' + email)
    if (res == 'err') return (
        Swal.fire({
            title: 'Error!',
            text: 'Endpointnya modyar',
            icon: 'error',
            timer: 5000,
        })
    )
    if (res.length > 0) {
        document.getElementById('result').innerText = 'Email sudah terdaftar';
        document.getElementById('email').style.border = '1px solid red';
        document.getElementById('overlay').style.display = 'none';
    } else {
        document.getElementById('result').innerText = '';
        document.getElementById('email').style.border = '1px solid green';
        document.getElementById('overlay').style.display = 'none';
    }
}


window.addEventListener('DOMContentLoaded', (e) => {
    // listening blur pada input email
    if (contentPath == './home/signup.html') {
        document.getElementById('email').addEventListener('blur', () => {
            email = document.getElementById('email').value.toLowerCase().toString();
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            // validasi input kosong
            if (email == '') {
                document.getElementById('result').innerText = 'Email tidak boleh kosong';
                document.getElementById('email').style.border = '1px solid red';
                return;
            }

            // validasi panjang dari inputan, dilanjutkan validasi format email
            // jika panjang inputan lebih dari 3 maka email akan dicek sudah dipakai atau belum
            if (email.length > 3) {
                if (!email.match(validRegex)) {
                    document.getElementById('result').innerText = 'Format Email Salah';
                    document.getElementById('email').style.border = '1px solid red';
                    return
                }
                cekEmail(email)
            } else {
                document.getElementById('result').innerText = 'Format Email Salah';
                document.getElementById('email').style.border = '1px solid red';
            }
        })
    }

    // register form submit
    if (contentPath == './home/signup.html') {
        document.getElementById('registerForm').addEventListener('submit', (e) => {

            e.preventDefault();

            // validasi input & reformat value
            let inputPassword = CryptoJS.SHA256((document).querySelector('input[name=password]').value).toString(),
                inputPhone = document.getElementById('phone').value.toString();

            // validasi inputan kosong
            if (email == '' || inputPassword === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' || inputPhone == '') {
                document.getElementById('result').innerHTML = 'Format Email Salah<br>Password tidak boleh kosong';
                document.getElementById('email').style.border = '1px solid red';
                return
            }

            const data = {
                email: email,
                password: inputPassword,
                phone: inputPhone
            }

            postAPI('http://localhost:3004/users', data)
                .then((res) => { //cek user input berhasil
                    console.log(res);
                    Swal.fire({
                        title: 'Sukses!',
                        text: 'Registrasi Berhasil!' + res.email,
                        icon: 'success',
                        timer: 3000,
                    }).then(() => {
                        document.getElementById("registerForm").reset();
                        document.getElementById('result').innerText = '';
                        document.getElementById('email').style.border = '1px solid black';
                        // bisa tambah redirect ke login disini
                    })
                })
        })
    }
})