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
		resizable: false,
		draggable: false,
		modal: true,
		buttons: {
			Conferma: function() { 

				 var active = $("#mainArea").tabs("option", "active"),
				 index=$("#mainArea ul>li a").eq(active).attr('href'),
				 target=$(index).attr("value"),
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
					 	//time:time
					 }
				}


 				$( this ).dialog( "close" );
			} 
		},
		open: function() {
		    $("#form_document").keypress(function(e) {
		      if (e.keyCode == $.ui.keyCode.ENTER) {
		        $(this).parent().find("button:eq(1)").trigger("click");
		      }
		    });
  		},
		close: function() {

			$("#formDoc")[ 0 ].reset();
		}
	});

//Widget per le annotazioni sui frammenti

//widget per le entità
	$( "#form_denotes").dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		buttons: {
			Conferma: function() {
				var voce=document.getElementById("Info"),
					nota=document.getElementById("denotazione"),
					label=nota.options[nota.selectedIndex].text
					type=voce.value,
					text=voce.options[voce.selectedIndex].text,
					active = $("#mainArea").tabs("option", "active"),
					index=$("#mainArea ul>li a").eq(active).attr('href'),
					target=$(index).attr("value"),
					user = leggiCookie(),
					annotation ={ 
						 annotations:[
							{
								type:type,
								label:"Entità",
								body:{
									label:label,
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
						 	//time:time
						 }
					}	
				addAnnotation(annotation);		
 				$( this ).dialog( "close" );
			} 
		},
		open: function() {
		    $("#form_denotes").keypress(function(e) {
		      if (e.keyCode == $.ui.keyCode.ENTER) {
		        $(this).parent().find("button:eq(1)").trigger("click");
		      }
		    });
  		},
		close: function() {

			$(this).dialog( "close" );
		}
	});
//widget per gli argomenti trattati
	$( "#form_hasSubject").dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		buttons: {
			Conferma: function() {
				var sub = document.getElementById("subject"),
				type=sub.options[sub.selectedIndex].value,
				text=sub.options[sub.selectedIndex].text,
				active = $("#mainArea").tabs("option", "active"),
				index=$("#mainArea ul>li a").eq(active).attr('href'),
				target=$(index).attr("value"),
				user = leggiCookie(),
				annotation ={ 
						 annotations:[
							{
								type:type,
								label:"Soggetto",
								body:{
									label:"La selezione tratta:",
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
						 	//time:time
						 }
					};
				console.log(type,text)
 				$( this ).dialog( "close" );
			} 
		},
		open: function() {
		    $("#form_hasSubject").keypress(function(e) {
		      if (e.keyCode == $.ui.keyCode.ENTER) {
		        $(this).parent().find("button:eq(1)").trigger("click");
		      }
		    });
  		},
		close: function() {

			$("#formArg")[ 0 ].reset();
		}
	});
//widget per i collegamenti DBPedia
	$( "#form_relatesTo").dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,resizable: false,
		modal: true,
		buttons: {
			Conferma: function() { 
				var db= document.getElementById("linkDB"),
				type=db.getAttribute("name"),
				text=db.value,
				active = $("#mainArea").tabs("option", "active"),
				index=$("#mainArea ul>li a").eq(active).attr('href'),
				target=$(index).attr("value"),
				user = leggiCookie(),
				annotation ={ 
						 annotations:[
							{
								type:type,
								label:"DBPedia",
								body:{
									label:"Collegamento DBPedia:",
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
						 	//time:time
						 }
					};
				console.log(type,text);
 				$( this ).dialog( "close" );
			} 
		},
		open: function() {
		    $("#form_relatesTo").keypress(function(e) {
		      if (e.keyCode == $.ui.keyCode.ENTER) {
		        $(this).parent().find("button:eq(1)").trigger("click");
		      }
		    });
  		},
		close: function() {

			$("#formDBp")[ 0 ].reset();
		}
	});
