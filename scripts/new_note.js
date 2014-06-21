function addNote(){
	var login = "test";
	var text = document.getElementById('content').value;
	var data = "{ \"text\": \""+text+"\", \"login\": \""+login+"\"}";
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


