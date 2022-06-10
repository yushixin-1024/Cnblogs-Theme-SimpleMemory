(self.webpackChunkCnblogs_Theme_SimpleMemory=self.webpackChunkCnblogs_Theme_SimpleMemory||[]).push([["ribbonsEffect"],{"./src/vendor/ribbonsEffect/ribbonsEffect.js":
/*!***************************************************!*\
  !*** ./src/vendor/ribbonsEffect/ribbonsEffect.js ***!
  \***************************************************/function(){eval('/**\r\n * Ribbons Class File.\r\n * Creates low-poly ribbons background effect inside a target container.\r\n */\r\n(function (name, factory)\r\n{\r\n    if (typeof window === "object")\r\n    {\r\n        window[name] = factory();\r\n    }\r\n\r\n})("Ribbons", function ()\r\n{\r\n    var _w = window,\r\n        _b = document.body,\r\n        _d = document.documentElement;\r\n\r\n    // random helper\r\n    var random = function ()\r\n    {\r\n        if (arguments.length === 1) // only 1 argument\r\n        {\r\n            if (Array.isArray(arguments[0])) // extract index from array\r\n            {\r\n                var index = Math.round(random(0, arguments[0].length - 1));\r\n                return arguments[0][index];\r\n            }\r\n            return random(0, arguments[0]); // assume numeric\r\n        } else\r\n        if (arguments.length === 2) // two arguments range\r\n        {\r\n            return Math.random() * (arguments[1] - arguments[0]) + arguments[0];\r\n        }\r\n        return 0; // default\r\n    };\r\n\r\n    // screen helper\r\n    var screenInfo = function (e)\r\n    {\r\n        var width = Math.max(0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0),\r\n            height = Math.max(0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0),\r\n            scrollx = Math.max(0, _w.pageXOffset || _d.scrollLeft || _b.scrollLeft || 0) - (_d.clientLeft || 0),\r\n            scrolly = Math.max(0, _w.pageYOffset || _d.scrollTop || _b.scrollTop || 0) - (_d.clientTop || 0);\r\n\r\n        return {\r\n            width: width,\r\n            height: height,\r\n            ratio: width / height,\r\n            centerx: width / 2,\r\n            centery: height / 2,\r\n            scrollx: scrollx,\r\n            scrolly: scrolly };\r\n\r\n    };\r\n\r\n    // mouse/input helper\r\n    var mouseInfo = function (e)\r\n    {\r\n        var screen = screenInfo(e),\r\n            mousex = e ? Math.max(0, e.pageX || e.clientX || 0) : 0,\r\n            mousey = e ? Math.max(0, e.pageY || e.clientY || 0) : 0;\r\n\r\n        return {\r\n            mousex: mousex,\r\n            mousey: mousey,\r\n            centerx: mousex - screen.width / 2,\r\n            centery: mousey - screen.height / 2 };\r\n\r\n    };\r\n\r\n    // point object\r\n    var Point = function (x, y)\r\n    {\r\n        this.x = 0;\r\n        this.y = 0;\r\n        this.set(x, y);\r\n    };\r\n    Point.prototype = {\r\n        constructor: Point,\r\n\r\n        set: function (x, y)\r\n        {\r\n            this.x = x || 0;\r\n            this.y = y || 0;\r\n        },\r\n        copy: function (point)\r\n        {\r\n            this.x = point.x || 0;\r\n            this.y = point.y || 0;\r\n            return this;\r\n        },\r\n        multiply: function (x, y)\r\n        {\r\n            this.x *= x || 1;\r\n            this.y *= y || 1;\r\n            return this;\r\n        },\r\n        divide: function (x, y)\r\n        {\r\n            this.x /= x || 1;\r\n            this.y /= y || 1;\r\n            return this;\r\n        },\r\n        add: function (x, y)\r\n        {\r\n            this.x += x || 0;\r\n            this.y += y || 0;\r\n            return this;\r\n        },\r\n        subtract: function (x, y)\r\n        {\r\n            this.x -= x || 0;\r\n            this.y -= y || 0;\r\n            return this;\r\n        },\r\n        clampX: function (min, max)\r\n        {\r\n            this.x = Math.max(min, Math.min(this.x, max));\r\n            return this;\r\n        },\r\n        clampY: function (min, max)\r\n        {\r\n            this.y = Math.max(min, Math.min(this.y, max));\r\n            return this;\r\n        },\r\n        flipX: function ()\r\n        {\r\n            this.x *= -1;\r\n            return this;\r\n        },\r\n        flipY: function ()\r\n        {\r\n            this.y *= -1;\r\n            return this;\r\n        } };\r\n\r\n\r\n    // class constructor\r\n    var Factory = function (options)\r\n    {\r\n        this._canvas = null;\r\n        this._context = null;\r\n        this._sto = null;\r\n        this._width = 0;\r\n        this._height = 0;\r\n        this._scroll = 0;\r\n        this._ribbons = [];\r\n        this._options = {\r\n            // ribbon color HSL saturation amount\r\n            colorSaturation: "80%",\r\n            // ribbon color HSL brightness amount\r\n            colorBrightness: "60%",\r\n            // ribbon color opacity amount\r\n            colorAlpha: 0.65,\r\n            // how fast to cycle through colors in the HSL color space\r\n            colorCycleSpeed: 6,\r\n            // where to start from on the Y axis on each side (top|min, middle|center, bottom|max, random)\r\n            verticalPosition: "center",\r\n            // how fast to get to the other side of the screen\r\n            horizontalSpeed: 150,\r\n            // how many ribbons to keep on screen at any given time\r\n            ribbonCount: 3,\r\n            // add stroke along with ribbon fill colors\r\n            strokeSize: 0,\r\n            // move ribbons vertically by a factor on page scroll\r\n            parallaxAmount: -0.5,\r\n            // add animation effect to each ribbon section over time\r\n            animateSections: true };\r\n\r\n        this._onDraw = this._onDraw.bind(this);\r\n        this._onResize = this._onResize.bind(this);\r\n        this._onScroll = this._onScroll.bind(this);\r\n        this.setOptions(options);\r\n        this.init();\r\n    };\r\n\r\n    // class prototype\r\n    Factory.prototype = {\r\n        constructor: Factory,\r\n\r\n        // Set and merge local options\r\n        setOptions: function (options)\r\n        {\r\n            if (typeof options === "object")\r\n            {\r\n                for (var key in options)\r\n                {\r\n                    if (options.hasOwnProperty(key))\r\n                    {\r\n                        this._options[key] = options[key];\r\n                    }\r\n                }\r\n            }\r\n        },\r\n\r\n        // Initialize the ribbons effect\r\n        init: function ()\r\n        {\r\n            try\r\n            {\r\n                this._canvas = document.createElement("canvas");\r\n                this._canvas.style["display"] = "block";\r\n                this._canvas.style["position"] = "fixed";\r\n                this._canvas.style["margin"] = "0";\r\n                this._canvas.style["padding"] = "0";\r\n                this._canvas.style["border"] = "0";\r\n                this._canvas.style["outline"] = "0";\r\n                this._canvas.style["left"] = "0";\r\n                this._canvas.style["top"] = "0";\r\n                this._canvas.style["width"] = "100%";\r\n                this._canvas.style["height"] = "100%";\r\n                this._canvas.style["z-index"] = "-1";\r\n                this._canvas.id = "bgCanvas";\r\n                this._onResize();\r\n\r\n                this._context = this._canvas.getContext("2d");\r\n                this._context.clearRect(0, 0, this._width, this._height);\r\n                this._context.globalAlpha = this._options.colorAlpha;\r\n\r\n                window.addEventListener("resize", this._onResize);\r\n                window.addEventListener("scroll", this._onScroll);\r\n                document.body.appendChild(this._canvas);\r\n            }\r\n            catch (e) {\r\n                console.warn("Canvas Context Error: " + e.toString());\r\n                return;\r\n            }\r\n            this._onDraw();\r\n        },\r\n\r\n        // Create a new random ribbon and to the list\r\n        addRibbon: function ()\r\n        {\r\n            // movement data\r\n            var dir = Math.round(random(1, 9)) > 5 ? "right" : "left",\r\n                stop = 1000,\r\n                hide = 200,\r\n                min = 0 - hide,\r\n                max = this._width + hide,\r\n                movex = 0,\r\n                movey = 0,\r\n                startx = dir === "right" ? min : max,\r\n                starty = Math.round(random(0, this._height));\r\n\r\n            // asjust starty based on options\r\n            if (/^(top|min)$/i.test(this._options.verticalPosition))\r\n            {\r\n                starty = 0 + hide;\r\n            } else\r\n            if (/^(middle|center)$/i.test(this._options.verticalPosition))\r\n            {\r\n                starty = this._height / 2;\r\n            } else\r\n            if (/^(bottom|max)$/i.test(this._options.verticalPosition))\r\n            {\r\n                starty = this._height - hide;\r\n            }\r\n\r\n            // ribbon sections data\r\n            var ribbon = [],\r\n                point1 = new Point(startx, starty),\r\n                point2 = new Point(startx, starty),\r\n                point3 = null,\r\n                color = Math.round(random(0, 360)),\r\n                delay = 0;\r\n\r\n            // buils ribbon sections\r\n            while (true)\r\n            {\r\n                if (stop <= 0) break;stop--;\r\n\r\n                movex = Math.round((Math.random() * 1 - 0.2) * this._options.horizontalSpeed);\r\n                movey = Math.round((Math.random() * 1 - 0.5) * (this._height * 0.25));\r\n\r\n                point3 = new Point();\r\n                point3.copy(point2);\r\n\r\n                if (dir === "right")\r\n                {\r\n                    point3.add(movex, movey);\r\n                    if (point2.x >= max) break;\r\n                } else\r\n                if (dir === "left")\r\n                {\r\n                    point3.subtract(movex, movey);\r\n                    if (point2.x <= min) break;\r\n                }\r\n                // point3.clampY( 0, this._height );\r\n\r\n                ribbon.push({ // single ribbon section\r\n                    point1: new Point(point1.x, point1.y),\r\n                    point2: new Point(point2.x, point2.y),\r\n                    point3: point3,\r\n                    color: color,\r\n                    delay: delay,\r\n                    dir: dir,\r\n                    alpha: 0,\r\n                    phase: 0 });\r\n\r\n\r\n                point1.copy(point2);\r\n                point2.copy(point3);\r\n\r\n                delay += 4;\r\n                color += this._options.colorCycleSpeed;\r\n            }\r\n            this._ribbons.push(ribbon);\r\n        },\r\n\r\n        // Draw single section\r\n        _drawRibbonSection: function (section)\r\n        {\r\n            if (section)\r\n            {\r\n                if (section.phase >= 1 && section.alpha <= 0)\r\n                {\r\n                    return true; // done\r\n                }\r\n                if (section.delay <= 0)\r\n                {\r\n                    section.phase += 0.02;\r\n                    section.alpha = Math.sin(section.phase) * 1;\r\n                    section.alpha = section.alpha <= 0 ? 0 : section.alpha;\r\n                    section.alpha = section.alpha >= 1 ? 1 : section.alpha;\r\n\r\n                    if (this._options.animateSections)\r\n                    {\r\n                        var mod = Math.sin(1 + section.phase * Math.PI / 2) * 0.1;\r\n\r\n                        if (section.dir === "right")\r\n                        {\r\n                            section.point1.add(mod, 0);\r\n                            section.point2.add(mod, 0);\r\n                            section.point3.add(mod, 0);\r\n                        } else {\r\n                            section.point1.subtract(mod, 0);\r\n                            section.point2.subtract(mod, 0);\r\n                            section.point3.subtract(mod, 0);\r\n                        }\r\n                        section.point1.add(0, mod);\r\n                        section.point2.add(0, mod);\r\n                        section.point3.add(0, mod);\r\n                    }\r\n                } else\r\n                {section.delay -= 0.5;}\r\n\r\n                var s = this._options.colorSaturation,\r\n                    l = this._options.colorBrightness,\r\n                    c = "hsla(" + section.color + ", " + s + ", " + l + ", " + section.alpha + " )";\r\n\r\n                this._context.save();\r\n\r\n                if (this._options.parallaxAmount !== 0)\r\n                {\r\n                    this._context.translate(0, this._scroll * this._options.parallaxAmount);\r\n                }\r\n                this._context.beginPath();\r\n                this._context.moveTo(section.point1.x, section.point1.y);\r\n                this._context.lineTo(section.point2.x, section.point2.y);\r\n                this._context.lineTo(section.point3.x, section.point3.y);\r\n                this._context.fillStyle = c;\r\n                this._context.fill();\r\n\r\n                if (this._options.strokeSize > 0)\r\n                {\r\n                    this._context.lineWidth = this._options.strokeSize;\r\n                    this._context.strokeStyle = c;\r\n                    this._context.lineCap = "round";\r\n                    this._context.stroke();\r\n                }\r\n                this._context.restore();\r\n            }\r\n            return false; // not done yet\r\n        },\r\n\r\n        // Draw ribbons\r\n        _onDraw: function ()\r\n        {\r\n            // cleanup on ribbons list to rtemoved finished ribbons\r\n            for (var i = 0, t = this._ribbons.length; i < t; ++i)\r\n            {\r\n                if (!this._ribbons[i])\r\n                {\r\n                    this._ribbons.splice(i, 1);\r\n                }\r\n            }\r\n\r\n            // draw new ribbons\r\n            this._context.clearRect(0, 0, this._width, this._height);\r\n\r\n            for (var a = 0; a < this._ribbons.length; ++a) // single ribbon\r\n            {\r\n                var ribbon = this._ribbons[a],\r\n                    numSections = ribbon.length,\r\n                    numDone = 0;\r\n\r\n                for (var b = 0; b < numSections; ++b) // ribbon section\r\n                {\r\n                    if (this._drawRibbonSection(ribbon[b]))\r\n                    {\r\n                        numDone++; // section done\r\n                    }\r\n                }\r\n                if (numDone >= numSections) // ribbon done\r\n                {\r\n                    this._ribbons[a] = null;\r\n                }\r\n            }\r\n            // maintain optional number of ribbons on canvas\r\n            if (this._ribbons.length < this._options.ribbonCount)\r\n            {\r\n                this.addRibbon();\r\n            }\r\n            requestAnimationFrame(this._onDraw);\r\n        },\r\n\r\n        // Update container size info\r\n        _onResize: function (e)\r\n        {\r\n            var screen = screenInfo(e);\r\n            this._width = screen.width;\r\n            this._height = screen.height;\r\n\r\n            if (this._canvas)\r\n            {\r\n                this._canvas.width = this._width;\r\n                this._canvas.height = this._height;\r\n\r\n                if (this._context)\r\n                {\r\n                    this._context.globalAlpha = this._options.colorAlpha;\r\n                }\r\n            }\r\n        },\r\n\r\n        // Update container size info\r\n        _onScroll: function (e)\r\n        {\r\n            var screen = screenInfo(e);\r\n            this._scroll = screen.scrolly;\r\n        } };\r\n\r\n\r\n\r\n    // export\r\n    return Factory;\r\n});\n\n//# sourceURL=webpack://Cnblogs-Theme-SimpleMemory/./src/vendor/ribbonsEffect/ribbonsEffect.js?')}}]);