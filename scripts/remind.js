var submit = false;

get('remind').onclick = check;

	
function replaceAll( string ){
	var string2 = string.replace(/&/g, "&amp;");
	string2 = string2.replace(/</g, "&lt;");
	string2 = string2.replace(/>/g, "&gt;");
	string2 = string2.replace(/\"/g, "&quot;");
	string2 = string2.replace(/\'/g, "&#x27;");
	string2 = string2.replace(/\//g, "&#x27;");
	return string2;
}

function check(){
	
	var login = get('login').value;
	login = replaceAll(login);
	if (login.length == 0){
		dodajInfo("Podaj poprawny login", 'login_err', 'login_msg');
	} else if( login.indexOf("select") > -1 || login.indexOf("SELECT") > -1 || login.indexOf("where") > -1 || login.indexOf("WHERE") > -1) {
		dodajInfo("Sql injection? Not this time.", 'login_err', 'login_msg');
	} else if( login.indexOf("document") > -1 || login.indexOf("script") > -1 || login.indexOf("onclick") > -1 || login.indexOf("onload") > -1) {
		dodajInfo("XSS? Not this time.", 'login_err', 'login_msg');
	
	}else {
		usunInfo('login_msg', 'login_err');
		sendRequest();
	}
}

function sendRequest() {
	
	//var data = "{ \"login\": \""+$('#login').val()+"\"}";
	var login = $('#login').val()
	$.ajax({
            url: 'https://volt.iem.pw.edu.pl:7777/reset/'+login,
            type: 'GET',
			dataType: 'json',
			success: function(data) {
						if(data.error == "false"){
							alert("Takie konto nie istnieje!");
							location.reload();
							}
						else{
							//;
							get('intro').innerHTML = "<h2>Na twój adres e-mail został wysłany link do zmiany hasła. Przejdź do swojej poczty i postępuj zgodnie z informacjami w wiadomości</h2>";
							setTimeout(function(){window.location.href = 'index.html'}, 5000);
						}
            	
				},
				error: function( data ) {
				alert(data);
				}
    		});
}
function dodajInfo(info, poprzEl, id) {
    if (get(id) === null) {
        var node = document.createElement("Span");
        var text = document.createTextNode(info);
        node.appendChild(text);
        var x = document.getElementById(poprzEl).appendChild(node);
        x.setAttribute("class", "errmes");
        x.id = id;
    } else {
        usunInfo(id, poprzEl);
        dodajInfo(info, poprzEl, id);
    }
}

function usunInfo(idchild, idparent) {
    if (get(idchild) !== null && get(idparent) !== null) {
        var pn = get(idparent);
        var cn = get(idchild);
        pn.removeChild(cn);
    }
}

function get(id) {
    return document.getElementById(id);
}


