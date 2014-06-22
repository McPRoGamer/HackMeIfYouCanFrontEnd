var submit = false;

//get('password').onkeyup = passwordCheck;
get('submit').onclick = check;

//get('register').onclick = sendRegister;	

	
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

	var passwd = get('password').value;
	passwd = replaceAll(passwd);

	if( login.indexOf(" ") > -1){
		dodajInfo("Login nie może zawierać spacji.", 'login_err', 'login_msg');
	} else if( login.length < 4) {
		dodajInfo("Login musi być dłuższy niż 4 znaki.", 'login_err', 'login_msg');
	} else if( login.length > 64) {
		dodajInfo("Login musi być niedłuższy niż 64 znaki.", 'login_err', 'login_msg');
	} else if( login.indexOf("select") > -1 || login.indexOf("SELECT") > -1 || login.indexOf("where") > -1 || login.indexOf("WHERE") > -1) {
		dodajInfo("Sql injection? Not this time.", 'login_err', 'login_msg');
	} else if( login.indexOf("document") > -1 || login.indexOf("script") > -1 || login.indexOf("onclick") > -1 || login.indexOf("onload") > -1) {
		dodajInfo("XSS? Not this time.", 'login_err', 'login_msg');
	} else if( passwd.indexOf("select") > -1 || passwd.indexOf("SELECT") > -1 || login.indexOf("where") > -1 || login.indexOf("WHERE") > -1) {
		dodajInfo("Sql injection? Not this time.", 'password_err', 'msg');
	} else if( passwd.length < 8) {
		usunInfo('msg', 'password_err');
		dodajInfo("Hasło musi być dłuższe niż 8 znaków.", 'password_err', 'msg');
	} else if( passwd.length > 64) {
		usunInfo('msg', 'password_err');
		dodajInfo("Hasło musi być niedłuższe niż 64 znaki.", 'password_err', 'msg');
	} else if( passwd.indexOf("select") > -1 || passwd.indexOf("SELECT") > -1 || passwd.indexOf("where") > -1 || passwd.indexOf("WHERE") > -1) {
		usunInfo('msg', 'password_err');
		dodajInfo("Sql injection? Not this time.", 'password_err', 'msg');
	} else if( passwd.indexOf("document") > -1 || passwd.indexOf("script") > -1 || passwd.indexOf("onclick") > -1 || passwd.indexOf("onload") > -1) {
		usunInfo('msg', 'password_err');
		dodajInfo("XSS? Not this time.", 'password_err', 'msg');
	} else if( passwd.indexOf("select") > -1 || passwd.indexOf("SELECT") > -1 || passwd.indexOf("where") > -1 || passwd.indexOf("WHERE") > -1) {
		usunInfo('msg', 'password_err');
		dodajInfo("Sql injection? Not this time.", 'password_err', 'msg');
	}else {
		usunInfo('login_msg', 'login_err');
		usunInfo('msg', 'password_err');
		sendRequest();
	}
}

window.onload=function(){
	var data = "{ \"sessionID\" : \""+getCookie('sessionID')+"\"}";
	$.ajax({
			type: 'POST',
			url: 'https://volt.iem.pw.edu.pl:7777/islogged',
			data: data,
			dataType: 'json',
			success: function(msg){
				
				//console.log('posted' + msg);
				if (msg.logged == true){
					window.location.href = 'logged.html';
					
				}
			},
			error: function( data ) {
				alert("Internal server error");
			}
		});
};

function sendRequest() {
	var data = "{ \"login\" : \""+$('#login').val()+"\", \"password\": \""+$('#password').val()+"\"}";
	$.ajax({
            url: 'https://volt.iem.pw.edu.pl:7777/login',
            type: 'POST',
			data: data,
			dataType: 'json',
			cache: false,
			crossDomain: true,
			processData: true,
	     	success: function(data) {
						
						if(data.logged == false){
							alert("Błędny login i/lub hasło");
							location.reload();
							}
						else{
							document.cookie="username="+data.login ;
							document.cookie="sessionID="+data.sessionID ;
							window.location.href = 'logged.html';
						}
            },
				error: function( data ) {
				alert("Internal server error");
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

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function get(id) {
    return document.getElementById(id);
}
