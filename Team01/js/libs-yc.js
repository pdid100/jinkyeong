// MooTools: the javascript framework.
// Load this file's selection again by visiting: http://mootools.net/more/bb3e380031a99f31bbdc4b8c81f31d47 
// Or build this file again with packager using: packager build More/Element.Measure More/Fx.Scroll
/*
---
copyrights:
  - [MooTools](http://mootools.net)

licenses:
  - [MIT License](http://mootools.net/license.txt)
...
*/
MooTools.More = {
    version: "1.4.0.1",
    build: "a4244edf2aa97ac8a196fc96082dd35af1abab87"
};
(function () {
    var b = function (e, d) {
        var f = [];
        Object.each(d, function (g) {
            Object.each(g, function (h) {
                e.each(function (i) {
                    f.push(i + "-" + h + (i == "border" ? "-width" : ""));
                });
            });
        });
        return f;
    };
    var c = function (f, e) {
        var d = 0;
        Object.each(e, function (h, g) {
            if (g.test(f)) {
                d = d + h.toInt();
            }
        });
        return d;
    };
    var a = function (d) {
        return !!(!d || d.offsetHeight || d.offsetWidth);
    };
    Element.implement({
        measure: function (h) {
            if (a(this)) {
                return h.call(this);
            }
            var g = this.getParent(),
                e = [];
            while (!a(g) && g != document.body) {
                e.push(g.expose());
                g = g.getParent();
            }
            var f = this.expose(),
                d = h.call(this);
            f();
            e.each(function (i) {
                i();
            });
            return d;
        },
        expose: function () {
            if (this.getStyle("display") != "none") {
                return function () {};
            }
            var d = this.style.cssText;
            this.setStyles({
                display: "block",
                position: "absolute",
                visibility: "hidden"
            });
            return function () {
                this.style.cssText = d;
            }.bind(this);
        },
        getDimensions: function (d) {
            d = Object.merge({
                computeSize: false
            }, d);
            var i = {
                x: 0,
                y: 0
            };
            var h = function (j, e) {
                return (e.computeSize) ? j.getComputedSize(e) : j.getSize();
            };
            var f = this.getParent("body");
            if (f && this.getStyle("display") == "none") {
                i = this.measure(function () {
                    return h(this, d);
                });
            } else {
                if (f) {
                    try {
                        i = h(this, d);
                    } catch (g) {}
                }
            }
            return Object.append(i, (i.x || i.x === 0) ? {
                width: i.x,
                height: i.y
            } : {
                x: i.width,
                y: i.height
            });
        },
        getComputedSize: function (d) {
            d = Object.merge({
                styles: ["padding", "border"],
                planes: {
                    height: ["top", "bottom"],
                    width: ["left", "right"]
                },
                mode: "both"
            }, d);
            var g = {}, e = {
                    width: 0,
                    height: 0
                }, f;
            if (d.mode == "vertical") {
                delete e.width;
                delete d.planes.width;
            } else {
                if (d.mode == "horizontal") {
                    delete e.height;
                    delete d.planes.height;
                }
            }
            b(d.styles, d.planes).each(function (h) {
                g[h] = this.getStyle(h).toInt();
            }, this);
            Object.each(d.planes, function (i, h) {
                var k = h.capitalize(),
                    j = this.getStyle(h);
                if (j == "auto" && !f) {
                    f = this.getDimensions();
                }
                j = g[h] = (j == "auto") ? f[h] : j.toInt();
                e["total" + k] = j;
                i.each(function (m) {
                    var l = c(m, g);
                    e["computed" + m.capitalize()] = l;
                    e["total" + k] += l;
                });
            }, this);
            return Object.append(e, g);
        }
    });
})();
(function () {
    Fx.Scroll = new Class({
        Extends: Fx,
        options: {
            offset: {
                x: 0,
                y: 0
            },
            wheelStops: true
        },
        initialize: function (c, b) {
            this.element = this.subject = document.id(c);
            this.parent(b);
            if (typeOf(this.element) != "element") {
                this.element = document.id(this.element.getDocument().body);
            }
            if (this.options.wheelStops) {
                var d = this.element,
                    e = this.cancel.pass(false, this);
                this.addEvent("start", function () {
                    d.addEvent("mousewheel", e);
                }, true);
                this.addEvent("complete", function () {
                    d.removeEvent("mousewheel", e);
                }, true);
            }
        },
        set: function () {
            var b = Array.flatten(arguments);
            if (Browser.firefox) {
                b = [Math.round(b[0]), Math.round(b[1])];
            }
            this.element.scrollTo(b[0], b[1]);
            return this;
        },
        compute: function (d, c, b) {
            return [0, 1].map(function (e) {
                return Fx.compute(d[e], c[e], b);
            });
        },
        start: function (c, d) {
            if (!this.check(c, d)) {
                return this;
            }
            var b = this.element.getScroll();
            return this.parent([b.x, b.y], [c, d]);
        },
        calculateScroll: function (g, f) {
            var d = this.element,
                b = d.getScrollSize(),
                h = d.getScroll(),
                j = d.getSize(),
                c = this.options.offset,
                i = {
                    x: g,
                    y: f
                };
            for (var e in i) {
                if (!i[e] && i[e] !== 0) {
                    i[e] = h[e];
                }
                if (typeOf(i[e]) != "number") {
                    i[e] = b[e] - j[e];
                }
                i[e] += c[e];
            }
            return [i.x, i.y];
        },
        toTop: function () {
            return this.start.apply(this, this.calculateScroll(false, 0));
        },
        toLeft: function () {
            return this.start.apply(this, this.calculateScroll(0, false));
        },
        toRight: function () {
            return this.start.apply(this, this.calculateScroll("right", false));
        },
        toBottom: function () {
            return this.start.apply(this, this.calculateScroll(false, "bottom"));
        },
        toElement: function (d, e) {
            e = e ? Array.from(e) : ["x", "y"];
            var c = a(this.element) ? {
                x: 0,
                y: 0
            } : this.element.getScroll();
            var b = Object.map(document.id(d).getPosition(this.element), function (g, f) {
                return e.contains(f) ? g + c[f] : false;
            });
            return this.start.apply(this, this.calculateScroll(b.x, b.y));
        },
        toElementEdge: function (d, g, e) {
            g = g ? Array.from(g) : ["x", "y"];
            d = document.id(d);
            var i = {}, f = d.getPosition(this.element),
                j = d.getSize(),
                h = this.element.getScroll(),
                b = this.element.getSize(),
                c = {
                    x: f.x + j.x,
                    y: f.y + j.y
                };
            ["x", "y"].each(function (k) {
                    if (g.contains(k)) {
                        if (c[k] > h[k] + b[k]) {
                            i[k] = c[k] - b[k];
                        }
                        if (f[k] < h[k]) {
                            i[k] = f[k];
                        }
                    }
                    if (i[k] == null) {
                        i[k] = h[k];
                    }
                    if (e && e[k]) {
                        i[k] = i[k] + e[k];
                    }
                }, this);
            if (i.x != h.x || i.y != h.y) {
                this.start(i.x, i.y);
            }
            return this;
        },
        toElementCenter: function (e, f, h) {
            f = f ? Array.from(f) : ["x", "y"];
            e = document.id(e);
            var i = {}, c = e.getPosition(this.element),
                d = e.getSize(),
                b = this.element.getScroll(),
                g = this.element.getSize();
            ["x", "y"].each(function (j) {
                    if (f.contains(j)) {
                        i[j] = c[j] - (g[j] - d[j]) / 2;
                    }
                    if (i[j] == null) {
                        i[j] = b[j];
                    }
                    if (h && h[j]) {
                        i[j] = i[j] + h[j];
                    }
                }, this);
            if (i.x != b.x || i.y != b.y) {
                this.start(i.x, i.y);
            }
            return this;
        }
    });

    function a(b) {
        return (/^(?:body|html)$/i).test(b.tagName);
    }
})();
window.log = function () {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        arguments.callee = arguments.callee.caller;
        var b = [].slice.call(arguments);
        (typeof console.log === "object" ? log.apply.call(console.log, console, b) : console.log.apply(console, b))
    }
};
(function (e) {
    function h() {}
    for (var g = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), f; f = g.pop();) {
        e[f] = e[f] || h
    }
})((function () {
    try {
        console.log();
        return window.console
    } catch (a) {
        return window.console = {}
    }
})());

