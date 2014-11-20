/**
 * Crea gli onclick per i bottoni del menù.
 */
 $(document).ready(function(){
 
/* script implementazione pulsanti*/
		$('#Help').click(function(){
			alert("Tasto help");
		});


		$( "#About" ).click(function() {
			$( "#dialogo" ).dialog( "open" );
		});


		$('#Annotator').click(function(){
			$('#login').dialog( "open" );
			
		});


	
		$('#login').keypress(function(e) {
    		if (e.keyCode == $.ui.keyCode.ENTER) {   				
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
						scriviCookie(name+' '+surname);
						alert(leggiCookie());
					});
					$( this ).dialog( "close" ); 
				}
    		}
		});

		// controllo checkbox principali e bottoni,secondarie e form se sono "cecked" allora assegnano il css
		$('#main').click(function() {
			if (this.checked) 
				$('.main').addClass('text-primary')
			else
				$('.main').removeClass('text-primary')
		})
		$('#sub').click(function() {
			if (this.checked) 
				$('.sub').addClass('text-danger')
			else
				$('.sub').removeClass('text-danger')
		})
		$('#sentence').change(function() {
			var v = this.value
			var s = $('.sentence')
			s.removeClass('bg-warning')
			$(s[v-1]).addClass('bg-warning')
		})
});