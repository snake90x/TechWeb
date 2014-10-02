/**rende il div "#docArea" e "#metaArea" degli accordion jQuery
 * 
 */

/*docArea*/
$(function() {
	   $( "#docArea" ).accordion();
});
//funzione addTab aggiunge una nuova tab al momento del click

$(function() {
    $( "#selectable" ).selectable({
      
    	stop: function() {
        $( ".ui-selected", this ).each(function() {
          var index = $( "#selectable li" ).index( this );
          $(".ui-selected").attr('id', index+1);
          
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