var submit = false;

get('password').onkeyup = passwordCheck;
get('register').onclick = check;	

	
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
	
	var passwd2 = get('password2').value;
	passwd2 = replaceAll(passwd2);
	
	var mail = get('email').value;
	mail = replaceAll(mail);
	
	var name = get('name').value;
	name = replaceAll(name);
	
	var surname = get('surname').value;
	surname = replaceAll(surname);

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
	} else if( passwd != passwd2 ){
		usunInfo('msg', 'password_err');
		dodajInfo("Password and Confirm password does not match!", 'password_err', 'msg');
	} else if( mail.indexOf("select") > -1 || mail.indexOf("SELECT") > -1 || mail.indexOf("where") > -1 || mail.indexOf("WHERE") > -1) {
		dodajInfo("Sql injection? Not this time.", 'mail_err', 'mail_msg');
	} else if( mail.indexOf("document") > -1 || mail.indexOf("script") > -1 || mail.indexOf("onclick") > -1 || mail.indexOf("onload") > -1) {
		dodajInfo("XSS? Not this time.", 'mail_err', 'mail_msg');
		
	} else if( name.indexOf("select") > -1 || name.indexOf("SELECT") > -1 || name.indexOf("where") > -1 || name.indexOf("WHERE") > -1) {
		dodajInfo("Sql injection? Not this time.", 'name_err', 'name_msg');
	} else if( name.indexOf("document") > -1 || name.indexOf("script") > -1 || name.indexOf("onclick") > -1 || name.indexOf("onload") > -1) {
		dodajInfo("XSS? Not this time.", 'name_err', 'name_msg');
	
	} else if( surname.indexOf("select") > -1 || surname.indexOf("SELECT") > -1 || surname.indexOf("where") > -1 || surname.indexOf("WHERE") > -1) {
		dodajInfo("Sql injection? Not this time.", 'surname_err', 'surname_msg');
	} else if( surname.indexOf("document") > -1 || surname.indexOf("script") > -1 || surname.indexOf("onclick") > -1 || surname.indexOf("onload") > -1) {
		dodajInfo("XSS? Not this time.", 'surname_err', 'surname_msg');
	
	}else {
		usunInfo('login_msg', 'login_err');
		usunInfo('msg', 'password_err');
		sendRequest();
	}
}

function sendRequest() {
	
	var data = "{ \"login\" : \""+$('#login').val()+"\", \"password\": \""+$('#password').val()+"\", \"email\": \""+$('#email').val()+"\", \"name\": \""+$('#name').val()+"\", \"surname\": \""+$('#surname').val()+"\"}";
	
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
						if(data.registred == false){
							alert("Takie konto juz istnieje!");
							location.reload();
							}
						else
							window.location.href = 'index.html';
						
            	});
				},
				error: function( data ) {
				alert(data);
				}
    		});
}
function passwordStrength( password ) {
	var special = /^[~!@#$%^&*()_+{}|:"<>?]$/;
	var small = /^[a-z]$/;
	var big = /^[A-Z]$/;
	var strength;
	var i;
	var numbersCount = 0;
	var specialCount = 0;
	var containsBigChar;
	var containsSmallChar;
	strength = password.length * 4;
	
	for( i = 0; i < password.length; i++ ) {
		if( !isNaN(password[i])) {
			numbersCount++;
		}
		else if( special.test(password[i]) ){
			specialCount++;
		}
		
		if( big.test(password[i]) ) {
			containsBigChar = true;
		}
		else if( small.test( password[i]) ) {
			containsSmallChar = true;
		}	
	}
	
	if(containsSmallChar && containsBigChar) {
		strength += 15;
	}
	if( specialCount > 2) {
		strength += 10;
	}
	if(numbersCount > 2) {
		strength += 10;
	}
	if( numbersCount != 0 && specialCount != 0 ) {
		strength += 20;
	}
	if(numbersCount == 0) {
		strength -= 15;
	}
	if(specialCount == 0) {
		strength -=15;
	}
	
	if( 10 <= strength && strength < 20 ) {
		return 1;
	}
	else if( 20 <= strength && strength < 40){
		return 2;
	}
	else if( 40 <= strength && strength < 60){
		return 3;
	}else if( 60 <= strength && strength < 80){
		return 4;
	} else if( 80 <= strength ){
		return 5;
	} else {
		return 0;
	}
}


function passwordCheck() {
	get('meter').value = passwordStrength( get('password').value);
	//dodajInfo("Entropia hasła " + entropy() + ".", 'password_err', 'password_msg');
}

function containsElement(array, element) {
	var i;
	for( i = 0; i < array.length; i++) {
		if( array[i] == element) {
			return true;
		}
	}
	return false;
}

function log2(x) {
  return Math.log(x) / Math.LN2;
}

function entropy() {
	var password = document.getElementById('password').value;
	var i;
	var k = 0;
	var j = 0;
	var stList = password.split('');
	var alphabet = [];
	for( i = 0; i < stList.length; i++ ) {
		if( containsElement(alphabet, stList[i]) == false ) {
			alphabet[k] = stList[i];
			k++;
		}
	}
	var freqList = [];
	var ctr;
	for( i = 0; i < alphabet.length; i ++ ){
		ctr = 0.0;
		for( k = 0; k < stList.length; k++){
			if(stList[k] == alphabet[i])
				ctr = ctr + 1;
		}
		freqList[j] = ctr / stList.length;
		j = j + 1;
	}
	var ent = 0;
	for( i = 0; i < freqList.length; i++)
		ent = ent + freqList[i] * log2(freqList[i]);
	ent = ent * -1;
	return ent;
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
