
class FormAddPopup extends Popup {
	constructor () {
//		console.time('FormPopup');
		super(null);
	}

	build () {
		super.build();
		var divContainer = $('<div>').appendTo(this.popup.find('#popup_container'));
                var self = this;
//		console.log('works');
		
		this.ajax('html/formPlaylistTitle.html')
		.then(function (data) {
//                    console.log(data);
			var html = data;
//			console.timeEnd('FormPopup')
			divContainer.html(html);
            }).then(function () {
                return new Promise(function (resolve) {
                        $('form').submit(function(e) {
                                e.preventDefault();
                                resolve(e);
                        });
                }).then(function(e) {
//                    console.log(e.target);
                    var data = {
                            name: $(e.target).find('input[name=name]').val(), 
                            image: $(e.target).find('input[name=url]').val(), 
//                            photo:$(e.target).find('input[name=photo]').val()
                    };
//                    console.log(data);
                    self.addSongs($(e.target),data);

//			 throw new RangeError('sdfsdfsd');
//			return this.sendAjax('main.php', 'POST', data);
                }.bind(this));
            });
        
//		.then(function (data) {
//			console.log(data);
//			var xhr = data[2];
//			if (xhr.statusText === 'Created') {
//				this.remove();
//			}
//		}.bind(this))
//		.catch(function (err) {
//			console.log(err)
//		})
	}


    ajax(url,method,data) {

    //    method = "POST";
        data = data || null;
               //console.log("data1"+data);
        return new Promise(function (resolve) {
            $.ajax({
                type: method,
                url: url, 
                data: data,
                success: function (response) {
                //    console.log("response from success    "+ JSON.stringify(response));
//                    console.log(response);
                    resolve(response);
                }
            });
        });
    }
    
    
    
    addSongs(form, newPlaylistObject){
        var self = this;
//        console.log(form);
//        console.log(newPlaylistObject);
        var content = form.parent();
	form.remove();
//	console.log(content[0]);
	this.ajax('html/formPlaylistSongs.html')
        .then(function(data) {
            content.html(data);
        }).then(function() {
            content.find('#addFa-plus-square').click(function() {
			addSong().appendTo(content.find('form #formSongsContainer'));
		});
        }).then(function() {
            content.find('form').submit(function(event) {
                return new Promise(function (resolve){
                    event.preventDefault();
                    resolve(event);
//                });
                }).then(function(event){
                    newPlaylistObject.songs = [];
                    $(event.target).find('.newSong').each(function(index, el) {
                        var song = {};
                        if(($(el).find('.newSongUrl').val())&&($(el).find('.newSongName').val())){
                            song.url = $(el).find('.newSongUrl').val();
                            song.name = $(el).find('.newSongName').val();
                            newPlaylistObject.songs.push(song);
                        }
                    });

                }).then(function(){
    //                return new Promise(function (resolve) {
                    self.ajax("api/playlist", 'POST', newPlaylistObject)
                    .then(function(){
                        self.remove();
                        self.ajax("api/playlist", 'GET').then(function(data) {
                           var element = data.data[data.data.length-1];
                           buildViewPlaylist(element);
                        });
                    });
    //                buildPlaylist(newPlaylistObject);
                }.bind(this));
            });
        });
    }
}

//		for (var i = 0; i < 3; i++) {
//			addSong().prependTo(content.find('form'));
//		}

//		content.find('.add-song').click(function(event) {
//			addSong().insertAfter(content.find('form fieldset:last-of-type'));
//		});
function addSong() {
    var newSong = $('<div>',{
    class:"newSong",
    });

    var songUrlLabel = $('<label>', {
            text: "Song URL", 
    }).appendTo(newSong);

    $('<input>',{
        type:"text",
        class:"newSongUrl",
        placeholder: "song url",
    }).appendTo(songUrlLabel);

    var songNameLabel = $('<label>', {
            text: "Name", 
    }).appendTo(newSong);

    $('<input>',{
        type:"text",
        class:"newSongName",
        placeholder: "song Name",
    }).appendTo(songNameLabel);

    return newSong;
}