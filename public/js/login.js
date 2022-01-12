// Onclick handler
document.getElementById('login').addEventListener('click', (e)=>{
    e.preventDefault();
    document.getElementById('nameError1').style.display = '';
    document.getElementById('nameError2').style.display = '';
    document.getElementById('passError1').style.display = '';
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (!username) {
        document.getElementById('nameError1').style.display = 'block';
    }
    if (!password) {
        document.getElementById('passError1').style.display = 'block';
    }
    if (username && password) {
        let user = {
            'username': username, 
            'password': password
        }
        let req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if (this.readyState==4 && this.status==200){
                let loginUser = JSON.parse(this.responseText);
                location.href = `/users/${loginUser._id.toString()}`;
            } else if(this.status==400){
                document.getElementById('nameError2').style.display = 'block';
            } else if (this.status==205){
                alert(`Already logged in!`);
            }
        }
        req.open("POST", "/login");
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(user));
    }
})