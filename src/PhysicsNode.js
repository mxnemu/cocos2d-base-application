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

function PhysicsNode() {
    PhysicsNode.superclass.constructor.call(this);
}

PhysicsNode.physicsScale = 30;

PhysicsNode.inherit(cc.Node, {
    destroyed: false,
    // freeze happens when it leaves the screen
    // currently it's not implemented. 
    // For a workaround you must create a sensor of the size of the screen and
    // check for collisonEnd with any object and set destroyed to true.
    destroyOnFreeze: true, 
    
    update: function() {
        this.synchronizePosition();
    },
    
    destroy: function() {
        if (this.parent) {
            this.parent.removeChild(this);
        }

        if (this.body && this.body.m_world) {
            this.body.m_world.DestroyBody(this.body);
        }
    },

    /*
     * @param {b2World} world world which is used to create the Object
     * @param {Object} args contains various arguments to create the physics. optional.
     * @param {Number} args.density sets density.
     * @param {Number} args.isStatic sets density to 0.0 to make the shape static.
     *    ignored when args.density is set.
     * @param {Number} args.restitution sets the restitution of the shape. By default 0.1
     * @param {Number} args.friction sets the friction of the shape. By default 0.1
     * @param {Number} args.boundingBox sets with and height of the bounding box.
     *    if not set this.contentsize is used to get width and height.
     * @param {String} args.shapeType string constant to determin what kind 
     *    of shape should be created. Valid values are "circle", "box"
     *    if not set a "box" will be created.
     */
    createPhysics: function(world, args) {
        
        if(!args) {
            args = {}
        }
    
        var bodyDef = new b2BodyDef();
        
        if (args.isKinematic) {
            bodyDef.type = b2Body.b2_kinematicBody
        } else {
            bodyDef.type = args.density != 0.0 && !args.isStatic ? 
                           b2Body.b2_dynamicBody :
                           b2Body.b2_staticBody;
       }
                       
        bodyDef.position = new b2Vec2(this.position.x / PhysicsNode.physicsScale,
                                            this.position.y / PhysicsNode.physicsScale);
                                            
        bodyDef.angle = cc.degreesToRadians(-this.rotation);
        bodyDef.fixedRotation = args.fixedRotation ? args.fixedRotation : false;
        bodyDef.bullet = args.isBullet != undefined ? args.isBullet : false;

        var fixDef = new b2FixtureDef();
        fixDef.density = args.density ? args.density : (args.isStatic ? 0.0 : 1.0);
        fixDef.friction = args.friction ? args.friction : 0.1;
        fixDef.restitution = args.restitution ? args.restitution : 0.1;
        fixDef.isSensor = args.isSensor ? args.isSensor : false;
        
        var boundingBox = args.boundingBox ? 
                new cc.Rect(0,0, args.boundingBox.width / PhysicsNode.physicsScale,
                                   args.boundingBox.height / PhysicsNode.physicsScale) :
                new cc.Rect(0,0, this.contentSize.width / PhysicsNode.physicsScale,
                                   this.contentSize.height / PhysicsNode.physicsScale);
        
        var shape;
        if (args.shapeType === "circle") {
            shape = new b2CircleShape(boundingBox.size.width/2);
        } else if (args.shapeType === "polygon" || args.vertices) {
            shape = new b2PolygonShape();
            shape.SetAsArray(args.vertices, args.vertices.length);
        }else {
            if (this.createCustomShapeType) {
                shape = this.createCustomShapeType(args);
            }
            if (!shape) {
                shape = new b2PolygonShape();
                shape.SetAsBox(boundingBox.size.width/2, boundingBox.size.height/2);
            }
        }
        
        fixDef.shape = shape;

        //create ground
        this.body = world.CreateBody(bodyDef);
        this.body.CreateFixture(fixDef);
        this.body.SetUserData(this);
    },
    
    /*
     * Synchronize the cc.Node's position with the position of the physics body
     */
    synchronizePosition: function() {
        this.position.x = this.body.GetPosition().x * PhysicsNode.physicsScale;
        this.position.y = this.body.GetPosition().y * PhysicsNode.physicsScale;
        this.rotation = cc.radiansToDegrees(-this.body.GetAngle());
     //   console.log(this.position.x + "," + this.position.y);
     
    }    
});
