// caricamento del database tramite un file json che contiene i documenti con i propri riferimenti

// gestione dell'inserimento,salvataggio e visualizzazione delle annotazioni

var notes = {} ; //struttura dati nota
var mode = 'view' //modalità modifica o visualizza
var pathnote=[];

$(document).ready(main);

		function main() {
			$.ajax({
				method: 'GET',
				url: 'database.json',
				success: function(d) {
					for (var i=0; i<d.length; i++) {
						$('#selectable').append("<li class='ui-widget-content' value='"+d[i].url+"'>"+d[i].label+"</li>")
						pathnote[i]=d[i].notes;
					}	
				},
				error: function(a,b,c) {
					alert('Nessun documento da mostrare')
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
	$('#markSentence').click(function() {
		addNote('sentence')
	})
	$('#markMain').click(function() {
		addNote('main')
	})
	$('#markSub').click(function() {
		addNote('sub')
	})
	$('#markSub').click(function() {
		addNote('sub')
	})
	$('#save').click(function() {
		saveNotes()
	})
	
	
	
	/* se è aperta la tab edit passa alla modalità edit in cui sono visualizzate le classi css(per colorare), altrimenti passa alla 
	 modalità view e le rimuove*/
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if (e.target.id=='modifica') {
			mode = 'edit'
			$('.sentence').addClass('edit-sentence')
			$('.main').addClass('edit-main')
			$('.sub').addClass('edit-sub')
		} else {
			mode = 'view'
			$('.sentence').removeClass('edit-sentence')
			$('.main').removeClass('edit-main')
			$('.sub').removeClass('edit-sub')
		}
	})
	
}

// funzioni richiamate e utilizzate all'interno di main

// carica i json delle note
function load(index) {
   
	notes.filename = pathnote[index];
	$.ajax({
		method: 'GET',
		url: pathnote[index],
		success: function(d) {
			notes.data = d
			showNotes()
		},
		error: function(a,b,c) {
			alert('Non ho potuto caricare le annotazioni per il file '+file)
			notes.data = []
			showNotes()
		}
	});
}

//~ function saveNotes() {
	//~ $.ajax({
		//~ method: 'POST',
		//~ url: "save.php",
		//~ data: JSON.stringify(notes),
		//~ success: function(d) {
			//~ alert("Note salvate")
		//~ },
		//~ error: function(a,b,c) {
			//~ alert('Non ho potuto salvare le note')
		//~ }
	//~ });
//~ }

function showNotes() {
	for (var i=0; i< notes.data.length; i++) {
		insertNote(notes.data[i],mode=='edit')
	}
	var n = $('.sentence').length
	$('#sentence')[0].max = n
}

function selection() {
	if (window.getSelection) {
		return window.getSelection();
	} else if (document.getSelection) {
		return document.getSelection();
	} else if (document.selection) {
		return document.selection.createRange().text;
	}
}

function addNote(type) {
		var s = selection()
		var dad = s.anchorNode.parentElement
		var guida = s.anchorNode.substringData(s.anchorOffset,20)
		if (compatibleExtremes(s)) {
			var spanId = 'span-'+ ($('#file span').length+1)
			var pos = dad.childNodes.indexOf(s.anchorNode)
			var n = {
				type: type,
				id: spanId,
				node: dad.id,
				pos: pos,
				guide: guida,
				start: Math.min(s.anchorOffset,s.focusOffset),
				end: Math.max(s.anchorOffset,s.focusOffset)
			}
			notes.data.push(n)
			insertNote(n,true)
		}
}

function insertNote(note,active) {
	var r = document.createRange()
	var node = $('#'+note.node)[0].childNodes[note.pos]
	r.setStart(node,note.start);
	r.setEnd(node,note.end)
	var span = document.createElement('span')
	span.setAttribute('id',note.id)
	span.setAttribute('class',note.type+(active?" edit-"+note.type:''))
	r.surroundContents(span)
}

function compatibleExtremes(n) {
	return (n.anchorNode === n.focusNode && n.type=='Range')
}
		
NodeList.prototype.indexOf = function(n) { 
	var i=-1; 
	while (this.item(i) !== n) {i++} ; 
	return i 
}	

