const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

const form = document.querySelector('form')

form.addEventListener('submit',function(e){
        e.preventDefault();
        localStorage.setItem('firstName', firstName.value)
        localStorage.setItem('lastName', lastName.value)
        localStorage.setItem('username', username.value)
        localStorage.setItem('email', email.value)
        localStorage.setItem('password', password.value)
        window.location.href = 'login.html'

})


