class Login {
    render() {
        const htmlLogin = `
            <img src="img/translate-svgrepo-com%201.png" alt="">
           <div class="loginPage">
                <div class="logins-btn">
                    <button onclick="openHome()" class="login-btn">Translate</button>
                    <button onclick="openTerms()" class="login-btn">Terms</button>
                </div>
            </div>
        `
        ROOT_login.innerHTML = htmlLogin;
    }

}

const loginPage = new Login();
loginPage.render();

function openHome() {
    const loginPage = document.querySelector('#login')
    loginPage.classList.add('hide')
    const homePage = document.querySelector('#home')
    homePage.classList.remove('hide')

}


function openTerms() {
    const loginPage = document.querySelector('#login')
    loginPage.classList.add('hide')
    const termsPage = document.querySelector('#terms')
    termsPage.classList.remove('hide')

}