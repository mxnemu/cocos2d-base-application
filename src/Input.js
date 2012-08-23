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
function Input() {
    this.keysDown = {}
    this.keyNamesToKeyCodes = {
        "backspace":8,
        "tab":9,
        "enter":13,
        "shift":16,
        "ctrl":17,
        "alt":18,
        "pause/break":19,
        "capslock":20,
        "escape":27,
        "space":32,
        "pageUp":33,
        "pageDown":34,
        "end":35,
        "home":36,
        "leftarrow":37,
        "uparrow":38,
        "rightarrow":39,
        "downarrow":40,
        "insert":45,
        "delete":46,
        "0":48,
        "1":49,
        "2":50,
        "3":51,
        "4":52,
        "5":53,
        "6":54,
        "7":55,
        "8":56,
        "9":57,
        "a":65,
        "b":66,
        "c":67,
        "d":68,
        "e":69,
        "f":70,
        "g":71,
        "h":72,
        "i":73,
        "j":74,
        "k":75,
        "l":76,
        "m":77,
        "n":78,
        "o":79,
        "p":80,
        "q":81,
        "r":82,
        "s":83,
        "t":84,
        "u":85,
        "v":86,
        "w":87,
        "x":88,
        "y":89,
        "z":90,
        "leftSystemKey":91,
        "rightSystemKey":92,
        "selectkey":93,
        "numpad0":96,
        "numpad1":97,
        "numpad2":98,
        "numpad3":99,
        "numpad4":100,
        "numpad5":101,
        "numpad6":102,
        "numpad7":103,
        "numpad8":104,
        "numpad9":105,
        "multiply":106,
        "add":107,
        "subtract":109,
        "decimalpoint":110,
        "divide":111,
        "f1":112,
        "f2":113,
        "f3":114,
        "f4":115,
        "f5":116,
        "f6":117,
        "f7":118,
        "f8":119,
        "f9":120,
        "f10":121,
        "f11":122,
        "f12":123,
        "numlock":144,
        "scrolllock":145,
        "semi-colon":186,
        "equalsign":187,
        ",":188,
        "-":189,
        ".":190,
        "forwardslash":191,
        "graveaccent":192,
        "openbracket":219,
        "backslash":220,
        "closebraket":221,
        "singlequote":222
    }
    
    var _this = this;
    
    this.setKeyDown = function(keycode) {
        _this.keysDown[keycode] = true;
    }
    
    this.setKeyUp = function(keycode) {
        _this.keysDown[keycode] = false;
    }
    
    this.getNameForKeyCode = function(keycode) {
        for (key in this.keyNamesToKeyCodes) {
            if (this.keyNamesToKeyCodes[key] == keycode) {
                return key;
            }
        }
    }
}


Input.instance = new Input();
