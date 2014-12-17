/*docArea*/

$(function() {
	var result ={};

	$( "#docArea" ).accordion({
		heightStyle: "fill"
	});

	$.ajax({
		method: 'GET',
		url: 'categorie.json',
		success: function(d) {
				result = d;
		},
		error: function(a,b,c) {
			alert('Errore in get del document')
		}

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
				//eseguire la get una sola volta facendogli ritornare il result.
				var type=(".ui-selected", this).getAttribute("id");
				switch(type) {
					    case "document":
					    		var autori=document.getElementById("hasAuthor"),
									publisher=document.getElementById("hasPublisher");
					    		if(autori.options.length == 0 || publisher.options.length==0){
									for (var i=0; i<result.hasAuthor.length; i++) {
										autori.options[autori.options.length] = 
										new Option(result.hasAuthor[i], result.hasAuthor[i]);
									}
									for (var i=0; i<result.hasPublisher.length; i++) {
										publisher.options[publisher.options.length] = 
										new Option(result.hasPublisher[i], result.hasPublisher[i]);
									}
								}
					        break;
					    case "denotes":
					    		var categoria=document.getElementById("denotazione");
					    		if (denotazione.options.length==0) {
									for (var i=0; i<result.denotazione.length; i++) {
										categoria.options[categoria.options.length] = 
										new Option(result.denotazione[i], result.denotazione[i]);
									}
								}
					        break;
					    case "hasSubject":

					    		var sub=document.getElementById("subject");
					    		if (sub.options.length==0) {
									for (var i=0; i<result.subject.length; i++) {
										sub.options[sub.options.length] = 
										new Option(result.subject[i], result.subject[i]);
									}
								}
					    	break;
					}
				$( "#form_"+type ).dialog( "open" );
			});
		},
		disabled:true
	});
});
function addCategory(Categoria, id)
{
	console.log(id);
  $.ajax({
      method: 'GET',
      url: 'categorie.json',
      async:false,
      cache:false,
      success: function(d) {
          result.data = d;
      },
      error: function(a,b,c) {
        alert('Errore in get del document')
      }
  });
  if (Categoria=="Altro...") {
    var input = document.createElement("input"),
        select=document.getElementById(id),
        x = document.createElement("img"),
        v = document.createElement("img");
    x.src="images/icon_x.png";
    x.alt="Annulla";
    $(x).addClass("immagine");
    v.src="images/v-icon.gif";
    v.alt="Conferma";
    $(v).addClass("immagine");
    input.type = "text";
    input.id = "new_"+id;
    input.placeholder = "nuova categoria";
    $(input).insertAfter(select);
    $(v).insertAfter(input);
    $(x).insertAfter(v);
    $(x).click(function(){
      select.disabled = false;
      input.parentNode.removeChild(input);
      this.parentNode.removeChild(v);
      this.parentNode.removeChild(this);
    });
    $(v).click(function(){
      select.disabled = false;
      InviaDati(input.value, 0);
      input.parentNode.removeChild(input);
      this.parentNode.removeChild(x);
      this.parentNode.removeChild(this);
    });
    select.disabled = true;
  }
}
