/* Dialogs */

$(document).ready(function(){

	Date.prototype.yyyymmddhhmm = function() {
		var yyyy = this.getFullYear().toString();
		var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
		var dd  = this.getDate().toString();
		var hh  = this.getHours().toString();
		var ii  = this.getMinutes().toString();
		return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0])    +hh+":"+ii; // padding
    };
	//dialog relative ai widget delle annotazioni
	//dialog annotazioni sul documento
	$( "#form_document").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Conferma: function() { 

				 var active = $("#mainArea").tabs("option", "active"),
				 index=$("#mainArea ul>li a").eq(active).attr('href'),
				 target=("#"+index).getAttribute("value"),
				 select=document.getElementById("hasAuthor"),
				 select1=document.getElementById("hasPublisher"),
				 a = select.value,
				 b = select1.value,
				 c = document.getElementById("hasPublicationYear").value,
				 d = document.getElementById("hasTitle").value,
				 e = document.getElementById("hasAbstract").value,
				 f = document.getElementById("hasShortTitle").value,
				 g = document.getElementById("hasComment").value,
				 time = new Date();
				 user = leggiCookie();
				 time.yyyymmddhhmm();
				 var annotation ={ 
					 annotations:[
						 {
						 	type:"hasAuthor",
						 	label:"Autori",
						 	body:{
						 		label:"Questo articolo ha come autore "+a,
						 		predicate:a
						 	}
						 },{
						 	type:"hasPublisher",
						 	label:"Casa editrice",
						 	body:{
						 		label:"Questo aricolo è stato pubblicato da "+b,
						 		predicate:b
						 	}	
						 },{
						 	type:"hasPublicationYear",
						 	label:"Anno",
						 	body:{
						 		label:"Questo articolo è stato pubblicato nel "+c,
						 		predicate:c
						 	}	
						 },{
						 	type:"hasTitle",
						 	label:"Titolo",
						 	body:{
						 		label:"Articolo: "+d,
						 		predicate:d
						 	}	
						 },{
						 	type:"hasAbstract",
						 	label:"Abstract",
						 	body:{
						 		label:"Abstract",
						 		predicate:e
						 	}	
						 },{
						 	type:"hasShortTitle",
						 	label:"Titoletto",
						 	body:{
						 		label:"Titoletto: "+f,
						 		predicate:f
						 	}	
						 },{
						 	type:"hasComment",
						 	label:"Commento",
						 	body:{
						 		label:"Commento:",
						 		predicate:g
						 	}					
						 }
					 ],
					 target:{
					 	source:target
					 },
					 provenance:{
					 	author:{
					 		name:user[0],
					 		email:user[1]
					 	},
					 	time:time
					 }
				}


 				$( this ).dialog( "close" );
			} 
		},

		close: function() {

			$("#formDoc")[ 0 ].reset();
		}
	});

	$( "#form_denotes").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Conferma: function() {

				var voce=document.getElementById("Info"),
					type=voce.value;
					text=voce.options[voce.selectedIndex].text,
					active = $("#mainArea").tabs("option", "active"),
					index=$("#mainArea ul>li a").eq(active).attr('href'),
					target=("#"+index).getAttribute("value"),
					user = leggiCookie(),
					annotation ={ 
						 annotations:[
							{
								type:type,
								label:"Entità",
								body:{
									label:type,
									predicate:text
								}
							}
						 ],
						 target:{
						 	source:target
						 },
						 provenance:{
						 	author:{
						 		name:user[0],
						 		email:user[1]
						 	},
						 	time:time
						 }
					}				
 				$( this ).dialog( "close" );
			} 
		},

		close: function() {

			$(this).dialog( "close" );
		}
	});

	$( "#form_hasSubject").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Conferma: function() {
				var e = document.getElementById("subject").value;
 				$( this ).dialog( "close" );
			} 
		},

		close: function() {

			$("#formArg")[ 0 ].reset();
		}
	});

	$( "#form_relatesTo").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Conferma: function() { 
 				$( this ).dialog( "close" );
			} 
		},

		close: function() {

			$("#formDBp")[ 0 ].reset();
		}
	});

	$( "#form_quality").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Conferma: function() { 
 				$( this ).dialog( "close" );
			} 
		},

		close: function() {

			$("#formVal")[ 0 ].reset();
		}
	});

	$( "#form_hasComment").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Conferma: function() { 
 				$( this ).dialog( "close" );
			} 
		},

		close: function() {

			$("#formCom")[ 0 ].reset();
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
						scriviCookie(name+' '+surname,email);
						var prova=leggiCookie();
						alert(prova[0] +" "+ prova[1]);
						$( "#docannotation" ).selectable( "option", "disabled", false);
					});
					$( this ).dialog( "close" ); 
				} 
			} 
		},

		close: function() {

			$("#forLogin")[ 0 ].reset();
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
					$( "#docannotation" ).selectable( "option", "disabled", false);
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
});