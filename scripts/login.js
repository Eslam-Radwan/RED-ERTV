const username = document.querySelector('#username')
const password = document.querySelector('#password')



const form = document.querySelector('form')
form.addEventListener('submit',function(e){
    e.preventDefault();
    console.log(username.value);
    console.log(password.value);
    
    if(username.value === localStorage.getItem('username') && password.value === localStorage.getItem('password'))
        window.location.href = 'index.html';
    else
    {
        alert('username or Password is invalid')

    }
})