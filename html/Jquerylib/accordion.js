/**rende il div "#docArea" e "#metaArea" degli accordion jQuery
 * 
 */

/*docArea*/
$(function() {
	   $( "#docArea" ).accordion({
		   heightStyle: "fill"
	   });
});
//funzione addTab aggiunge una nuova tab al momento del click

$(function() {
	
	var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
    
	
	var tabs = $( "#mainArea" ).tabs();
	
	function addTab(index) {
			//alert(index.toString());
	        var label =  document.getElementById(index.toString()).getAttribute("value");
	        //alert(label);
	        var id = "tabs-" + index.toString(),
	        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
	        tabContentHtml = '<iframe id="Doc-'+index.toString()+'" class="Doc" src="annotaria-td\\'+label+'"></iframe>';
	        var tabNameExists = false;
	        //alert(tabContentHtml);
	        $('#mainArea ul li a').each(function(i) {
	            if (this.text == label) {
	                tabNameExists = true;
	           //     alert(tabNameExists);
	            } 
	        });
	        
	        if (tabNameExists == false){
	        	tabs.find( ".ui-tabs-nav" ).append( li );
	    	    tabs.append( "<div id='" + id + "'>" + tabContentHtml + "</div>" );
	    	    tabs.tabs( "refresh" );
	    	    tabs.tabs( "option", "active", -1 );
	    	    
	        }
	        
          
	      
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
	
    $( "#selectable" ).selectable({
      
    	stop: function() {
        $( ".ui-selected", this ).each(function() {
          var index = $( "#selectable li" ).index( this );
          index=index+1;
          (".ui-selected", this).setAttribute("id", index.toString());
          addTab(index);
        });
      }
    });
 });

/*metaArea*/
$(function() {
    $( "#metaArea" ).accordion({
      heightStyle: "fill"
    });
 });
