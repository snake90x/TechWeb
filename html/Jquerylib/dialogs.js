/* Dialogs */

$(document).ready(function(){
	//dialog relative ai widget delle annotazioni
	//dialog annotazioni sul documento
	$( "#form_document").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Conferma: function() { 
 				$( this ).dialog( "close" );
			} 
		},

		close: function() {

			$( this ).dialog( "close" );
		}
	});

	$( "#login" ).dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Log: function() { 
				var name = document.getElementById('name').value;
				var surname = document.getElementById('surname').value;
				var email = document.getElementById('email').value;
				if(name=="" ||surname=="" || email=="") {
					alert("Nome non valido")
				}
				else{
					document.getElementById('Annotator').disabled = 'disabled';
					modifica();
					$('span.welcomespan').each(function() {
						$(this).append('<span>, '+name+' '+surname+'     <a href="#" onClick="cancellaCookie()">esci</a></span>');
						scriviCookie(name+' '+surname);
						alert(leggiCookie());
					});
					$( this ).dialog( "close" ); 
				} 
			} 
		},

		close: function() {

			form_login[ 0 ].reset();
		}
	});

	$('#login').keypress(function(e) {
		if (e.keyCode == $.ui.keyCode.ENTER) {   				
			var name = document.getElementById('name').value;
			var surname = document.getElementById('surname').value;
			var email = document.getElementById('email').value;
			if(name=="" ||surname=="" || email=="") {
				alert("Nome non valido")
			}
			else{

				document.getElementById('Annotator').disabled = 'disabled';
				modifica();
				$('span.welcomespan').each(function() {
					$(this).append('<span>, '+name+' '+surname+'     <a href="#" onClick="cancellaCookie()">esci</a></span>');
					scriviCookie(name+' '+surname);
					alert(leggiCookie());
				});
				$( this ).dialog( "close" ); 
			}
		}
	});	

	/* script implementazione about box*/
	$( "#dialogo" ).dialog({
		autoOpen: false,
		show: {
			effect: "blind",
			duration: 1000
		},
		hide: {
			effect: "explode",
			duration: 1000
		}
	});

	// script ricarica dialog se chiusa	
	var form_login = $('#login').find( "form" ).submit(function( event ) {
		$('#login').dialog( "close" );
		event.preventDefault();
	});

});