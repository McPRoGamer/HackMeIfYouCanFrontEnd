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
	
	var mail = get('email').value;
	mail = replaceAll(mail);
	if (mail.length == 0 || mail.indexOf("@") == -1){
		dodajInfo("Podaj poprawny adres e-mail", 'mail_err', 'mail_msg');
	} else if( mail.indexOf("select") > -1 || mail.indexOf("SELECT") > -1 || mail.indexOf("where") > -1 || mail.indexOf("WHERE") > -1) {
		dodajInfo("Sql injection? Not this time.", 'mail_err', 'mail_msg');
	} else if( mail.indexOf("document") > -1 || mail.indexOf("script") > -1 || mail.indexOf("onclick") > -1 || mail.indexOf("onload") > -1) {
		dodajInfo("XSS? Not this time.", 'mail_err', 'mail_msg');
	
	}else {
		usunInfo('mail_msg', 'mail_err');
		sendRequest();
	}
}

function sendRequest() {
	
	var data = "{ \"email\": \""+$('#email').val()+"\"}";
	
	$.ajax({
            url: 'https://volt.iem.pw.edu.pl:7777/register',
            type: 'POST',
			data: data,
			dataType: 'json',
			cache: false,
			crossDomain: true,
			processData: true,
	     	success: function(data) {
					$.each(data, function( ) {		
						if(data.error == false){
							alert("Takie konto nie istnieje!");
							location.reload();
							}
						else
							//window.location.href = 'index.html';
							get('intro').innerHTML = "<h2>Na teój adres e-mail zosta³ wys³any link do zmiany has³a. PrzejdŸ ndo swojej poczty i postêpuj zgodnie z informacjami w wiadomoœci</h2>";
						
            	});
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


