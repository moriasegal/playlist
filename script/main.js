//var newPlaylistObject = {};
//
//$('.buttonbb').click(createPopup);
//
//function createPopup(e) {
//    var popup = $('<div>', 
//    {
//        id: "popup"
//    });
//    $.get('html/formPlaylistTitle.html', function(data) {
//        var content = $('<div>', {
//            id: "#popup_container",
//            html: data, 
//            click: function (e) {
//
//            }, 
//        }).appendTo(popup);
//        content.find('form').submit(function(event) {
//            event.preventDefault();
//            newPlaylistObject.name = $(event.target).find('input[name=name]').val();
//            newPlaylistObject.photo = $(event.target).find('input[name=photo]').val();
//            console.log(newPlaylistObject);
//            console.log($(event.target));
//            addSongs($(event.target));
//        });
//    });
//
//    popup.appendTo('body');
//}
//
//function addSongs(form) {
//	var content = form.parent();
//	form.remove();
//	console.log(content);
//	$.get('html/formPlaylistSongs.html', function(data) {
//		content.html(data);
////		for (var i = 0; i < 3; i++) {
////			addSong().prependTo(content.find('form'));
////		}
//
//		content.find('.add-song').click(function(event) {
//			addSong().insertAfter(content.find('form fieldset:last-of-type'));
//		});
//
//		content.find('form').submit(function(event) {
//			event.preventDefault();
//			newPlaylistObject.songs = [];
//			$(event.target).find('fieldset').each(function(index, el) {
//				var song = {};
//				song.url = $(el).find('.song-name input:not(:placeholder-shown)').val();
//				newPlaylistObject.songs.push(song);
//			});
//			console.log(newPlaylistObject);
//		});
//	});
//
//	function addSong() {
//		var fieldset = $('<fieldset>');
//		
//		var songNameLabel = $('<label>', {
//			class: "song-name", 
//		}).appendTo(fieldset);
//		$('<span>', {text: "Song URL"}).appendTo(songNameLabel);
//		$('<input>', {
//			type: "text", 
//			placeholder: "song url", 
//		}).appendTo(songNameLabel);
//
//		return fieldset;
//	}
//}
$('#songsContainer span').click(function(event){
        console.log($(event.currentTarget)[0].textContent);
//        $('#control source').attr("src","../songs/"+$(event.currentTarget)[0].textContent);
    change("../songs/"+$(event.currentTarget)[0].textContent);
    });
    
function change(sourceUrl) {
    var audio = $("#songsList");      
    $("#songsList source").attr("src", sourceUrl);
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play(); changed based on Sprachprofi's comment below
    audio[0].oncanplaythrough = audio[0].play();
    /****************/
}