const loginButton = document.getElementById("login_button");

loginButton.addEventListener("click", function() {
    login()
});


function login(){
    const username = document.getElementById("username_input").value.replace(" ", "");
    const password = document.getElementById("password_input").value.replace(" ", "");
   // console.log(password)
   // console.log(username)

    if (username === "" || password === "" ){
        alert("Por favor, llene todos los campos")
    }

    else if (username === "admin" && password === "admin" ){
        location.href = '../html/moduloAdmin.html';

    }
    else{
        console.log("busco en el arbol avl")
    }


}