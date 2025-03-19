function buttonpress() {
    let textContent = document.getElementById("textbox").value;
    document.getElementById("result").innerText = reverse(textContent);
}

// "Interface"
function reverse(input) {

    // Guard clauses
    if (!input || input.length == 0) { return ""; }
    if (input.length == 1) { return input; }


    // Aus String ein Array
    let inputArray = input.split("");
    for(var i = 0; i<=Math.ceil(inputArray.length/2-1); i++)
        //math.seal
        {
            var temp = inputArray[i];
            inputArray[i] = inputArray[inputArray.length-i-1];
            inputArray[inputArray.length-i-1] = temp;
        }
        
    // Aus Array wieder String
    return inputArray.join("");
}





// Weiter -> retieW
// reiteW
// retieW

// Eisberg
// gisberE
// grsbeiE
// grebsiE

