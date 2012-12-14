function FloatingScore(score, args) {
    args = args || {fontSize: 42};
    FloatingScore.superclass.constructor.call(this, args);
    this.string = ""+score;
    this.scale = 0;
    this.numericColor = [255,255,255];
    this.targetColor = [200,200,50];
}

FloatingScore.inherit(cc.Label, {
    destroyed:false,
    numericColor: [255,255,255],
    targetColor: [255,255,255],
    
    update:function() {
    
        if (this.scale < 1) {
            this.scale += 0.02;
        } else {
            this.destroyed = true;
        }
        
        for (var i=0; i < this.numericColor.length; ++i) {
            if (this.numericColor[i] < this.targetColor[i]) {
                this.numericColor[i] += 1;
            } else if (this.numericColor[i] > this.targetColor[i]) {
                this.numericColor[i] -= 1;
            }
        }
        this.fontColor = "rgb("+ this.numericColor[1] +","+ this.numericColor[1] +","+ this.numericColor[2] +")"
    },
    
    destroy: function() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
});
