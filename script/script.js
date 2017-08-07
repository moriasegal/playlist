

$(document).ready(function(event){
    ajax(null, "api/playlist", 'GET').then(function(data) {
        console.log(data.data);
        buildHeader(data.data);
//               data.data['0'].id;
               //var myJSON = JSON.stringify(data);
//        console.log(data.data[data.data.length-1]);
        $.each(data.data, function(index, val) {
//            console.log(val);
            buildViewPlaylist(val);
        }); 
    });
});

function buildHeader(data){
    var addPlaylist = $('#addPlaylist');
    addPlaylist.click(function(e){
        var popup = new FormAddPopup("add");
        popup.build();
    });
    var search = $('.search');
    search.keyup(function(){
//        searchfun(search);
        var playList=$('#playList');
        playList.html("");
        var counter = 0;
        $.each(data, function(index, val){
            var i = val.name.indexOf(search[0].value);
            if(i !== -1){
                buildViewPlaylist(val);
                counter++;
            }
        });
        if(!counter){
            $('<h1>',{
                text:"no matches",
            }).appendTo(playList);
        }
    });
//    search.change(function(){
////        searchfun(search);
//        var playList=$('#playList');
//        playList.html("");
//        $.each(data, function(index, val){
//            var i = val.name.indexOf(search[0].value);
//            if(i !== -1){
//                buildViewPlaylist(val);
//            }
//        });
//    });
}



//function searchfun(search){
//    console.log(search[0].value);
//}


function buildViewPlaylist(value){
//   console.log(val);
   var playList=$('#playList');            

   var item=$('<div>',{
            class:"playItem",
            //click:
            "data-id":value.id,
            css:{"background-image": 'url(img/'+value.image+')'},
//                text:"hi"
   }).appendTo(playList);

   var albumTitle =$('<span>',{
       text:value.name,
       class:"albumTitle",
   }).appendTo(item);

//        var name =$('<h1>',{
//           text:value.name,
////                    +val.name
//       }).appendTo(albumContainer);
   albumTitle.circleType({ radius: 125});

   $('<i>',{
       class:"fa fa-remove",
       click: function () {
            var popup = new DeletePopup("Are you sure you want to delete?", value.id);
            popup.build();
        }
   }).appendTo(item);

   $('<i>',{
       class:"fa fa-pencil",
       click: function () {
            var popup = new FormEditPopup(value.id);
            popup.build();
        }
   }).appendTo(item);

   var playItemSmall=$('<span>',{
       class:"playItemSmall"
   }).appendTo(item);

   var playIcon=$('<i>',{
       class:"fa fa-play",
   }).appendTo(playItemSmall);
       
       
//       var playIcon2=$('<a>',{
//           css:{"data":"image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNDA1LjIsMjMyLjlMMTI2LjgsNjcuMmMtMy40LTItNi45LTMuMi0xMC45LTMuMmMtMTAuOSwwLTE5LjgsOS0xOS44LDIwSDk2djM0NGgwLjFjMCwxMSw4LjksMjAsMTkuOCwyMCAgYzQuMSwwLDcuNS0xLjQsMTEuMi0zLjRsMjc4LjEtMTY1LjVjNi42LTUuNSwxMC44LTEzLjgsMTAuOC0yMy4xQzQxNiwyNDYuNyw0MTEuOCwyMzguNSw0MDUuMiwyMzIuOXoiLz48L3N2Zz4="},
////           attr:{"href": "http://www.freepik.com",
////                "title": "Freepik"},
//       }).appendTo(playIcon);
//       ar playIcon2=$('<a>',{
//           text:"Freepik CC 3.0 BY",
//           attr{"href": "http://www.freepik.com",
//                "title": "Freepik"}</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY"
//       }).appendTo(playIcon);
   playIcon.click({param1: value},playAlbum);
//       removeIcon.click({param1: val.id},playAlbum);
//       editIcon.click({param1: val.id},playAlbum);
}

function buildPlaylist(playlist2, playlistsSongs){
    var body = $('body');
    body.html("");
    
    var player=$('<div>',{
        id: 'playList',
    });
    player.appendTo(body);
    
    var player_container = $('<div>',{
        class: "playerContainer",
    }).appendTo(player);
    
    var audio = $("<audio>",{
        id: "audioPlayer",
        controls: "controls",
        autoplay: "autoplay",
    }).appendTo(player_container);
    
    $("<source>",{
        src:"songs/"+playlistsSongs[0].url,
        type: "audio/mpeg",
    }).appendTo(audio);
    
    var index = 1;
    audio.on('ended', function(){
       index = changeSong(playlistsSongs[index].url, index, playlistsSongs.length-1);
    console.log("index:"+index);
       return index;
    });
    var songslist = $('<ul>',{
        class: "songsList",
    }).appendTo(player);
    
    for (let i = 0; i < playlistsSongs.length; i++){
        $('<li>',{
            text:playlistsSongs[i].name,
                click:function(){
                index = changeSong(playlistsSongs[i].url, i, playlistsSongs.length-1);
            },
        }).appendTo(songslist);
    }
    console.log("index2:"+index);
    console.log(playlist2);
    console.log(playlistsSongs);
}
function changeSong(sourceUrl, index, length) {
    var audio = $("#audioPlayer");      
    $("#audioPlayer source").attr("src", "songs/"+sourceUrl);
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play(); changed based on Sprachprofi's comment below
    audio[0].oncanplaythrough = audio[0].play();
    if (index < length){
        return index +1;
    } else{
        return 0;
    }
    /****************/
}

function removePlaylist(id){
    var playList=$('#playList');
    var element = playList.find(".playItem[data-id="+id+"]");
    $(element).remove();
}
function playAlbum(event){
//   console.log(event.data.param1);
//   console.log(event);
   var id = event.data.param1.id;
    ajax(null, "api/playlist/"+id+"/songs", 'GET').then(function(data) {
       buildPlaylist(event.data.param1, data.data.songs);
    });
}


//}); 
function ajax(data,url,method) {
   
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
//                console.log(response);
                resolve(response);
            }
        });
    });
}

