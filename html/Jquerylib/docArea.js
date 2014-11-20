/*docArea*/

$(function() {

	$( "#docArea" ).accordion({
		heightStyle: "fill"
	});

	$( "#doclist" ).selectable({
		stop: function() {
			$( ".ui-selected", this ).each(function() {
				var index = $( "#doclist li" ).index( this );
				(".ui-selected", this).setAttribute("id", index.toString());
				var url =  "annotaria-td/"+(".ui-selected", this).getAttribute("value");
				addTab(url,index);
				load(index);
			});
		}
	});
	$( "#docannotation" ).selectable({
		stop: function() {
			$( ".ui-selected", this ).each(function() {
				//ogni elemento della lista aprirà la dialog corrispondente al tipo di annotazione
				var type=(".ui-selected", this).getAttribute("id");
				$( "#form_"+type ).dialog( "open" );
			});
		}
	});
});
