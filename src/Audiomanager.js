function Audiomanager() {
    this.canPlayOgg = (new Audio()).canPlayType("audio/ogg; codecs=vorbis");
    this.canPlayAac = (new Audio()).canPlayType("audio/aac; codecs=aac");
    this.canPlayWav = (new Audio()).canPlayType("audio/wav; codecs=wav");
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
