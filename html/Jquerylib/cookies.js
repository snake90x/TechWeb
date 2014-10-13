function scriviCookie(nomeCookie)
{
	document.cookie="username="+nomeCookie;
}


function leggiCookie(nomeCookie)
{
	var userlogged;
  if (document.cookie.length > 0)
  {
   userlogged=document.cookie;
  }
  return userlogged;
}


function cancellaCookie()
{
  scriviCookie("");
  location.reload();
}


function verificaCookie()
{
  document.cookie = 'verifica_cookie';
  var testcookie = (document.cookie.indexOf('verifica_cookie') != -1) ? true : false;
  return testcookie;
}
