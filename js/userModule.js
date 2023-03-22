
let message = document.getElementById("message_user")
message.innerHTML = "Bienvenido " + greetUser()



function greetUser (){
    const jsonObject = JSON.parse(localStorage.getItem("logged_user"))
    return jsonObject.name
}