function c(a) {
    if (!a) {
        return null
    }
    if (!a.crumb) {
        a.crumb = new Object()
    }
    return a.crumb
}

function c$(a) {
    return c($(a))
}
Array.prototype.removeUndefinedElements = (function () {
    var a = Array.prototype.push;
    return function () {
        for (var b = 0; b < this.length; b++) {
            if (!this[b]) {
                this.splice(b, 1);
                b--
            }
        }
    }
})();
var ImagePreloader = new Class({
    preloadImages: function (b) {
        for (var a = 0; a < b.length; a++) {
            new Image().src = b[a]
        }
    }
});
var MutableBoolean = new Class({
    value: false,
    initialize: function (a) {
        this.set(a)
    },
    get: function () {
        return this.value
    },
    set: function (a) {
        this.value = a ? true : false
    }
});
var Curtain = new Class({
    Implements: [Events, Options],
    options: {
        visible: false,
        curtainID: "curtain",
        bgImage: "images/black-pixel.png"
    },
    initialize: function (a) {
        this.setOptions(a);
        this.curtain = this.createCurtainElement();
        this.fadeEffect = new Fx.Tween(this.curtain, {
            link: "chain"
        });
        this.curtain.inject($(document.body), "top")
    },
    createCurtainElement: function () {
        return new Element("div", {
            id: this.options.curtainID,
            styles: {
                "background-image": "url('" + this.options.bgImage + "')",
                top: 0,
                left: 0,
                position: "absolute",
                "z-index": 1,
                opacity: 0
            }
        })
    }.protect(),
    getCurtainElement: function () {
        return this.curtain
    },
    setVisible: function (b, a) {
        if (b === this.visible) {
            return
        }
        if (a) {
            this.fadeEffect.chain(function () {
                a();
                this.clearChain()
            })
        }
        if (b === true) {
            this.options.visible = true;
            this.resizeCurtain();
            this.resizeEventListener = this.resizeCurtain.bind(this);
            window.addEvent("resize", this.resizeEventListener);
            this.fadeEffect.start("opacity", "0", "1")
        } else {
            if (b === false) {
                this.options.visible = false;
                this.curtain.setStyles({
                    width: 0,
                    height: 0
                });
                this.curtain.setStyle("height", 0);
                this.fadeEffect.start("opacity", "1", "0");
                window.removeEvent("resize", this.resizeEventListener)
            } else {
                throw "visible was neither true nor false"
            }
        }
    },
    resizeCurtain: function () {
        this.curtain.setStyle("display", "none");
        this.curtain.setStyle("width", (window.getScrollSize().x - 1) + "px");
        this.curtain.setStyle("height", (window.getScrollSize().y - 1) + "px");
        this.curtain.setStyle("display", "block")
    }
});
var TextFieldFocusBehavior = new Class({
    Implements: [Options],
    options: {
        element: null,
        watermark: "",
        focusColor: null,
        blurColor: null
    },
    initialize: function (a) {
        this.setOptions(a)
    },
    addFocusAndBlurEvents: function () {
        this.options.element.addEvent("change", this.handleChange.bind(this));
        this.options.element.addEvent("focus", this.handleFocus.bind(this));
        this.options.element.addEvent("blur", this.handleBlur.bind(this))
    },
    handleFocus: function (a) {
        if (this.options.watermark === this.options.element.value.trim()) {
            this.options.element.value = "";
            if (this.options.focusColor !== null) {
                this.options.element.setStyle("color", this.options.focusColor)
            }
        }
    },
    handleBlur: function (a) {
        if (this.options.element.value.trim() === "") {
            this.options.element.value = this.options.watermark;
            if (this.options.blurColor !== null) {
                this.options.element.setStyle("color", this.options.blurColor)
            }
        }
    },
    handleChange: function (a) {
        if (this.options.blurColor !== null && this.options.watermark === this.options.element.value.trim()) {
            this.options.element.setStyle("color", this.options.blurColor)
        } else {
            if (this.options.focusColor !== null) {
                this.options.element.setStyle("color", this.options.focusColor)
            }
        }
    }
});