// Onclick handler
if (curSession.loggedin) {
    document.getElementById('on').addEventListener('change', (e)=>{
        e.preventDefault();
        let on = document.getElementById('on').checked;
        let privacy = {'privacy': on}
        let req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if (this.readyState==4 && this.status==201){
                alert(`Change private mode successfully!`);
            } 
        }
        req.open("PUT", window.location.href);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(privacy));  
    });
    document.getElementById('off').addEventListener('change', (e)=>{
        e.preventDefault();
        let off = document.getElementById('off').checked;
        let privacy = {'privacy': !off}
        let req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if (this.readyState==4 && this.status==201){
                alert(`Change private mode successfully!`);
            } 
        }
        req.open("PUT", window.location.href);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(privacy));  
    });
}