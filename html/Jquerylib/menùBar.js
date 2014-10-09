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
		  //inserire if cookie == user, campo vuoto, else esegui modifica e span.
		  modifica();
		  $('span.welcomespan').each(function() {
				$(this).append('<span>, '+user+'     <a href="#" onClick="">esci</a></span>');
		  });
		  $( this ).dialog( "close" );
		},
		Cancel: function() {
		  $( this ).dialog( "close" );
		}
	  },
	  close: function() {
		form[ 0 ].reset();
	  }
	});
/* script ricarica dialog se chiusa*/	
	var form = dialog.find( "form" ).submit(function( event ) {
      modifica();
      dialog.dialog( "close" );
      event.preventDefault();
    });
 
 //implementazione di meta area come una tab JQuery
 var tabs = $( "#metaArea" ).tabs();
 var tabTemplate = "<li><a href='#{href}'>#{label}</a> </li>";
 function modifica(user) {
	        var title = "Modifica";
	        var id = "modifica",
	        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, title ) ),
	        tabContentHtml = "<button type='button' class='btn btn-warning' id='markSentence'>Frase</button><button type='button' class='btn btn-info' id='markMain'>Principale</button><button type='button' class='btn btn-success' id='markSub'>Subordinata</button>";
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
	    	    
	        }     
	        
	      
	    }   
    
   
    
    
/* script implementazione pulsanti*/
  $('#Help').click(function(){
	  alert("Tasto help");
	  });
  $('#About').click(function(){
	  alert("Tasto about");
  	});
  $('#Annotator').click(function(){
	    dialog.dialog( "open" );
  	});
 });
 
 
 