//widget di valutazione della qualità
	$( "#form_quality").dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		buttons: {
			Conferma: function() { 
				var chiarezza = $('input[name="hasClarityScore"]:checked').val(),
					originalita = $('input[name="hasOriginalityScore"]:checked').val(),
					presentazione = $('input[name="hasFormattingScore"]:checked').val(),
					active = $("#mainArea").tabs("option", "active"),
					index=$("#mainArea ul>li a").eq(active).attr('href'),
					target=$(index).attr("value"),
					user = leggiCookie(),
					annotation ={ 
						 annotations:[
							{
								type:"hasClarityScore",
								label:"Chiarezza",
								body:{
									label:"Valutato:",
									predicate:chiarezza
								}
							},
							{
								type:"hasOriginalityScore",
								label:"Originalità",
								body:{
									label:"Valutato:",
									predicate:originalita
								}
							},
							{
								type:"hasFormattingScore",
								label:"Presentazione",
								body:{
									label:"Valutato:",
									predicate:presentazione
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
						 	//time:time
						 }
					};
 				$( this ).dialog( "close" );
 				console.log(chiarezza,originalita,presentazione);
			} 
		},
		open: function() {
		    $("#form_quality").keypress(function(e) {
		      if (e.keyCode == $.ui.keyCode.ENTER) {
		        $(this).parent().find("button:eq(1)").trigger("click");
		      }
		    });
  		},
		close: function() {

			$("#formVal")[ 0 ].reset();
		}
	});
//widget per i commenti
	$( "#form_hasComment").dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		buttons: {
			Conferma: function() { 
				var text = document.getElementById("frag_hasComment").value,
				active = $("#mainArea").tabs("option", "active"),
				index=$("#mainArea ul>li a").eq(active).attr('href'),
				target=$(index).attr("value"),
				user = leggiCookie(),
				annotation ={ 
						 annotations:[
							{
								type:"frag_hasComment",
								label:"Commento:",
								body:{
									label:"Il tuo commento:",
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
						 	//time:time
						 }
					};
				console.log(text);
 				$( this ).dialog( "close" );
			} 
		},
		open: function() {
		    $("#form_hasComment").keypress(function(e) {
		      if (e.keyCode == $.ui.keyCode.ENTER) {
		        $(this).parent().find("button:eq(1)").trigger("click");
		      }
		    });
  		},
		close: function() {

			$("#formCom")[ 0 ].reset();
		}
	});
//widget per le citazioni
	$( "#form_cites").dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		height:"auto",
		width: "auto",	
		modal: true,
		 hide: { effect: "shake", duration: 600 ,times: 1},
		buttons: {
			Conferma: function() { 
				var text = document.getElementById("auto_doc").value,
				active = $("#mainArea").tabs("option", "active"),
				index=$("#mainArea ul>li a").eq(active).attr('href'),
				target=$(index).attr("value"),
				user = leggiCookie(),
				annotation ={ 
						 annotations:[
							{
								type:"cites",
								label:"Citazione",
								body:{
									label:"Articolo citato:",
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
						 	//time:time
						 }
					};
				console.log(text);
 				$( this ).dialog( "close" );
			} 
		},
		open: function() {
		    $("#form_cites").keypress(function(e) {
		      if (e.keyCode == $.ui.keyCode.ENTER) {
		        $(this).parent().find("button:eq(1)").trigger("click");
		      }
		    });
  		},
		close: function() {

			$("#formCom")[ 0 ].reset();
		}
	});

	//console.log(list_docs)

	$( "#auto_doc" ).autocomplete({
      source: list_docs
    });
//finestra di login
	$( "#login" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
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
		open: function() {
		    $("#login").keypress(function(e) {
		      if (e.keyCode == $.ui.keyCode.ENTER) {
		        $(this).parent().find("button:eq(1)").trigger("click");
		      }
		    });
  		},
		close: function() {

			$("#forLogin")[ 0 ].reset();
		}
	});

	/* script implementazione about box*/
	$( "#dialogo" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
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