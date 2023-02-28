let contentPath, css, js;
let email = "",
    password = "",
    phone = "";
const menu = [
    {
        title: 'Home',
        function: 'navHome()'
    },
    {
        title: 'Product',
        function: 'navProduct()'
    },
    {
        title: 'Your Cart',
        function: 'navCart()'
    },
    {
        title: 'History',
        function: 'history_Product()'
    }
]
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

async function delAPI(url) {
    try {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
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
// create menu
// function navMenu() {
//     menu.map((value) => {
//         document.getElementById('mid-topbar').innerHTML += "<li class='pointer' onclick='" + value.function + "'>" + value.title + "</li>";
//     })
// }
// navMenu();

async function cardHistory() {
    const historyProduct = await getAPI('http://localhost:3004/historyProduct')
    document.getElementById('cardHistory').innerHTML = ''
    historyProduct.map((value) => {
        document.getElementById('cardHistory').innerHTML += `
        <div class='card' onclick='showBtn(${value.id})'>
            <span id='del-${value.id}' onClick='delHisProd(${value.id})' class='brown-circle btn-hide'>
                <img src='./assets/history-product/trash.svg'>
            </span>
            <span id='close-${value.id}' class='yellow-circle btn-hide'>
                <img src='./assets/history-product/x.svg'>
            </span>
            <div class='card-body'>
            <img src='${value.imagePath}'>
                <div class='card-content'>
                    <div>${value.namaProduk}</div>
                    <div>${value.hargaProduk}</div>
                    <div>${value.statusOrder}</div>
                </div>
            </div>
        </div>
        `

    })
}

function showBtn(id) {
    delBtn = document.getElementById(('del-' + id))
    closeBtn = document.getElementById(('close-' + id))
    if (delBtn.classList.contains('btn-hide')) {
        delBtn.classList.remove('btn-hide')
        closeBtn.classList.remove('btn-hide')
    } else {
        delBtn.classList.add('btn-hide')
        closeBtn.classList.add('btn-hide')
    }
}

async function delHisProd(id) {
    delAPI('http://localhost:3004/historyProduct/' + id)
        .then(() => {
            cardHistory()
        })
}

function navSignUp() {
    contentPath = './home/signup.html';
    // css = ['../product/product.html'];
    // js = '../product/product.html';
    document.getElementById('content').innerHTML = loadPage(contentPath);
    // document.getElementById('topbar').style.display = "none";
    emailListener();
    formSubmit();
}
function navLogin() {
    contentPath = './home/login.html';
    // css = ['../product/product.html'];
    // js = '../product/product.html';
    document.getElementById('content').innerHTML = loadPage(contentPath);
    document.getElementById('topbar').style.display = "none";
    document.querySelector(".bottombar-profile").style.display = "none";
}
function navHome() {
    // const topbar = window.getComputedStyle(document.getElementById('topbar')).display;
    // const footer = window.getComputedStyle(document.querySelector('.bottombar-profile')).display;
    contentPath = './home.html';
    // css = ['../product/product.html'];
    // js = '../product/product.html';
    document.getElementById('content').innerHTML = loadPage(contentPath);
    // if (topbar != 'flex') document.getElementById('topbar').style.display = "flex";
    document.getElementById('topbar').remove();
    // if (footer != 'flex') document.querySelector('.bottombar-profile').style.display = "flex";
    document.getElementById('navbar');
}
function navProduct() {
    contentPath = '../product/list.html';
    // css = ['../product/product.html'];
    // js = '../product/product.html';
    document.getElementById('content').innerHTML = loadPage(contentPath);
    document.getElementById('navbar').remove();
    document.getElementById('topbar');
    document.getElementById('mid-topbar');
    document.getElementById('right-topbar').innerHTML = "<img src='../assets/product-css/searchlogo.svg' alt='search'><img src='../assets/product-css/chatlogo.svg' alt='chat'><img src='../assets/product-css/profilelogo.svg' alt='profile' class='profilelogo' onclick='profile()'>";
}
function detailProduct() {
    contentPath = '../product/detail.html';
    // css = ['../product/product.html'];
    // js = '../product/product.html';
    document.getElementById('content').innerHTML = loadPage(contentPath);
    document.getElementById('right-topbar').innerHTML = "<img src='../assets/product-css/searchlogo.svg' alt='search'><img src='../assets/product-css/chatlogo.svg' alt='chat'><img src='../assets/product-css/profilelogo.svg' alt='profile' class='profilelogo' onclick='profile()'>";
}
function profile() {
    contentPath = '../profile/profile.html';
    // css = ['../product/product.html'];
    // js = '../product/product.html';
    document.getElementById('content').innerHTML = loadPage(contentPath);
    document.getElementById('right-topbar').innerHTML = "<img src='../assets/product-css/searchlogo.svg' alt='search'><img src='../assets/product-css/chatlogo.svg' alt='chat'><img src='../assets/product-css/profilelogo.svg' alt='profile' class='profilelogo' onclick='profile()'>";
}
function forgotPassword() {
    contentPath = './home/forgotpass.html';
    // css = ['../product/product.html'];
    // js = '../product/product.html';
    document.getElementById('content').innerHTML = loadPage(contentPath);
    document.getElementById('topbar').style.display = "none";
    document.querySelector(".bottombar-profile").style.display = "none";
}
function history_Product() {
    contentPath = '../profile/historyprod.html';
    // css = ['../product/product.html'];
    // js = '../product/product.html';
    document.getElementById('content').innerHTML = loadPage(contentPath);
    document.getElementById('right-topbar').innerHTML = "<img src='../assets/product-css/searchlogo.svg' alt='search'><img src='../assets/product-css/chatlogo.svg' alt='chat'><img src='../assets/product-css/profilelogo.svg' alt='profile' class='profilelogo' onclick='profile()'>";
    cardHistory();
}

const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");
let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};

navbarToggle.addEventListener("click", toggleNavbarVisibility);

navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());
navbarMenu.addEventListener("click", toggleNavbarVisibility);




function loadPage(href) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}
window.addEventListener('DOMContentLoaded', (e) => {
    if ((typeof contentPath) == 'undefined') navHome();
})

// listening blur pada input email
function emailListener() {
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
                return;
            }
            cekEmail(email)
        } else {
            document.getElementById('result').innerText = 'Format Email Salah';
            document.getElementById('email').style.border = '1px solid red';
        }
    })
}

// register form submit
function formSubmit() {
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

        const datauser = {
            email: email,
            password: inputPassword,
            phone: inputPhone
        }

        postAPI('http://localhost:3004/users', datauser)
            .then((res) => { //cek user input berhasil
                if ((typeof res) == 'undefined') {
                    console.log(res);
                    Swal.fire({
                        title: 'Gagal!',
                        text: 'Registrasi Gagal!',
                        icon: 'error',
                        timer: 3000,
                    })
                    return;
                }
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