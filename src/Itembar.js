function Itembar(spriteName) {
    Itembar.superclass.constructor.call(this);
    this.spriteName = spriteName;
    this.sprites = [];
}

Itembar.inherit(cc.Node, {
    destroyed:false,
    spacing: 5,
    sprites:[],
    
    update:function() {

    },
    
    setAmount: function(newAmount) {

        while (newAmount > this.sprites.length) {
            var sprite = new cc.Sprite({
                file: this.spriteName
            });

            if (this.sprites.length >= 1) {
                var lastSprite = this.sprites[this.sprites.length-1];
                sprite.position = new cc.Point(lastSprite.position.x + lastSprite.contentSize.width, 0);
            } else {
                sprite.position = new cc.Point(0,0)
            }
            
            this.sprites.push(sprite);
            this.addChild(sprite);
        }
        
        if (newAmount < this.sprites.length) {
            newAmount = newAmount >= 0 ? newAmount : 0;
            var difference = (this.sprites.length-newAmount);
            for (var i=this.sprites.length-difference; i < this.sprites.length; ++i) {
                this.removeChild(this.sprites[i]);
            }
            this.sprites.splice(this.sprites.length-difference, difference);
        }
    },
    
    lowerAmount: function() {
        this.setAmount(this.sprites.length-1);
    },
    
    increaseAmount: function() {
        this.setAmount(this.sprites.length+1);
    },
    
    destroy: function() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
});
