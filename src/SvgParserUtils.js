function SvgParserUtils() {}

SvgParserUtils.validateVertexString = function(str) {
    var regex = new RegExp("[^0-9\-\.,\s mz]", "ig");
    return regex.exec(str) === null;
};

/*
 * @param vertexString string from the 'd' attribute of a path tag
 * @param shallTranslateResult all vertex coords will be translated to 
                               use the position of the first vertex as origin.
                               This position will be provided in the return obeject.
 * @param svgHeight required to flip coords to cocos2d coords 
 *                  with origin in bottom left cornor
 */

SvgParserUtils.parseVertexString = function(vertexString, shallTranslateResult,  svgHeight, svgWidth) {
    shallTranslateResult = shallTranslateResult || true;
    svgHeight = svgHeight || 0;
    svgWidth =  svgWidth || 0;

    if (SvgParserUtils.validateVertexString(vertexString)) {
        var vertices = [];
        var useAbsoluteCoords = vertexString.match(/^M/) != null;
        var vs = vertexString.replace(new RegExp("m |z", "ig"), "");
        var firstX = null;
        var firstY = null;
        var x = svgWidth / 2; 
        var y = svgHeight;
        // todo optimize
        while (vs.length > 2) {
            var xString = vs.substr(0, vs.search(",")),
                yString = vs.substr(vs.search(",")+1, vs.search(" ") - vs.search(",")-1);
                
                if (useAbsoluteCoords) {
                    x = (parseFloat(xString) - (svgWidth/2));
                    y = (svgHeight - parseFloat(yString) - (svgHeight/2));
                } else {
                    x += parseFloat(xString);
                    y -= parseFloat(yString);
                }
            
            if (firstX == null && firstY == null) {
                firstX = x;
                firstY = y;
                if (shallTranslateResult) {
                    vertices.push(new b2Vec2(0, 0));
                } else {
                    vertices.push(new b2Vec2(firstX / PhysicsNode.physicsScale,
                                             firstY / PhysicsNode.physicsScale));
                }
            } else {
                if (useAbsoluteCoords) {
                    vertices.push(new b2Vec2((x) / PhysicsNode.physicsScale,
                                             (y) / PhysicsNode.physicsScale));
                } else {
                    vertices.push(new b2Vec2((x - firstX) / PhysicsNode.physicsScale,
                                             (y - firstY) / PhysicsNode.physicsScale));
                }
            }
            
            if (vs.search(" ") != -1) {
                vs = vs.substr(vs.search(" ") + 1, vs.length - vs.search(" ") + 1);
            } else {
                vs = "";
            }
            
            if (vertices[vertices.length-1].x == null || vertices[vertices.length-1].y == null) {
                console.log("couldn't parse coords: '" + xString + "', '" + yString + "'");
            }
        }
        console.log(JSON.stringify(vertices));
        
        return {vertices: vertices, position: new cc.Point(firstX, firstY)};
    } else {
         console.log("cannot parse vertex string due to unknown control chars: '" + vertexString + "'");
    }
}
