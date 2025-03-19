document.addEventListener("DOMContentLoaded", function () {
    // Stile für das UI-Design
    const styles = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .floating-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .dropdown {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 90px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .dropdown button {
            display: block;
            width: 100%;
            padding: 8px 12px;
            border: none;
            background: none;
            text-align: left;
            cursor: pointer;
        }
        .dropdown button:hover {
            background-color: #f1f1f1;
        }
        .popup {
            display: none;
            position: fixed;
            bottom: 80px;
            right: 250px;
            width: 250px;
            background: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            border: 1px solid #ccc;
            z-index: 10;
        }
        .popup textarea {
            width: 100%;
            height: 80px;
            resize: none;
            overflow: hidden;
        }
        .popup textarea:focus {
            resize: vertical;
        }
        .popup button {
            margin-top: 10px;
            width: 100%;
            background-color: #007bff;
            color: white;
            padding: 5px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }
    `;

    // CSS in das Dokument einfügen
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Hauptcontainer für den Button & Menü
    const container = document.createElement("div");
    document.body.appendChild(container);

    // Button erstellen
    const button = document.createElement("button");
    button.innerText = "Optionen";
    button.className = "floating-button";
    button.onclick = toggleDropdown;
    container.appendChild(button);

    // Dropdown-Menü erstellen
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";
    dropdown.id = "dropdown";
    container.appendChild(dropdown);

    const options = [
        "Fasse die Beschreibung in 3 Stichpunkten zusammen",
        "Antwortmail schreiben",
        "Beschreibung zusammenfassen",
        "Mail auf Deutsch übersetzen",
        "Mail auf Englisch übersetzen",
    ];

    options.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.innerText = option;
        optionButton.onclick = () => openPopup(option);
        dropdown.appendChild(optionButton);
    });

    // Popup erstellen
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "popup";
    container.appendChild(popup);

    const popupTitle = document.createElement("p");
    popupTitle.id = "popup-title";
    popup.appendChild(popupTitle);

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Ergebnis hier...";
    popup.appendChild(textarea);

    const closeButton = document.createElement("button");
    closeButton.innerText = "Schließen";
    closeButton.onclick = closePopup;
    popup.appendChild(closeButton);

    // Funktionen
    function toggleDropdown() {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        popup.style.zIndex = "5"; // Popup bleibt im Vordergrund
    }

    function openPopup(title) {
        popupTitle.innerText = title;
        popup.style.display = "block";
        popup.style.zIndex = "10";
        dropdown.style.display = "none"; // Schließt das Dropdown
    }

    function closePopup() {
        popup.style.display = "none";
    }
});
