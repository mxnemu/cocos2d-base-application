/////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2012 Nehmulos
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
// claim that you wrote the original software. If you use this software
// in a product, an acknowledgment in the product documentation would be
// appreciated but is not required.
//
// 2. Altered source versions must be plainly marked as such, and must not be
// misrepresented as being the original software.
//
// 3. This notice may not be removed or altered from any source
// distribution.
/////////////////////////////////////////////////////////////////////////////

function Application () {
    Application.superclass.constructor.apply(this, arguments);
    
    this.isKeyboardEnabled = true;
    this.isMouseEnabled = true;

    var s = cc.Director.sharedDirector.winSize
    
    var debugCanvas = document.createElement("canvas");
    $("#cocos2d-demo").append(debugCanvas);
    $(debugCanvas).addClass("debugcanvas")
    
    debugCanvas.width = $(debugCanvas).parent().width();
    debugCanvas.height = $(debugCanvas).parent().height();
    
    this.world = new b2World(new b2Vec2(0, -10), true);
    //this.world.SetContactListener(new ContactListener());
    
    //setup debug draw
    var debugDraw = new b2DebugDraw()
        debugDraw.SetSprite(debugCanvas.getContext("2d"))
        debugDraw.SetDrawScale(PhysicsNode.physicsScale)
        debugDraw.SetFillAlpha(0.5)
        debugDraw.SetLineThickness(1.0)
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit)
    this.world.SetDebugDraw(debugDraw);
}

Application.inherit(cc.Layer, {
    // fixed update Time
    upadtesPerSecond: 60,
    updateTime: 1/60,
    timePassedWithoutUpdate: 0,
    frameSecondTimer: 0,
    frameUpdateCounter: 0,
    
    keyDown: function(event) {
        Input.instance.keysDown[event.keyCode] = true;
    },
    
    keyUp: function(event) {
        Input.instance.keysDown[event.keyCode] = false;
    },


    createExampleGame: function() {
        var box = new PhysicsNode();
        box.position = new cc.Point(400, 400);
        box.rotation = 25;
        box.createPhysics(this.world, {boundingBox: new cc.Size(50, 50)});
        this.addChild(box);
        
        var ground = new PhysicsNode();
        ground.position = new cc.Point(400, 200);
        ground.createPhysics(this.world, {boundingBox: new cc.Size(400, 10)});
        
        var jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(ground.body, this.world.GetGroundBody(), ground.body.GetPosition());
        jointDef.MaximalForce = 4000;
        
        ground.joint = this.world.CreateJoint(jointDef);
        
        // called in update loop
        ground.update = function() {
            PhysicsNode.prototype.update.call(this);
            
            if (Input.instance.keysDown[37]) { // left arrow   
                this.body.ApplyTorque(200);
            }
            if (Input.instance.keysDown[39]) { // right arrow
                this.body.ApplyTorque(-200);
            }
        }
        
        $(".instructions").append("use left / right arrow keys to rotate the ground");
    },
    
    update: function(dt) {
        
        if (this.paused) {
            return;
        }
        
        // limit impact on heavy lag and tab change
        // avoid spiral of death,
        // where calculating 1sec updates takes longer than 1sec
        if (dt > 1.0) {
            dt = 1.0;
        }

        this.frameSecondTimer += dt;
        this.timePassedWithoutUpdate  += dt;
        
        while (this.timePassedWithoutUpdate >= this.updateTime) {
            this.fixedUpdate(this.updateTime);
            this.timePassedWithoutUpdate -= this.updateTime;
            this.frameUpdateCounter++;
        }
        
        if (this.frameSecondTimer >= 1.0) {
            //console.log("updates per second: " + this.frameUpdateCounter);
            this.frameUpdateCounter = 0;
            this.frameSecondTimer -= 1.0;
        }
        
       this.world.DrawDebugData();
    },
    
    fixedUpdate: function(dt) {
        this.world.Step(dt,3, 3);
        this.world.ClearForces();
        
        var body = this.world.GetBodyList();
        while(body) {
        
            // update userdata
            var userData = body.GetUserData();
            
            if (userData) {
                if (userData.update) {
                    userData.update(dt);
                }
                if (userData.destroyed) {
                    userData.destroy();
                }
            }
            body = body.GetNext();
        }

        for (var key in this.onPhysicsUpdatedCallbacks) {
            this.onPhysicsUpdatedCallbacks[key]();
            this.onPhysicsUpdatedCallbacks.splice(0, 1);
        }
    }
})

function runDemo () {

    var director = cc.Director.sharedDirector
    director.backgroundColor = "rgb(200,200,200)"
    director.attachInView(document.getElementById('cocos2d-demo'))
    director.displayFPS = true
    
    // Disable rightclick
    $("canvas").bind("contextmenu", function(e) {
        e.preventDefault();
    });
    
    // I modified lib/cocos2d-beta2.js to make this work!
    // this function does not work with the official release
    function registerResource(path, mimetype, alias) {
        alias = alias || path;
        cc.jah.resources[alias] = {data: path, mimetype: mimetype, remote:true};
        director.preloader().addToQueue(path);
    };
    
    // here you can add a block of resources
    // they will be loaded with the loadingscreen before your game starts
    //registerResource("../img/background.png", "image/png");
    
    // Wait for the director to finish preloading our assets
    cc.addListener(director, 'ready', function (director) {
        var scene = new cc.Scene
        var app = new Application();
        
        Application.instance = app;
        
        scene.addChild(app)
        app.createExampleGame();
        app.scheduleUpdate();

        // Display the scene
        director.replaceScene(scene)
    });
    director.runPreloadScene();
}
