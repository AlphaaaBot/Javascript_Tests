async function RequestAPI(msg){
  if(!msg == ''){
    console.log("Input: " + msg);
    const apiUrl = "https://gpt.blackpoint.de/ollama/api/generate";
    const data = {
      model: "llama3.1",
      prompt: msg,
      stream: false
    };

    let apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`HTTP Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response:", data); 
      return data;
    })
    .catch((error) => console.error("Error:", error));
    
    console.log(apiResponse.response);
    document.getElementById("antwortRedmineText").style.color = "green";
    document.getElementById("antwortRedmineText").innerHTML = apiResponse.response;

    closeForm();
  }else{
    console.log("Please enter a text.");
  }

  // query 1
  //You are an executive summary generator. # TASK Summarize text enclosed in triple quotes in a short sentence and explain the rest of the text in a maximum of 3 bullet points. """Zur Einarbeiten ins SData wird von den Auszubildenden eine Anwendung geschrieben, die von extern mit dem CRM spricht. Das Programm soll die SData-Schnittstelle verwenden, um Daten vom CRM zu lesen, löschen, erstellen und aktualisieren. Das Ganze kann wie folgt ablaufen: Einarbeitung SData ( http://sage.github.io/SData-2.0/pages/core/0200/ ), wie sieht eine URL aus, was gibt es für Parameter, die notwendig wären Einarbeitung HTTP-Requests, was gibt es für Typen (PUT, GET, POST,…), wie führe ich einen Request aus, wie definiere ich eine Payload Fehlerhandling (was passiert, wenn der Server unerreichbar ist, was passiert, wenn es keine Daten für den Request gibt etc.) Die oben genannten Konzepte sind unabhängig von der Programmiersprache, sollten aber in unserer Abteilung vorrangig mit C# durchgeführt werden. Als grobe Richtlinie dient folgende Aufgabe: ______________________ Die Auszubildenden werden eine Anwendung schreiben, die Folgendes können soll: Grafische Benutzeroberfläche, angeknüpft an https://redmine.blackpoint.de/issues/4988 (Berichtsheft) Eine Möglichkeit, alle Berichtshefte einzusehen Eine Möglichkeit, ein beliebiges Berichtsheft zu aktualisieren/löschen Eine Möglichkeit, ein Berichtsheft neu zu erstellen Zusätzliche, (aktuell) manuell programmierte Aggregatfunktionalitäten: Wie viele und welche Berichtshefte gibt es im Jahr 2023? Welche gibt es in der Kalenderwoche 23 im Jahr 2021? Wie viele haben “CX-Abteilung” als Abteilung etc."""

  // query 2
  // You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the text delimited by triple quotes and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points. Only give me the output and nothing else. Do not wrap responses in quotes. Aim for a summary length of around 20 words. Please answer in language "{language}". """Zur Einarbeiten ins SData wird von den Auszubildenden eine Anwendung geschrieben, die von extern mit dem CRM spricht. Das Programm soll die SData-Schnittstelle verwenden, um Daten vom CRM zu lesen, löschen, erstellen und aktualisieren. Das Ganze kann wie folgt ablaufen: Einarbeitung SData ( http://sage.github.io/SData-2.0/pages/core/0200/ ), wie sieht eine URL aus, was gibt es für Parameter, die notwendig wären Einarbeitung HTTP-Requests, was gibt es für Typen (PUT, GET, POST,…), wie führe ich einen Request aus, wie definiere ich eine Payload Fehlerhandling (was passiert, wenn der Server unerreichbar ist, was passiert, wenn es keine Daten für den Request gibt etc.) Die oben genannten Konzepte sind unabhängig von der Programmiersprache, sollten aber in unserer Abteilung vorrangig mit C# durchgeführt werden. Als grobe Richtlinie dient folgende Aufgabe: ______________________ Die Auszubildenden werden eine Anwendung schreiben, die Folgendes können soll: Grafische Benutzeroberfläche, angeknüpft an https://redmine.blackpoint.de/issues/4988 (Berichtsheft) Eine Möglichkeit, alle Berichtshefte einzusehen Eine Möglichkeit, ein beliebiges Berichtsheft zu aktualisieren/löschen Eine Möglichkeit, ein Berichtsheft neu zu erstellen Zusätzliche, (aktuell) manuell programmierte Aggregatfunktionalitäten: Wie viele und welche Berichtshefte gibt es im Jahr 2023? Welche gibt es in der Kalenderwoche 23 im Jahr 2021? Wie viele haben “CX-Abteilung” als Abteilung etc."""  

  // query 3
  // Die AI soll so tun als ob
  // Du bist Support Mitarbeiter bei der blackpoint Gmbh im Bereich Infor CRM und Infor CPQ, Dein Name ist: {username} Wir Siezen Kunden. Kunden wissen wer wir sind und wir müssen uns nicht vorstellen. Alle Kunden haben ihre eigene Infor CRM instanz für die wir Support und Customizing anbieten. Der Kunde "{author name}", welcher zum Unternehmen "{company name}" gehört, hat eine Anfrage mit folgendem zusammengefassten Inhalt eingereicht: """Hallo, wir hatten heute morgen Serverprobleme die nun behoben worden sind. Nur leider erhalten wir aktuell noch Fehlermeldungen im CRM. """

  // query 4
  // """Hallo, wir hatten heute morgen Serverprobleme die nun behoben worden sind. Nur leider erhalten wir aktuell noch Fehlermeldungen im CRM. """ Verfasse eine kurze Antwortmail an den Kunden. Wenn es eine Anfrage ist oder ein Feature Wunsch, schreibe dass wir die Anforderung prüfen und uns zurückmelden. Wenn es sich um ein Problem, Bug oder Systemausfall handelt, schreibe dass die Anfrage zur Problemlösung an den entsprechenden Kollegen weitergegeben wurde und er sich meldet.

  // IF YOU WANT TO USE CURL:
  // curl -k https://gpt.blackpoint.de/ollama/api/generate -d '{"model": "llama3.1", "prompt":"Whats 1+1?", "stream": false}'
}

function aiButton(){
  //var sidebar = document.getElementById("sidebar-box-watchers_wrapper-container");
  var sidebar = document.getElementById("mySidenav");
  var aiChatButton = document.createElement("button");
  aiChatButton.text = "AIIIII";
  aiChatButton.innerHTML = "test";
  aiChatButton.setAttribute("id","aiChatButton");
  //aiChatButton.setAttribute("onclick", "openForm()");
  
  sidebar.appendChild(aiChatButton);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}

aiButton();