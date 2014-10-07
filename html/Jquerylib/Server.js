

$(document).ready(main);

		function main() {
			$.ajax({
				method: 'GET',
				url: 'database.json',
				success: function(d) {
					for (var i=0; i<d.length; i++) {
						$('#selectable').append("<li class='ui-widget-content' value='"+d[i].url+"'>"+d[i].label+"</li>")
					}	
				},
				error: function(a,b,c) {
					alert('Nessun documento da mostrare')
				}
			});
		}
