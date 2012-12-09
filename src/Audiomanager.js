function Audiomanager() {
    var canPlayOggString = (new Audio()).canPlayType("audio/ogg");
    var canPlayAacString = (new Audio()).canPlayType("audio/aac");
    var canPlayWavString = (new Audio()).canPlayType("audio/wav");
    
    this.canPlayOgg = canPlayOggString && canPlayOggString.length != 0 && !canPlayOggString.match(/no/i) ? true : false;
    this.canPlayAac = canPlayAacString && canPlayAacString.length != 0 && !canPlayAacString.match(/no/i) ? true : false;
    this.canPlayWav = canPlayWavString && canPlayWavString.length != 0 && !canPlayWavString.match(/no/i) ? true : false;
}

Audiomanager.inherit(Object, {
    audios:[],
    
    play: function(alias) {
        this.audios[alias].play();
    },
    
    // provide url without the .ogg/.wav/.aac extension.
    // example: "audio/mySound" will look for 
    // "audio/mySound.ogg", "audio/mySound.wav" and "audio/mySound.aac"
    // make sure the extension is typed in lower case
    load: function(urlWithoutExtension) {
        if (this.canPlayOgg && this.fileExists(urlWithoutExtension + ".ogg")) {
            this.audios[urlWithoutExtension] = new Audio(urlWithoutExtension + ".ogg");
        } else if (this.canPlayAac && this.fileExists(urlWithoutExtension + ".aac")) {
            this.audios[urlWithoutExtension] = new Audio(urlWithoutExtension + ".aac");
        } else if (this.canPlayWav && this.fileExists(urlWithoutExtension + ".wav")) {
            this.audios[urlWithoutExtension] = new Audio(urlWithoutExtension + ".wav");
        } else {
            console.warn("could not load audio file. Maybe the extension is not lowercase .ogg/.aac/.wav");
            this.audios[urlWithoutExtension] = {play:function(){}};
            return;
        }
        this.audios[urlWithoutExtension].load();
    },
    
    fileExists: function(url) {
        /*
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
        */
        return true;
    }
});

Audiomanager.instance = new Audiomanager();
