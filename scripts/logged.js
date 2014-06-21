get('img_form').onsubmit = uploadImage;
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
login = getCookie("username");

function getAllNotes(){
    $('#notestable tbody').html('');
    $('#notestable thead').html('<tr><th>Id</th><th>Data</th></tr>');
    $('#tabtitle').html('All notes:');
    $.ajax({
            url: 'https://volt.iem.pw.edu.pl:7777/notes/'+login,
            type: 'GET',
            dataType: 'json',
			statusCode: {
			500: function(xhr) {
				alert(xhr.responseText);
			}
			},
			success: function(data) {
                $.each(data, function( index ) {
				if (data[index] != null)
					//$('#notestable tbody').append('<tr onclick = \"return showNote\(' + data[index].id +');\"><td>'+data[index].title+'</td><td>'+data[index].category+'</td><td>'+data[index].id+'</td><td>'+data[index].text+'</td><td>'+data[index].tags+'</td></tr>');
					$('#notestable tbody').append('<tr><td>'+index+'</td><td>'+data[index]+'</td></tr>');
				});
		    }
    });

}

function addNote() {
	window.open('new_note.html','Nowa notatka', 'width=1000, height=600');
}

function uploadImage(){
	var img = get('file')
	var myBase64EncodedData  = getBase64Image(img);
		$.ajax({
			type: 'POST',
			url: 'https://volt.iem.pw.edu.pl:7777/photo',
			data: { 
				'imagedata': myBase64EncodedData 
			},
			success: function(msg){
				console.log('posted' + msg);
			}
		});
}

function get(id) {
    return document.getElementById(id);
}
