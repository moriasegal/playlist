class DeletePopup extends Popup {
	constructor (text, id) {
		super(null);
                this.text = text;
                this.id = id;
	}

	build () {
		super.build();
                var thisPopup = this;
                console.log(this.id);
                var id = this.id;
                $('<h3>', {
                    text: this.text
                }).appendTo(this.popup.find('#popup_container'));
                
                var deleteNav = $('<nav>',{
                    class: "deleteNav",
                }).appendTo(this.popup.find('#popup_container'));
                
                $('<button>',{
                    text: "Cancel",
                    class: "redButton",
                    click: function(){
                        thisPopup.remove();
                    }
                }).appendTo(this.popup.find(deleteNav));
                $('<button>',{
                    text: "Delete",
                    class: "redButton",
                    click: function(){
                         thisPopup.ajax("api/playlist/"+id, 'DELETE');
                         thisPopup.remove();
                         removePlaylist(id);
                    }
                }).appendTo(this.popup.find(deleteNav));
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
    }