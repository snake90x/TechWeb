/**
 * Crea gli onclick per i bottoni del menù.
 */
 
	$(document).ready(function(){


		
/* script implementazione dialog box*/
	var dialog = $( "#dialog" ).dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Log: function() { 
				var user = document.getElementById('username').value;
				if(user=="" || user=="Name"){
					alert("Username non valido")
				}
				else{
					document.getElementById('Annotator').disabled = 'disabled';
					modifica();
					$('span.welcomespan').each(function() {
						$(this).append('<span>, '+user+'     <a href="#" onClick="cancellaCookie()">esci</a></span>');
						scriviCookie(user);
						alert(user);
						leggiCookie(user);
					});
					$( this ).dialog( "close" ); 
				} 
			} 
		},

		close: function() {
			
			form[ 0 ].reset();
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
	var form = dialog.find( "form" ).submit(function( event ) {
      		dialog.dialog( "close" );
      		event.preventDefault();
    });

 
/* implementazione di meta area come una tab JQuery*/
	 var tabs = $( "#metaArea" ).tabs({
        activate: function(event, ui) {
			controllotab();
        
    }
});
	 var tabTemplate = "<li><a href='#{href}' data-toggle='tab' id='showEdit'>#{label}</a> </li>";
	 function modifica() {
				var title = "Modifica";
				var id = "modifica",
				li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, title ) ),
				tabContentHtml = "<button type='button' class='btn btn-warning' id='markSentence'>Frase</button>"+
								  "<button type='button' class='btn btn-info' id='markMain'>Principale</button>"+
								  "<button type='button' class='btn btn-success' id='markSub'>Subordinata</button>"+
								  "</br>"+
								  "<button type='button' class='btn btn-success' id='save'>Salva Nota</button>"+
								  "<button type='button' class='btn btn-warning' id='saveall'>Salva Tutto</button>";
				var tabNameExists = false;
				$('#metaArea ul li a').each(function(i) {
					if (this.text == title) {
						tabNameExists = true;
					} 
				});
				
				if (tabNameExists == false){
					tabs.find( ".ui-tabs-nav" ).append( li );
					tabs.append( "<div id='" + id + "'>" + tabContentHtml + "</div>" );
					tabs.tabs( "refresh" );
					tabs.tabs( "option", "active", -1 );

				$('#markSentence').click(function() {
					// recupero la tab corrente tramite href 
					var idd,subs;
					var active = $("#mainArea").tabs("option", "active");
             		idd=$("#mainArea ul>li a").eq(active).attr('href');
             		subs=idd.substring(6);
             		console.log(idd);
             		console.log(subs);
					addNote('sentence',subs)
				})
				$('#markMain').click(function() {
					// recupero la tab corrente tramite href 
					var idd,subs;
					var active = $("#mainArea").tabs("option", "active");
             		idd=$("#mainArea ul>li a").eq(active).attr('href');
             		subs=idd.substring(6);
             		console.log(idd);
             		console.log(subs);
					addNote('main',subs)
				})
				$('#markSub').click(function() {
					// recupero la tab corrente tramite href 
					var idd,subs;
					var active = $("#mainArea").tabs("option", "active");
             		idd=$("#mainArea ul>li a").eq(active).attr('href');
             		subs=idd.substring(6);
             		console.log(idd);
             		console.log(subs);
					addNote('sub',subs)
				})
				$('#save').click(function() {
					var active = $("#mainArea").tabs("option", "active");
             		idd=$("#mainArea ul>li a").eq(active).attr('href');
             		subs=idd.substring(6);
					saveNotes(subs,true)
				})
				$('#saveall').click(function() {
					saveNotes(666,false)
				})
				}     
			}   
    
   
 
/* script implementazione pulsanti*/
		$('#Help').click(function(){
			alert("Tasto help");
		});


		$( "#About" ).click(function() {
			$( "#dialogo" ).dialog( "open" );
		});


		$('#Annotator').click(function(){
			dialog.dialog( "open" );
			
		});


	
		$('#dialog').keypress(function(e) {
    		if (e.keyCode == $.ui.keyCode.ENTER) {   				
				var user = document.getElementById('username').value;
				if(user=="" || user=="Name"){
					alert("Username non valido")
				}
				else{
					document.getElementById('Annotator').disabled = 'disabled'; 
					modifica();
					$('span.welcomespan').each(function() {
						$(this).append('<span>, '+user+'     <a href="#" onClick="cancellaCookie()">esci</a></span>');
						scriviCookie(user);
						alert(user);
						leggiCookie(user);
					});
					$( this ).dialog( "close" );
				}
    		}
		});




	});
 
 
 
