// Onclick handler
document.getElementById('register').addEventListener('click', (e)=>{
    e.preventDefault();
    document.getElementById('nameError1').style.display = '';
    document.getElementById('passError1').style.display = '';
    document.getElementById('nameError2').style.display = '';
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
            if (this.readyState==4 && this.status==201){
                alert(`Register successfully!`);
                let newUser = JSON.parse(this.responseText);
                location.href = `/users/${newUser._id.toString()}`;
            } else if(this.status == 400){
                document.getElementById('nameError2').style.display = 'block';
            }
        }
        req.open("POST", "/register");
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(user));
    }
})