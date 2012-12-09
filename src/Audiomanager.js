function Audiomanager() {
    var testMimes = {
        "ogg": "audio/ogg",
        "aac": "audio/aac",
        "wav": "audio/aac",
        "mp3": "audio/mpeg"
    };
    this.supportedCodes = {};
    
    for (var format in testMimes) {
        var result = (new Audio()).canPlayType(testMimes[format]);
        this.supportedCodes[format] = result && result.length != 0 && !result.match(/no/i) ? true : false;

        if (this.supportedCodes[format]) {
            console.log(format + " supported");
        } else {
            console.log(format + " not supported");
        }
    }
}

Audiomanager.inherit(Object, {
    audios:[],
    
    play: function(alias) {
        this.audios[alias].play();
    },
    
    // provide urls like this: {"ogg": "audio/sound.ogg", "wav": "audio/conversions/sound.ogg"}
    // alias is the string under which will be able to access your sound later
    // example:
    //   Audiomanager.instance.load({"ogg": "audio/sound.ogg", "wav": "audio/conversions/sound.ogg"}, "sound")
    //   Audiomanager.instance.play("sound");
    load: function(urls, alias) {
    
        for (var format in urls) {
            if (this.supportedCodes[format]) {
                this.audios[alias] = new Audio(urls[format]);
                this.audios[alias].load();
                console.log("loaded " + alias + " as " + format);
                break;
            }
        }
        
        if (!this.audios[alias]) {
            console.warn("could not load a supported audio file for the sound " + alias);
            this.audios[alias] = {play:function(){}}; // insert failsave object
            return;
        }
    }
});

Audiomanager.instance = new Audiomanager();
