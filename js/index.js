// Desenvolvido por Rafael Rabelo de Oliveira em 02/2018

jQuery(function($) {
    search("SIA");
});

function search(artist){
    $.getJSON("https://itunes.apple.com/search?term="+artist+"&media=music&entity=album", function(result){
    
    $.getJSON("https://itunes.apple.com/lookup?id="+ result.results[0]["artistId"] +"&entity=album", function(albuns){

            $( "#artista").html(albuns.results[0]["artistName"]);            
            var img = document.getElementById('foto');
            img.src = albuns.results[1]["artworkUrl100"];

            for (i = 1; i < albuns.resultCount; i++) { 
                getMusics(albuns.results[i]["collectionId"]);
                $('<li />', {html: "<div id=\"cover\" ><img src=\""+ albuns.results[i]["artworkUrl100"] +"\" width=\"115px\" style=\"background-color: blue;\" ></div><div id=\"musics\"><h5 style=\"margin: 0 0 -10px 0; font-weight: normal; color: #a7a7a7;\" >"+ albuns.results[i]["releaseDate"].substring(0,4) +"</h5><h2 style=\"margin: 0; color: #59a2ea; border-bottom: 1px solid #cccccc80;\" >"+ albuns.results[i]["collectionName"] +"</h2><ul id=\"musics+"+ albuns.results[i]["collectionId"] +"\"></ul></div>", id: "album"}).appendTo('ul.albuns');                                
            }   

        });
    });
}

function getMusics(id){
    $.getJSON("https://itunes.apple.com/lookup?id="+ id +"&entity=song", function(musics){
        for (j = 1; j < musics.resultCount; j++) { 
            var element = document.getElementById("musics+"+ id);
            element.innerHTML += "<li><span>"+ musics.results[j]["trackName"] +"</span><span style=\"color: #8f8f8f80;\" >"+ formatMillis(musics.results[j]["trackTimeMillis"]) +"</span></li>";
        }
    });
}

function formatMillis(millisec) {
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
}