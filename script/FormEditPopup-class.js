

class FormEditPopup extends Popup {
    constructor (id) {
        super(null);
        this.id = id;
    }

    build () {
        super.build();
        var id = this.id;
        var divContainer = $('<div>').appendTo(this.popup.find('#popup_container'));
        var self = this;

        Promise.all([this.ajax('html/formPlaylistTitle.html'),this.ajax("api/playlist/"+id,'GET')])
        .then(function (data) {
            var html = data[0];
            divContainer.html(html);
            return data;
        }).then(function(data){
            $('input[name=name]').val(data[1].data.name);
            $('input[name=url]').val(data[1].data.image);
        }).then(function () {
            self.preview();
            return new Promise(function (resolve) {
                $('form').submit(function(e) {
                    e.preventDefault();
                    resolve(e);
                });
            }).then(function(e) {
                var data = {
                    name: $(e.target).find('input[name=name]').val(), 
                    image: $(e.target).find('input[name=url]').val(), 
                };
//                return data;
//            }).then(function(e,data){
                self.ajax("api/playlist/"+id, 'POST', data)
                    .then(function(){
                
                        self.addSongs($(e.target),data);
                    });

            }.bind(this));
        });

    }


    ajax(url,method,data) {

        data = data || null;
        return new Promise(function (resolve) {
            $.ajax({
                type: method,
                url: url, 
                data: data,
                success: function (response) {
                    resolve(response);
                }
            });
        });
    }
    
    preview(){
        var playlistImg = $('#playlistImg');
        var playlistUrl = $('#playlistUrl');
        this.playlistUrlAttr(playlistUrl[0].value, playlistImg);
            
        playlistUrl.change(function(){
            console.log(playlistUrl[0].value);
            this.playlistUrlAttr(playlistUrl[0].value, playlistImg);
        }.bind(this));
    }
    
    playlistUrlAttr(playlistUrl, playlistImg){
        console.log(playlistUrl);
        if(playlistUrl){
                playlistImg.attr("src", "img/"+playlistUrl);
            } 
            else{
                playlistImg.attr("src", "img/preview.png");
            }
    }
    
    
    addSongs(form){
        console.log(form);
//        console.log(newPlaylistObject);
        var newPlaylistObject = {};
        var self = this;
        var id = this.id;
        var content = form.parent().parent();
	form.remove();
	Promise.all([this.ajax('html/formPlaylistSongs.html'),this.ajax("api/playlist/"+id+"/songs",'GET')])
        .then(function (data) {
            content.html(data[0]);
            return data;
        }).then(function (data) {
            for(var i=3; i<data[1].data.songs.length; i++){
                self.addSong().appendTo(content.find('form #formSongsContainer'));
            }

            return data;
        }).then(function(data){
//            if(data[1].data.songs){
            for(var i=0; i<data[1].data.songs.length; i++){
                $('.newSongName')[i].value = data[1].data.songs[i].name;
                $('.newSongUrl')[i].value = data[1].data.songs[i].url;
            }
//        }
            console.log(data[1]);
            console.log($('.newSongName')[0].name);
//            $('input[name=name]').val(data[1].data.name);
//            $('input[name=url]').val(data[1].data.image);
        }).then(function() {
            content.find('#addFa-plus-square').click(function() {
                    addSong().appendTo(content.find('form #formSongsContainer'));
		});
        }).then(function() {
//            content.html(data);
            content.find('form').submit(function(event) {
                return new Promise(function (resolve) {
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
                        self.ajax("api/playlist/"+id+"/songs", 'POST', newPlaylistObject)
                    .then(function(){
                        self.remove();
    //                    self.ajax("api/playlist", 'GET').then(function(data) {
    //                       var element = data.data[data.data.length-1];
    //                        buildPlaylist(element);
    //                    });
                    });
                }.bind(this));
            });
        });
    }
    addSong() {
        var newSong = $('<div>',{
            class:"newSong"
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
}

