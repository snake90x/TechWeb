// FUNZIONI PER IL CONTROLLO DEI COOKIES USATI PER IL RICONOSCIMENTO TRAMITE USERNAME.	
var logged;
	
function scriviCookie(nomeCookie){
	logged=nomeCookie;
	document.cookie="username="+logged;
}


function leggiCookie(){
	if (document.cookie.length > 0){
		return logged;
	}
}

function cancellaCookie(){
  document.cookie="";
  location.reload();
}
