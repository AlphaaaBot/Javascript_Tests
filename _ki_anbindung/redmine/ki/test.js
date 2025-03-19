// Function to create the AI Button on the site
function aiButtonOnSite() {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const mainButton = createMainButton();
    const dropdown = createDropdown();
    const formContainer = createFormContainer();

    mainButton.onclick = function () {
        toggleDropdown(dropdown, formContainer);
    };

    // Append elements to the document
    buttonContainer.appendChild(mainButton);
    buttonContainer.appendChild(dropdown);
    document.body.appendChild(buttonContainer);
    document.body.appendChild(formContainer);
}

// Create the main button for the site
function createMainButton() {
    const mainButton = document.createElement("button");
    mainButton.innerHTML = "KI-Button";
    mainButton.classList.add("main-button");
    return mainButton;
}

// Create dropdown options
function createDropdown() {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const options = [
        "Beschreibung in Stichpunkten",
        "Antwortmail zusammenfassen",
        "Zusammenfassung Beschreibung (detailiert)",
        "Auf Deutsch übersetzen",
        "Auf Englisch übersetzen"
    ];

    options.forEach(optionText => {
        const option = createDropdownOption(optionText);
        dropdown.appendChild(option);
    });

    return dropdown;
}

// Create individual dropdown option
function createDropdownOption(optionText) {
    const option = document.createElement("button");
    option.innerText = optionText;
    option.classList.add("dropdown-option");

    option.onclick = function () {
        showForm(optionText);
    };

    return option;
}

// Create the form container
function createFormContainer() {
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");

    const formTitle = document.createElement("div");
    formTitle.classList.add("form-title");

    const textarea = document.createElement("textarea");
    textarea.classList.add("form-textarea");

    const closeButton = createCloseButton(formContainer);

    formContainer.appendChild(formTitle);
    formContainer.appendChild(textarea);
    formContainer.appendChild(closeButton);

    return formContainer;
}

// Create close button for the form
function createCloseButton(formContainer) {
    const closeButton = document.createElement("button");
    closeButton.innerText = "Schließen";
    closeButton.classList.add("close-button");

    closeButton.onclick = function () {
        formContainer.style.display = "none";
    };

    return closeButton;
}

// Show the form with the selected option
function showForm(optionText) {
    const formContainer = document.querySelector(".form-container");
    const formTitle = formContainer.querySelector(".form-title");
    const textarea = formContainer.querySelector(".form-textarea");

    // Set the title above the textarea
    formTitle.innerText = `Option gewählt: ${optionText}`;
    
    // Adjust form size
    formContainer.style.width = "400px";
    formContainer.style.height = "300px";
    
    textarea.value = ''; // Clear textarea
    formContainer.style.display = "block";

    const dropdown = document.querySelector(".dropdown");
    dropdown.style.display = "none";
}

// Toggle the dropdown visibility
function toggleDropdown(dropdown, formContainer) {
    if (dropdown.style.display === "none") {
        dropdown.style.display = "flex";
        formContainer.style.display = "none";
    } else {
        dropdown.style.display = "none";
    }
}

// Function for creating the AI chat button on the sidebar
function aiChatBoxOnSidebar() {
    const sidebar = document.getElementById("sidebar_content");
    const aiChatButton = document.createElement("button");
    aiChatButton.text = "AIIIII";
    aiChatButton.innerHTML = "test";
    aiChatButton.setAttribute("background", "cadetblue");
    aiChatButton.setAttribute("id", "aiChatButton");
    sidebar.appendChild(aiChatButton);
}

// Function to fetch data and call the API for AI chat
function aiChatBox() {
    const issueFieldID = $('#issue-detail').data("entity-id");
    $.get(`/issues/${issueFieldID}.json`, function(requestData) {
        if (issueFieldID === 1386) {
            const current = requestData["issue"];
            const currentUser = current["assigned_to"]["name"];
            const currentAuthor = current["author"]["name"];
            const currentAuthorCompany = current["project"]["name"];
            const currentDescription = current["description"];
            const currentLanguage = "en";

            RequestAPI(currentUser, currentAuthor, currentAuthorCompany, currentDescription, currentLanguage);
        }
    });
}

// Function to request the AI API
async function RequestAPI(currentUser, currentAuthor, currentAuthorCompany, currentDescription, currentLanguage) {
    const apiUrl = "link"; // API endpoint
    let text = generateRequestText(currentUser, currentAuthor, currentAuthorCompany, currentDescription);

    const data = {
        model: "llama3.1",
        prompt: text,
        stream: false
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${errorText}`);
        }

        const responseData = await response.json();
        console.log("Response:", responseData);
        return responseData;

    } catch (error) {
        console.error("Error:", error);
    }
}

// Generate the request text for the AI API
function generateRequestText(currentUser, currentAuthor, currentAuthorCompany, currentDescription) {
    return `"${currentDescription}" Verfasse eine kurze Antwortmail an den Kunden, indem du seinen Nachnamen erwähnst falls diese gegeben ist. Sollte der Nachname nicht gegeben sein, verfasse mir eine mögliche Antwort mit diesem Namen: ${currentAuthor}. Wir beantworten die Mail als die Person mit dem Namen ${currentUser}. Wenn es eine Anfrage ist oder ein Feature Wunsch, schreibe dass wir die Anforderung prüfen und uns zurückmelden. Wenn es sich um ein Problem, Bug oder Systemausfall handelt, schreibe dass die Anfrage zur Problemlösung an den entsprechenden Kollegen weitergegeben wurde und er sich meldet. Bitte schreibe kein Datum, Betreff, Von und An in der Antwort mit.`;
}
