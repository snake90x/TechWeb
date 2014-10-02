<!-- MainArea -->

	<script type="text/javascript">
	$(function() {
	    var tabTitle = $( "#tab_title" ),
	      tabContent = $( "#tab_content" ),
	      tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
	      tabCounter = 2;
	 
	    /*var tabs = $( "#mainArea" ).tabs();*/
	 
	    // modal dialog init: custom buttons and a "close" callback resetting the form inside
	    var dialog = $( "#dialog" ).dialog({
	      autoOpen: false,
	      modal: true,
	      buttons: {
	        Add: function() {
	          addTab();
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
	 
	    // addTab form: calls addTab function on submit and closes the dialog
	    var form = dialog.find( "form" ).submit(function( event ) {
	      addTab();
	      dialog.dialog( "close" );
	      event.preventDefault();
	    });
	 
	    // actual addTab function: adds new tab using the input from the form above
	    function addTab() {
	      var label = tabTitle.val() || "Tab " + tabCounter,
	        id = "tabs-" + tabCounter,
	        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
	        tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";
	 
	      tabs.find( ".ui-tabs-nav" ).append( li );
	      tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
	      tabs.tabs( "refresh" );
	      tabCounter++;
	    }
	 
	    // addTab button: just opens the dialog
	    $( "#add_tab" )
	      .button()
	      .click(function() {
	        dialog.dialog( "open" );
	      });
	 
	    // close icon: removing the tab on click
	   /* tabs.delegate( "span.ui-icon-close", "click", function() {
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
	  });*/
	
	</script>
	
<!-- 	MenùBar -->
/*
	<script>
	 $(document).ready(function(){
	  $('#Help').click(function(){
		  alert("Tasto help");
		  });
	  $('#About').click(function(){
		  alert("Tasto about");
	  	});
	  $('#Annotator').click(function(){
		  alert("Tasto annotator");
	  	});
	 });
	  
	</script>
  */
  
  
<!--   DocArea -->
/*
	<script>
	 $(function() {
	   $( "#docArea" ).accordion();
	 });
	</script>
	
	<script>
		  $(function() {
		    $( "#selectable" ).selectable({
		      stop: function() {
		        var result = $( "#select-result" ).empty();
		        $( ".ui-selected", this ).each(function() {
		          var index = $( "#selectable li" ).index( this );
		          result.append( " #" + ( index + 1 ) );
		        });
		      }
		    });
		  });
  </script>
  */

<!-- MetaArea -->

/*	<script type="text/javascript">
		$(function() {
		    $( "#metaArea" ).accordion({
		      heightStyle: "fill"
		    });
		  });
	</script>
*/
