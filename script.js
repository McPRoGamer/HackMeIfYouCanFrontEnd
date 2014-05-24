document.getElementById('password').onkeyup = f;
	
function f() {
	dodajInfo("Entropia hasła " + entropy(), 'password_err', 'msg');
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
	var haslo = document.getElementById('password').value;
	var i;
	var k = 0;
	var j = 0;
	var stList = haslo.split('');
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
    if (get(idchild) !== null) {
        var pn = get(idparent);
        var cn = get(idchild);
        pn.removeChild(cn);
    }
}

function get(id) {
    return document.getElementById(id);
}