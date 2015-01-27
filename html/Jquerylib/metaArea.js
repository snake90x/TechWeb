var tabs;
var IdAnnotationCount = 0;
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
	tabContentHtml = "<div id='metadiv1'><ul id='docTempAnnotation'></ul></div>"+
					  "<div id='metadiv2'><button type='button' class='btn btn-warning' id='markSentence'>Frase</button>"+
					  "<button type='button' class='btn btn-info' id='markMain'>Principale</button>"+
					  "<button type='button' class='btn btn-success' id='markSub'>Subordinata</button>"+
					  "</br>"+
					  "<button type='button' class='btn btn-success' id='save'>Salva Nota</button>"+
					  "<button type='button' class='btn btn-warning' id='saveall'>Salva Tutto</button></div>";
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

function addAnnotation (annotation){
	var active = $("#mainArea").tabs("option", "active"),
	title=$("#mainArea ul>li a").eq(active).html(),
	annotationTemplate = "<li id='#{IdAnnotationCount}'>"+
								"<span class='type'> #{type}</span>"+
								"</br><span class='annlabel'> #{label}</span>"+
								"</br><span class='doc'>#{doc}</span></br>"+
								"<a href='#'><i class='fa fa-floppy-o fa-2x'></i></a>"+"   "+"<a href='#'><i class='fa fa-cog fa-spin fa-2x'></i></a>"+"   "+"<a onclick='deletezzz(this.parentNode)'><i class='fa fa-times fa-2x'></i></a></li>",
	type=annotation.annotations[0].body.label,
	ifdoc=annotation.annotations[0].type,
	label=annotation.annotations[0].label,
	target=title;
	console.log(title);
	console.log(type);
	if(ifdoc=='hasAuthor'){
		type='document';
		label="Annotazione sull' intero documento";
	}
	var li = $( annotationTemplate.replace( /#\{IdAnnotationCount\}/g, "ann" + IdAnnotationCount ).replace( /#\{type\}/g, type ).replace( /#\{label\}/g, label ).replace( /#\{doc\}/g, title));
	$('#docTempAnnotation').append(li);
	IdAnnotationCount++;
}
function deletezzz(x) {
	x.parentNode.removeChild(x);
}