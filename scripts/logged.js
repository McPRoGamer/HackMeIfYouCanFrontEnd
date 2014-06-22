login = getCookie("username");

//get('upload').onsubmit = uploadImage;
get('logout').onclick = logout;
// get('file_form').action= "https://volt.iem.pw.edu.pl:7777/upload/"+login


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


function getAllNotes(){
    $('#notestable tbody').html('');
    $('#notestable thead').html('<tr><th>Id</th><th>Data</th></tr>');
    $('#tabtitle').html('All notes:');
    $.ajax({
            url: 'https://volt.iem.pw.edu.pl:7777/notes/'+login,
            type: 'GET',
            dataType: 'json',
			statusCode: {
			404: function(xhr) {
				alert('Twoja sesja wygasła');
				delete_cookie("username");
				delete_cookie("sessionID");
				window.location.href = '/';
			},
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

// function uploadImage(){
	// var img = get('file')
	// var myBase64EncodedData  = getBase64Image(img);
	// var data = "{ \"data\" : \""+myBase64EncodedData+"\"}";
	// debugger;
		// $.ajax({
			// type: 'POST',
			// url: 'https://volt.iem.pw.edu.pl:7777/file',
			// data: data,
			// dataType: 'json',
			// success: function(msg){
				// console.log('posted' + msg);
			// }
		// });
// }

// function  uploadImage() {
    // var formData = new FormData();
    // var target = 'https://volt.iem.pw.edu.pl:7777/file'
    // formData.append("file", document.getElementById("file").files[0]);
    // var xhr = new XMLHttpRequest();
    // var eventSource = xhr.upload || xhr;
    // eventSource.addEventListener("progress", function(e){
        // var current = e.loaded || e.position ;
        // var total = e.total || e.totalSize;
        // var percant = parseInt((current/total)*100, 10);
        // // DO whatever you want with progress
    // });
    // xhr.open("POST", target, true);
    // xhr.send(formData);
    // xhr.onload = function() {
        // if (this.status === 200)
			// alert("success");
            // // SUCCESS
    // };
// }

 
function uploadImage(){
            
         }
		 
		 
function logout(){
		var data = "{ \"sessionID\" : \""+getCookie('sessionID')+"\"}";
		$.ajax({
			type: 'POST',
			url: 'https://volt.iem.pw.edu.pl:7777/logout',
			data: data,
			dataType: 'json',
			success: function(msg){
				//console.log('posted' + msg);
				if (msg.result == false){
					alert("Taka sesja nie istnieje, popsułeś ciasteczko....");
				}
				delete_cookie("username");
				delete_cookie("sessionID");
				window.location.href = '/';
				
			},
			error: function( data ) {
				alert("Internal server error");
			}
		});
	delete_cookie("username");
	delete_cookie("sessionID");
	
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
				if (msg.logged == false){
					delete_cookie("username");
					delete_cookie("sessionID");
					window.location.href = '/';
				}
			},
			error: function( data ) {
				alert("Internal server error");
			}
		});
};

function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function get(id) {
    return document.getElementById(id);
}
