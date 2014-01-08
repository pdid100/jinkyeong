(function () {
    var a = function () {
        window._gaq = [
            ["_setAccount", "UA-12101333-5"],
            ["_setDomainName", "krystalrae.com"],
            ["_trackPageview"],
            ["_trackPageLoadTime"]
        ];
        (function () {
            var d = document.createElement("script");
            d.type = "text/javascript";
            d.async = true;
            d.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(d, b)
        })()
    };
    KrystalraeWebpage = new Class({
        initialize: function (b, d) {
            this.rootUrl = b;
            this.collectionSupport = d
        },
        setUpWindow: function () {
            if (navigator.userAgent.match(/(iPad)|(Nexus 7)/i) === null) {
                window.addEvent("domready", this.handleDomReady.bind(this))
            } else {
                window.addEvent("domready", this.handleiPadDomReady.bind(this))
            } if (location.hostname.match(/krystalrae.com/i) !== null) {
                a()
            }
        },
        handleDomReady: function () {
            this.configureLogo(true);
            this.configureViewCollectionLink();
            this.configureConnectLinks()
        },
        handleiPadDomReady: function () {
            this.configureLogo(false);
            this.configureViewCollectionLink()
        },
        configureLogo: function (b) {
            var d = this.collectionSupport.getThemeColor();
            var f = $$("#logo a");
            f.set("tween", {
                duration: 150
            });
            var e = new Image();
            e.onload = function () {
                f.tween("background-color", "#ffffff");
                if (b) {
                    f.addEvent("mouseenter", function () {
                        f.tween("background-color", d)
                    });
                    f.addEvent("mouseleave", function () {
                        f.tween("background-color", "#ffffff")
                    })
                }
            };
            e.src = this.rootUrl + "img/krystalrae-sprites.png"
        },
        configureConnectLinks: function () {
            var f = this.collectionSupport.getThemeColor();
            var d = $$("#footer-connect li a");
            var g = d.length;
            for (var e = 0; e < g; e++) {
                var b = d[e];
                b.set("tween", {
                    duration: 150
                });
                b.addEvent("mouseenter", function () {
                    this.tween("background-color", f)
                }.bind(b));
                b.addEvent("mouseleave", function () {
                    this.tween("background-color", "#000000")
                }.bind(b))
            }
        },
        configureViewCollectionLink: function () {
            var e = {
                styles: ["padding", "border", "margin"]
            };
            var b = 21 / 2;
            var o = 10;
            var k = 4;
            var p = $$("header nav ul")[0];
            var g = $$("header nav ul li")[0];
            var r = $$("header nav ul li a")[0];
            var l = $$("header nav ul li ul")[0];
            var f = {
                duration: 375,
                link: "cancel",
                transition: Fx.Transitions.Cubic.easeOut
            };
            var s = new Fx.Tween(l, f);
            var t = new Fx.Tween(r, f);
            var q = true;
            var i = function () {
                var u = p.getComputedSize(e).totalHeight;
                var v = new Object();
                v.top = u + "px";
                v.bgPos = (r.getComputedSize(e).totalWidth / 2 - b) + "px " + (u + k - o) + "px";
                return v
            };
            var h = function () {
                var u = p.getComputedSize(e).totalHeight;
                var v = new Object();
                v.top = (-l.getComputedSize(e).totalHeight + p.getComputedSize(e).totalHeight - 10) + "px";
                v.bgPos = (r.getComputedSize(e).totalWidth / 2 - b) + "px " + (u + k) + "px";
                return v
            };
            var d = function () {
                var u = q ? h() : i();
                l.setStyle("top", u.top);
                r.setStyle("background-position", u.bgPos)
            };
            var j = function () {
                if (!q) {
                    return
                }
                q = false;
                var u = i();
                s.start("top", u.top);
                t.start("background-position", u.bgPos)
            };
            var n = function () {
                if (q) {
                    return
                }
                q = true;
                var u = h();
                s.start("top", u.top);
                t.start("background-position", u.bgPos)
            };
            var m = function () {
                if (q) {
                    j()
                } else {
                    n()
                }
            };
            r.addEvent("click", function (u) {
                m();
                u.stop()
            });
            if (!Modernizr.touch) {
                g.addEvents({
                    mouseenter: j,
                    mouseleave: n
                })
            }
            window.addEvents({
                click: n,
                resize: d
            });
            l.setStyles({
                left: "-999em",
                display: "block"
            });
            l.setStyle("left", "4px");
            d();
            r.href = "#";
            r.addClass("submenu-active")
        }
    })
}).call(this);
(function () {
    var h = {
        styles: ["padding", "border", "margin"]
    };
    var n = true;
    var f = true;
    var w = false;
    var i;
    var e;
    var m;
    var s;
    var v = function () {
        var z = i();
        $$("body")[0].setStyle("min-width", z);
        return z
    };
    var a = function (z, A) {
        return function () {
            z.location.hash = A
        }
    };
    var r = function (C, z, D, B, E) {
        var A = function (G, F) {
            if (G) {
                G.stop()
            }
            if (F === true && z.isRunning()) {
                return
            }
            z.removeEvents("complete");
            if (D) {
                z.addEvent("complete", D)
            }
            z.start(B.getScroll().x, E ? E() : 0)
        };
        C.addEvent("click", A);
        return A
    };
    var b = function (A, C, E) {
        var D = $$(".nav-shop-link");
        var B = D.length;
        for (var z = 0; z < B; z++) {
            r(D[z], A, a(C, "shop"), C, function () {
                return E.getPosition().y
            })
        }
    };
    var o = function (z) {
        c(z).handleScroll = function (A) {
            z.setStyle("background-position", "center " + Math.max(0, z.getPosition().y - A.getScroll().y) + "px")
        }
    };
    var l = function (z) {
        c(z).handleScroll = function (A) {
            z.setStyle("background-position", "center " + Math.min(0, z.getPosition().y - A.getScroll().y) + "px")
        }
    };
    var t = function (B, A) {
        B.setStyles({
            display: "block",
            background: "transparent no-repeat center 0px fixed"
        });
        var z = new Image();
        z.onload = function () {
            B.setStyle("background-image", "url('" + z.src + "')")
        };
        var C = function (D) {
            var E = e(c(B).ordinal, D);
            if (z.src.indexOf(E) == -1) {
                z.src = E
            }
        };
        C(A.availHeight);
        c(B).handleResize = function (E) {
            B.setStyle("height", E + "px");
            if (Modernizr.backgroundsize) {
                var D = Math.round(m() * E / 700 * s()) + "px " + Math.round(E * s()) + "px";
                B.setStyles({
                    "-moz-background-size": D,
                    "-webkit-background-size": D,
                    "background-size": D
                })
            } else {
                C(E)
            }
        }
    };
    var y = function (A, z, B, C) {
        c(C).scrollToOutfit = r(A, z, null, B, function () {
            return C.getPosition().y
        });
        c(A).handleScroll = function (D) {
            if (c(C).ordinal == D) {
                A.addClass("outfit-current-link")
            } else {
                A.removeClass("outfit-current-link")
            }
        }
    };
    var q = function (z) {
        c(z).handleResize = function (B, A) {
            z.setStyle("top", Math.round((B - z.getComputedSize(h).totalHeight - A.getComputedSize(h).totalHeight) * 0.5) + "px")
        }
    };
    var k = function (A, z) {
        A.setStyles({
            display: "block",
            "min-width": z,
            position: "fixed",
            width: "100%"
        });
        c(A).handleScrollOrResize = function (H, C, D) {
            var G = H.getScroll().y;
            var I = H.getSize().y;
            var F = A.getComputedSize(h).totalHeight;
            var B = G + I - F;
            if (B > D.getPosition().y + D.getComputedSize(h).totalHeight) {
                A.setStyles({
                    position: "relative",
                    bottom: null,
                    top: null
                })
            } else {
                var E = C.getPosition().y;
                if (B < E) {
                    A.setStyles({
                        position: "fixed",
                        bottom: null,
                        top: (E - G) + "px"
                    })
                } else {
                    A.setStyles({
                        position: "fixed",
                        bottom: "0",
                        top: null
                    })
                }
            } if (A.getStyle("position") == "fixed") {
                A.setStyle("left", "-" + H.getScroll().x + "px")
            } else {
                if (A.getStyle("left") != 0) {
                    A.setStyle("left", null)
                }
            }
        }
    };
    var j = function (A, C) {
        A.setStyle("display", "block");
        var B = function (D) {
            return (D) < 10 ? ("0" + D) : D
        };
        var z = B(C);
        c(A).handleScroll = function (D) {
            A.set("text", B(D + 1) + " / " + z)
        }
    };
    var u = function (C, F, z, E, B) {
        var A = z.getComputedSize(h).totalHeight;
        var D = Math.round((C.getScroll().y - z.getPosition().y - A * 0.1) / A);
        return B ? Math.min(Math.max(0, D), E - 1) : D
    };
    var p = function (C, E, z, D) {
        var B = $("outfit-next");
        var A = B.getElement("a");
        B.setStyle("display", "block");
        A.addEvent("click", function (G) {
            G.stop();
            var F = u(C, E, z, D, w);
            if (F < 0 || F >= (D - 1)) {
                F = -1
            }
            c$("outfit" + (F + 2)).scrollToOutfit(null, n)
        })
    };
    var x = function (C, E, z, D) {
        var B = $("outfit-prev");
        var A = B.getElement("a");
        B.setStyle("display", "block");
        A.addEvent("click", function (G) {
            G.stop();
            var F = u(C, E, z, D, w);
            if (F <= 0 || F >= D) {
                F = D
            }
            c$("outfit" + F).scrollToOutfit(null, n)
        })
    };
    var d = function (z) {
        z.setStyle("opacity", 0);
        var A = new Fx.Tween(z, {
            duration: "short",
            link: "cancel"
        });
        c(z).handleScroll = function (C, B) {
            if (C.getScroll().y > B.getPosition().y) {
                z.setStyle("display", "block");
                A.start("opacity", 1)
            } else {
                A.start("opacity", 0).chain(function () {
                    z.setStyle("display", "none")
                })
            }
        };
        c(z).handleResize = function (D, C) {
            var B = z.getStyle("display") == "none";
            if (B) {
                z.setStyle("display", "block")
            }
            z.setStyle("top", Math.max(0, Math.round((D - z.getComputedSize(h).totalHeight - C.getComputedSize(h).totalHeight) * 0.5)) + "px");
            if (B) {
                z.setStyle("display", "none")
            }
        }
    };
    var g = function (A, B) {
        var z = $("goto-top-link");
        r(z, A, null, B, null)
    };
    KrystalraeCollectionSupport = new Class({
        initialize: function (D, z, B, C, A) {
            i = D;
            e = z;
            m = B;
            s = C;
            this.themeColor = A
        },
        getThemeColor: function () {
            return this.themeColor
        },
        handleDomReady: function () {
            if (!window.location.hash) {
                var E = /\?.*(outfit[0-9]+).*/.exec(location.search);
                if (E) {
                    window.location.hash = E[1]
                }
            }
            var P = new Fx.Scroll(window, {
                link: "cancel"
            });
            var N = $("header-container");
            var J = $("collection");
            var D = $$(".outfit");
            var F = D.length;
            var H = D[0];
            var Q = D[F - 1];
            for (var O = 0; O < F; O++) {
                c(D[O]).ordinal = O;
                c(D[O]).link = $(D[O].id + "-link")
            }
            var K = $("outfit-drawer");
            var z = $("outfit-nav-container");
            var A = $("outfit-num");
            var M = $$(".goto-top-upper-bound")[0];
            var B = $("shop");
            var G = $("goto-top");
            var L = $$("footer")[0];
            var I = v();
            b(P, window, B);
            o(D[0]);
            l(D[F - 1]);
            for (var O = 0; O < F; O++) {
                t(D[O], screen);
                y(c(D[O]).link, P, window, D[O])
            }
            q(K);
            k(z, I);
            j(A, F);
            p(window, N, H, F);
            x(window, N, H, F);
            d(G);
            g(P, window);
            var R = function () {
                var U = window.getSize().y;
                var S = U - z.getComputedSize(h).totalHeight;
                if (S != H.getStyle("height")) {
                    for (var T = 0; T < F; T++) {
                        c(D[T]).handleResize(S)
                    }
                }
                c(K).handleResize(U, z);
                c(G).handleResize(U, z)
            };
            var C = function () {
                var T = u(window, N, H, F, f);
                c(H).handleScroll(window);
                c(Q).handleScroll(window);
                for (var S = 0; S < F; S++) {
                    c(c(D[S]).link).handleScroll(T)
                }
                c(z).handleScrollOrResize(window, H, Q);
                c(A).handleScroll(T);
                c(G).handleScroll(window, M)
            };
            R();
            C();
            window.addEvent("resize", R);
            window.addEvent("resize", C);
            window.addEvent("scroll", C)
        },
        handleiPadDomReady: function () {
            v();
            var C = $$(".outfit");
            var B = C.length;
            for (var A = 0; A < B; A++) {
                C[A].setStyle("display", "block");
                var z = new Image();
                z.src = e(A, 700);
                z.inject(C[A])
            }
        },
        createDoAfterEffectsFinishFunction: function (z) {
            var A = $("outfit-drawer");
            return function () {
                A.setStyle("display", "block");
                window.fireEvent("resize")
            }
        }
    })
}).call(this);
(function () {
    var a = function (f) {
        var e = $("hero");
        var g = $("hero-background");
        if (Modernizr.opacity) {
            e.setStyle("opacity", "0");
            g.setStyle("opacity", "0")
        }
        e.setStyle("display", "block");
        g.setStyle("display", "block");
        if (!Modernizr.opacity) {
            f();
            return
        }
        var b = function () {
            var h = new Image();
            h.onload = function () {
                g.tween("opacity", "1").get("tween").chain(f)
            };
            var i = /url\(["']?([^'")]+)['"]?\)/;
            h.src = g.getStyle("background-image").replace(i, "$1")
        };
        var d = new Image();
        d.onload = function () {
            e.tween("opacity", "1").get("tween").chain(b)
        };
        d.src = $("hero").getFirst("img").src
    };
    KrystalraeHomePage = new Class({
        Extends: KrystalraeWebpage,
        initialize: function (b, d) {
            this.parent(b, d)
        },
        handleDomReady: function () {
            this.parent();
            a(this.collectionSupport.createDoAfterEffectsFinishFunction(this));
            this.collectionSupport.handleDomReady()
        },
        handleiPadDomReady: function () {
            this.parent();
            a(function () {});
            this.collectionSupport.handleiPadDomReady()
        }
    })
}).call(this);
(function () {
    var a = function (e, b, f) {
        var d = new Element("a", {
            href: ""
        });
        e.inject(d);
        d.inject(b);
        d.addEvent("click", function (h) {
            h.stop();
            var g = "mailto:";
            g += f;
            g += "@";
            g += "krystalrae.com";
            window.location = g
        })
    };
    KrystalraeContactPage = new Class({
        Extends: KrystalraeWebpage,
        initialize: function (b, d) {
            this.parent(b, d)
        },
        handleDomReady: function () {
            this.parent();
            a($$("#other-email img")[0], $("other-email"), "hello");
            a($$("#press-email img")[0], $("press-email"), "press")
        },
        handleiPadDomReady: function () {
            this.parent();
            this.handleDomReady()
        }
    })
}).call(this);
(function () {
    var a = function () {
        var f = $("pattern");
        var e = new Image();
        var g = new Fx.Tween(f);
        if (Modernizr.opacity) {
            f.setStyle("opacity", "0")
        }
        f.setStyle("display", "block");
        if (!Modernizr.opacity) {
            return
        }
        e.onload = function () {
            g.start("opacity", 1)
        };
        e.src = d(f.getStyle("background-image"))
    };
    var d = function (f) {
        var e = f.substring(4, f.length - 1);
        if (e.charAt(0) === '"' || e.charAt(0) === "'") {
            e = e.substring(1, e.length - 1)
        }
        return e
    };
    var b = function (r) {
        var s = $("intro");
        var f = $$("#intro img")[0];
        var l = $("intro-title");
        var o = $("intro-previous");
        var q = $("intro-next");
        var p = new Image();
        var n = new Image();
        var m = new Image();
        var k = new Image();
        var e = new Fx.Morph(f);
        var j = new Fx.Morph(l);
        var h = new Fx.Morph(o);
        var i = new Fx.Morph(q);
        if (Modernizr.opacity) {
            f.setStyle("opacity", "0");
            l.setStyle("opacity", "0");
            o.setStyle("opacity", "0");
            q.setStyle("opacity", "0")
        }
        s.setStyle("display", "block");
        if (!Modernizr.opacity) {
            r();
            return
        }

        function g() {
            if (!c(p).loaded) {
                return
            }
            if (!c(n).loaded) {
                return
            }
            if (!c(k).loaded) {
                return
            }
            if (!c(m).loaded) {
                return
            }
            var u = function () {
                var x = parseInt(f.getStyle("margin-top"));
                e.start({
                    "margin-top": [x - 5, x],
                    opacity: [0, 1]
                }).chain(r)
            };
            var w = parseInt(l.getStyle("margin-top"));
            j.start({
                "margin-top": [w - 20, w],
                opacity: [0, 1]
            }).chain(u);
            var v = parseInt(o.getStyle("width"));
            h.start({
                width: [v + 20, v],
                opacity: [0, 0.8]
            }).chain(function () {
                o.addEvent("mouseenter", function () {
                    o.setStyle("opacity", 1)
                });
                o.addEvent("mouseleave", function () {
                    o.setStyle("opacity", 0.8)
                })
            });
            var t = parseInt(q.getStyle("width"));
            i.start({
                width: [t + 20, t],
                opacity: [0, 0.8]
            }).chain(function () {
                q.addEvent("mouseenter", function () {
                    q.setStyle("opacity", 1)
                });
                q.addEvent("mouseleave", function () {
                    q.setStyle("opacity", 0.8)
                })
            })
        }
        p.onload = function () {
            c(p).loaded = true;
            g()
        };
        n.onload = function () {
            c(n).loaded = true;
            g()
        };
        m.onload = function () {
            c(m).loaded = true;
            g()
        };
        k.onload = function () {
            c(k).loaded = true;
            g()
        };
        p.src = f.src;
        n.src = d(l.getStyle("background-image"));
        m.src = d(o.getStyle("background-image"));
        k.src = d(q.getStyle("background-image"))
    };
    KrystalraeCollectionPage = new Class({
        Extends: KrystalraeWebpage,
        initialize: function (e, f) {
            this.parent(e, f)
        },
        setUpWindow: function () {
            this.parent()
        },
        handleDomReady: function () {
            this.parent();
            a();
            b(this.collectionSupport.createDoAfterEffectsFinishFunction(this));
            this.collectionSupport.handleDomReady()
        },
        handleiPadDomReady: function () {
            this.parent();
            a();
            b(function () {});
            this.collectionSupport.handleiPadDomReady()
        }
    })
}).call(this);
(function () {
    var i = "1008px";
    var f = "1060px";
    var e = function (j) {
        return j === undefined ? "/" : j
    };
    var h = function (n, j, m, l, k) {
        return new KrystalraeCollectionSupport(function () {
            return n
        }, function (p, o) {
            return j + (p + 1) + "-" + Math.min(Math.round(o / 100) * 100, 1900) + "px.jpg"
        }, function () {
            return m
        }, function () {
            return l
        }, k)
    };
    var g = function (j, k) {
        return h(k, j + "img/2013/krystalrae-2013-fall-outfit-", 293, 1, "#5945d0")
    };
    var b = function (j, k) {
        return h(k, j + "img/2012/krystalrae-2012-fall-outfit-", 485, 0.94, "#00c801")
    };
    var a = function (j, k) {
        return h(k, j + "img/2012/krystalrae-2012-summer-outfit-", 258, 1, "#FA009C")
    };
    var d = function (j, k) {
        return h(k, j + "img/2012/krystalrae-2012-spring-outfit-", 520, 1, "#ff0000")
    };
    KrystalraeFactory = new Class({
        createHomePage: function (j) {
            return new KrystalraeHomePage(e(j), g(e(j), i))
        },
        createWebpage: function (j) {
            return new KrystalraeWebpage(e(j), g(e(j), i))
        },
        createContactPage: function (j) {
            return new KrystalraeContactPage(e(j), g(e(j), i))
        },
        create2013FallPage: function (j) {
            return new KrystalraeCollectionPage(e(j), g(e(j), f))
        },
        create2012FallPage: function (j) {
            return new KrystalraeCollectionPage(e(j), b(e(j), f))
        },
        create2012SummerPage: function (j) {
            return new KrystalraeCollectionPage(e(j), a(e(j), f))
        },
        create2012SpringPage: function (j) {
            return new KrystalraeCollectionPage(e(j), d(e(j), f))
        }
    })
}).call(this);