function addNote(){
	var sessionID = getCookie("sessionID");
	var login = getCookie("username")
	var text = document.getElementById('content').value;
	var data = "{ \"text\": \""+text+"\", \"sessionID\": \""+sessionID+"\", \"login\": \""+login+"\"}";
	$.ajax({
            url: 'https://volt.iem.pw.edu.pl:7777/notes/',
            type: 'POST',
            data: data,
			dataType: 'json',
			statusCode: {
			500: function(xhr) {
				alert(xhr.responseText);
			},
			200: function(xhr) {
				window.close('new_note.html');
			},
			400: function(xhr) {
				alert('Bledne zapytanie');
			}
            }
		    
    });
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

