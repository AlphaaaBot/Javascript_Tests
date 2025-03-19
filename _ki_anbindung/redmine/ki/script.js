const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");

const mainButton = document.createElement("button");
mainButton.innerHTML = "KI-Button";
mainButton.classList.add("main-button");

const dropdown = document.createElement("div");
dropdown.classList.add("dropdown");

const options = [
    "Beschreibung in Stichpunkten",
    "Antwortmail zusammenfassen",
    "Zusammenfassung Beschreibung (detailiert)",
    "Auf Deutsch",
    "Auf Englisch"
];

// Create the dropdown options and set up the click handler
for (let i = 0; i < options.length; i++) {
    const optionText = options[i];
    const option = document.createElement("button");
    option.innerText = optionText;
    option.classList.add("dropdown-option");

    option.onclick = function () {
        showForm(optionText);
    };

    dropdown.appendChild(option);
}

// forms for the output of ai answer
const formContainer = document.createElement("div");
formContainer.classList.add("form-container");

const formTitle = document.createElement("div");
formTitle.classList.add("form-title");

const textarea = document.createElement("textarea");
textarea.classList.add("form-textarea");

const closeButton = document.createElement("button");
closeButton.innerText = "Schließen";
closeButton.classList.add("close-button");

// Directly assigning the close button click handler
closeButton.onclick = function () {
    formContainer.style.display = "none";
};

formContainer.appendChild(formTitle);
formContainer.appendChild(textarea);
formContainer.appendChild(closeButton);

// Hauptbutton-Klick
mainButton.onclick = function () {
    if (dropdown.style.display === "none") {
        dropdown.style.display = "flex";
        formContainer.style.display = "none";
    } else {
        dropdown.style.display = "none";
    }
};

// Funktion: Formular anzeigen
function showForm(optionText) {
    // Set the title above the textarea
    formTitle.innerText = `Option gewählt: ${optionText}`;
    
    // Adjust form size
    formContainer.style.width = "400px"; // New width
    formContainer.style.height = "300px"; // New height
    
    textarea.value = ''; // Clear textarea (if needed)
    formContainer.style.display = "block";
    dropdown.style.display = "none";
}

// Elemente zur Seite hinzufügen
buttonContainer.appendChild(mainButton);
buttonContainer.appendChild(dropdown);
document.body.appendChild(buttonContainer);
document.body.appendChild(formContainer);
