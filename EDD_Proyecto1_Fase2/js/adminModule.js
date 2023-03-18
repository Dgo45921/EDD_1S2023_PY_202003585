const load_button = document.getElementById("load_button");

load_button.addEventListener("click", function() {
    load_json()
});


function load_json(){
    console.log("cargo json")
    let contienearchivo = document.getElementById("cargaMasiva")
    let archivo = contienearchivo.files[0]
    const fr = new FileReader();
    fr.readAsText(archivo)
    fr.onload = function (){
        const contenidojson = fr.result;
        console.log(contenidojson)
    }
}