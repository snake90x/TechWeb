var tabs;
$(document).ready(function(){
/* implementazione di meta area come una tab JQuery*/
	tabs = $( "#metaArea" ).tabs({
	    activate: function(event, ui) {
			controllotab();
		}
	});
});
function modifica() {
	var tabTemplate = "<li><a href='#{href}' data-toggle='tab' id='showNew'>#{label}</a> </li>";
	var title = "Nuove Annotazioni";
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