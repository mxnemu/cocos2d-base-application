function Utils() {}

Utils.shuffleArray = function(array)
{
  var tmp, rand;
  for(var i = 0; i < array.length; i++)
  {
    rand = Math.floor(Math.random() * array.length);
    tmp = array[i]; 
    array[i] = array[rand]; 
    array[rand] = tmp;
  }
  return array;
}

if (!window.assert) {
    window.assert = function(condition) {
        if (!condition) {
            throw new Error("assertation failed");
        }
    }
}

function randomBoolean() {
    return Math.random() > 0.5;
}

// ie8 does not supply a console object, when you don't open the dev tools
if (!window.console) {
    window.console = {
        log: function() {},
        info: function() {},
        warn: function() {},
        debug: function() {},
        error: function() {},
        group: function() {},
        groupCollapsed: function() {},
        groupEnd: function() {},
        time: function() {},
        timeEnd: function() {},
        clear: function() {}
    }
}
