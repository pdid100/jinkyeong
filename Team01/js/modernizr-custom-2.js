/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-opacity-cssgradients-touch-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;
window.Modernizr = function (a, b, c) {
    function z(a) {
        j.cssText = a
    }

    function A(a, b) {
        return z(m.join(a + ";") + (b || ""))
    }

    function B(a, b) {
        return typeof a === b
    }

    function C(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function D(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!C(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
        }
        return !1
    }

    function E(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : B(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function F(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + o.join(d + " ") + d).split(" ");
        return B(b, "string") || B(b, "undefined") ? D(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), E(e, b, c))
    }
    var d = "2.6.2",
        e = {}, f = !0,
        g = b.documentElement,
        h = "modernizr",
        i = b.createElement(h),
        j = i.style,
        k, l = {}.toString,
        m = " -webkit- -moz- -o- -ms- ".split(" "),
        n = "Webkit Moz O ms",
        o = n.split(" "),
        p = n.toLowerCase().split(" "),
        q = {}, r = {}, s = {}, t = [],
        u = t.slice,
        v, w = function (a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"),
                m = b.body,
                n = m || b.createElement("body");
            if (parseInt(d, 10))
                while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !! i
        }, x = {}.hasOwnProperty,
        y;
    !B(x, "undefined") && !B(x.call, "undefined") ? y = function (a, b) {
        return x.call(a, b)
    } : y = function (a, b) {
        return b in a && B(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = u.call(arguments, 1),
            e = function () {
                if (this instanceof e) {
                    var a = function () {};
                    a.prototype = c.prototype;
                    var f = new a,
                        g = c.apply(f, d.concat(u.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return c.apply(b, d.concat(u.call(arguments)))
            };
        return e
    }), q.touch = function () {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : w(["@media (", m.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) {
            c = a.offsetTop === 9
        }), c
    }, q.backgroundsize = function () {
        return F("backgroundSize")
    }, q.opacity = function () {
        return A("opacity:.55"), /^0.55$/.test(j.opacity)
    }, q.cssgradients = function () {
        var a = "background-image:",
            b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            c = "linear-gradient(left top,#9f9, white);";
        return z((a + "-webkit- ".split(" ").join(b + a) + m.join(c + a)).slice(0, -a.length)), C(j.backgroundImage, "gradient")
    }, q.fontface = function () {
        var a;
        return w('@font-face {font-family:"font";src:url("https://")}', function (c, d) {
            var e = b.getElementById("smodernizr"),
                f = e.sheet || e.styleSheet,
                g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0
        }), a
    };
    for (var G in q) y(q, G) && (v = G.toLowerCase(), e[v] = q[G](), t.push((e[v] ? "" : "no-") + v));
    return e.addTest = function (a, b) {
        if (typeof a == "object")
            for (var d in a) y(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, z(""), i = k = null,
    function (a, b) {
        function k(a, b) {
            var c = a.createElement("p"),
                d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function l() {
            var a = r.elements;
            return typeof a == "string" ? a.split(" ") : a
        }

        function m(a) {
            var b = i[a[g]];
            return b || (b = {}, h++, a[g] = h, i[h] = b), b
        }

        function n(a, c, f) {
            c || (c = b);
            if (j) return c.createElement(a);
            f || (f = m(c));
            var g;
            return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
        }

        function o(a, c) {
            a || (a = b);
            if (j) return a.createDocumentFragment();
            c = c || m(a);
            var d = c.frag.cloneNode(),
                e = 0,
                f = l(),
                g = f.length;
            for (; e < g; e++) d.createElement(f[e]);
            return d
        }

        function p(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
                return r.shivMethods ? n(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function (a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(r, b.frag)
        }

        function q(a) {
            a || (a = b);
            var c = m(a);
            return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !! k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a
        }
        var c = a.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            f, g = "_html5shiv",
            h = 0,
            i = {}, j;
        (function () {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = a.childNodes.length == 1 || function () {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                }()
            } catch (c) {
                f = !0, j = !0
            }
        })();
        var r = {
            elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: c.shivCSS !== !1,
            supportsUnknownElements: j,
            shivMethods: c.shivMethods !== !1,
            type: "default",
            shivDocument: q,
            createElement: n,
            createDocumentFragment: o
        };
        a.html5 = r, q(b)
    }(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.testProp = function (a) {
        return D([a])
    }, e.testAllProps = F, e.testStyles = w, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : ""), e
}(this, this.document);