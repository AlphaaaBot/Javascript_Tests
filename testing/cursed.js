//alert("Es funktioniert!");
//console.log("Es funktioniert!");
let counter = 0;
document.getElementById("21").innerHTML = "Goodbye.";

//var why = document.createElement("div") 
//why.innerHTML = "why?"
//document.body.appendChild(why)

var myYearButton = document.getElementById("year");
myYearButton.addEventListener("click", function(e){
    //counter += 1;
    //console.log(counter)
    const name = prompt("What is your name?");

    console.log("Der Name lautet " + name);
    document.querySelector("h1").innerHTML = "<h1>Willkommen " + name + "</h1>"
    if(name == "Obama"){
        window.open("https://de.wikipedia.org/wiki/Barack_Obama", "_self");
    }
})

/*
var yearButton = document.createElement("button");
yearButton.onclick="";
*/