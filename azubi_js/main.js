function ReverseString()
{
  var txt = document.getElementById("inputStr");
  var str = document.getElementById("str");
  s = "";
  
  charArr = Array.from(txt.value);
  console.log(txt.value.length);
  for(i = txt.value.length - 1; i >= 0; i--)
  {
      s += charArr[i];
      console.log(s);
  }

  str.innerText = s;
  //alert(str.value);
}

function doRequest(url){
  var response = fetch(url);

  console.log(url);
  console.log(response);

  if (response.ok) {
      return response.json();
  }
  else {
      throw new Error(`Response status: ${response.status}`);
  }
}

function SendJsonToJHDEV(){
  //questionAnswers
  //const username = 'admin'; 
  //const password = 'CRMAdmin1.';
  //const credentials = btoa(`${username}:${password}`);
  console.log("Hallo.")

  var response = doRequest(
    "MainHandler.ashx?$key=" + "QDEMOA000SWQ" +
    "&content=" + "Hallo"
  )

  console.log(JSON.parse(response))
  //return JSON.parse(response);
}