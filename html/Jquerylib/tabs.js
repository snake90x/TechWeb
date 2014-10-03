/**
 * crea e gestisce le funzioni della struttura tabs
 */
$(function(){
    var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
    
	
	var tabs = $( "#mainArea" ).tabs();
	
	function addTab(index) {
	      var label =  $('#'+index).value(),
	        id = "tabs-" + index,
	        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
	        tabContentHtml = "<iframe id= 'Doc-"+index+"' class='Doc' src='annotaria-td\""+label +"></iframe>";
	 
	      tabs.find( ".ui-tabs-nav" ).append( li );
	      tabs.append( "<div id='" + id + "'>" + tabContentHtml + "</div>" );
	      tabs.tabs( "refresh" );
	    }
	
	// close icon: removing the tab on click
    tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    tabs.bind( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
})