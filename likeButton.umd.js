(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["likeButton"] = factory();
	else
		root["likeButton"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************************************!*\
  !*** ./node_modules/url-loader!./star.png ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAABE0lEQVR4Ac3LweuLARyA8c/bb7elRslxLZID2i5OykXYhSRONLlsf8JSDtxWCkUObhy5SVJykgsnDu5jkxxYi7Z58/UebK3V+/Y68XnOj3/mUNZfeeA+5e0yN7NTaVeEcFlJFR+9y/pgSynnhK6ecEahmr0OO+2Nr6pZ37x21hH77JBYp29kLlbdADfFqoWxvpXEQPjluguOa6mCqpYTOn/GgYR1PamhAzbtN5Tqwqa2qYlj1h01MdWWo2nkp7qluoWRpgKPTG1ZqvjuoUKfPAennAQvjBXYI1y12xMhPNZwTWjI1RGemUndykr98FQ4L9c9Ibx0EDS9EsJdud777KLEUuKSL97KUXNbzabt7tjmf/Yb2Ttcq8+0JAYAAAAASUVORK5CYII="

/***/ }),
/* 1 */
/*!***********************!*\
  !*** ./likeButton.js ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dropDown = __webpack_require__ (/*! ./dropDown */ 2)

registerPlugin(proto(Gem, function(){
	this.name = 'LikeButton'

	this.initialize = function(options){
		return{
			likesField: 'likes'
		}
	}

	this.build = function(ticket, optionsObservee, api){
		var text = Text(ticket.subject.title)
		var likeButton = Image(__webpack_require__(/*! url-loader!./star.png */ 0))
		var numOfLikes = Text()
		var whoLiked = Text('')
		var like = Block(text, likeButton, drop = dropDown(numOfLikes, whoLiked))
		this.add(like)

		var likesField = optionsObservee.subject.likesField
		var likers = []

		// getLikersName()
		var getLikersName = function(){
			api.User.load(likers).then(function(users){
				// console.log('users =')
				// console.log(users)
				if(likers.length === 0){
					// console.log('no likes')
					drop.close()
					whoLiked.text = ''
				} else if(users.length === 1){
					// console.log('1 like')
					whoLiked.text= users[0].displayName()
				} else{
					// console.log('more than 1 like')
					for(var i=0; i<users.length; i++){
						whoLiked.text += users[i].displayName() + ', '
					}
				}
			}).done()
		}

		if(ticket.get(likesField).subject === undefined){
			numOfLikes.text = 0
			ticket.set('likes', likers)
		} else{
			// needs tested - how do I put ids in to test and get names
			numOfLikes.text = ticket.get(likesField).subject.length
			for(var i=0; i< ticket.get(likesField).subject.length; i++){
				likers.push(ticket.get(likesField).subject[i])
			}
			getLikersName()
		}

		likeButton.on('click', function(){
			api.User.current().then(function(curUser){ 
				var curUserIndex = ticket.get(likesField).subject.indexOf(curUser.subject._id)
				// console.log('index ' + curUserIndex)
				if(curUserIndex === -1){
					// console.log('adding to list')
					 // user isn't in list
					 likers.push(curUser.subject._id)
					 ticket.set('likes', likers)
					 // console.log(ticket.get(likesField).subject)
					 // likers.push(curUser.subject._id)
					 likeButton.src = __webpack_require__(/*! url-loader!./star1.png */ 3)
				} else{
					// console.log('taking off list')
					// user is in list 
					likers.splice(curUserIndex, 1)
					ticket.set('likes', likers)

					console.log('splice')
					console.log(likers)
					likeButton.src = __webpack_require__(/*! url-loader!./star.png */ 0)
				}
			}).done()
		})

		ticket.get(likesField).on('change', function(){
			// console.log('change')
			getLikersName()
			numOfLikes.text = ticket.get(likesField).subject.length
			// console.log(numOfLikes.text)
			// console.log(whoLiked.text)
		})

		// view likers
		numOfLikes.on('mouseover', function(){
			drop.open()
		})
		numOfLikes.on('mouseout', function(){
			drop.close()
		})
		// drop.style = Style({
		// 	$menu: {
		// 		border: '1px solid blue'
		// 	}
		// })
	}

	this.getStyle = function(){
		return Style({
			Image: {
				cursor: 'pointer'
			},
			Block: {
				border: '1px solid #ccc',
				Text: {
					display: 'block',
					marginBottom: 3
				}
			}
		})
	}
}))

/***/ }),
/* 2 */
/*!*********************!*\
  !*** ./dropDown.js ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var scrollStyle = Style({
    overflowY: 'scroll' // // overflow:auto doesn't work right for some godawful stupid css reason - http://stackoverflow.com/questions/32148519/widthauto-not-working-right-for-absolutely-positioned-div-when-scroll-bar-is-pr#32148618
})

// A button that can open and close a custom dropdown component
// emits:
// open - emitted when the dropdown is opened
// close - emitted when the dropdown is closed
// states:
    // direction - Vertical direction. Can either be 1 or -1. 1 means the menu is displayed below its button, -1 means the menu is displayed above its button.
    // horizontalDirection - Either 1 or -1. 1 means the menu extends beyond the right side of the button, -1 means the menu extends beyond the left side of the button.
    // height - Can either be undefined, or a number. If undefined, it means the height is not constrained. If defined, it gives the height in pixels the menu is constrained to.
    // width - Can either be undefined, or a number. If undefined, it means the width is not constrained. If defined, it gives the width in pixels the menu is constrained to.
// note that in styling this, you can style the menu (using $menu, or its gem selector) as if it were an actual child
var dropDown = proto(Gem, function(superclass) {
    this.name = 'dropDown'

    this.dropdownMenuStyle = Style({
        display: 'block',
        position: 'absolute',
        border: '1px solid black',
        marginTop: 2,
        padding: 2,
        backgroundColor: 'white',
        zIndex: 1000,

        $state: function(state) {
            if(state.height !== undefined) {
                return scrollStyle
                // overflow: 'auto'
            }
        }
    })

    this.defaultStyle = Style({
        $setup: function(block, style) {
            var dropdownStyle = getStyleForComponent(style.componentStyleMap, block.dropdown)
            if(dropdownStyle) {
                dropdownStyle = block.dropdownMenuStyle.mix(dropdownStyle).copy()

                // give it the full computed style map it would have it were an actual child
                var original = dropdownStyle.componentStyleMap
                dropdownStyle.componentStyleMap = {}
                if(block.parent !== undefined)
                    merge(dropdownStyle.componentStyleMap, block.parent.computedStyleMap)
                merge(dropdownStyle.componentStyleMap, style.componentStyleMap, original)

            } else {
                dropdownStyle = block.dropdownMenuStyle
            }
            block.dropdown.style = dropdownStyle
        },
        $kill: function(block) {
            block.dropdown.style = undefined
        },

        $wrapper: {
            display: 'block',
            position: 'static'
        }
    })

    // dropdown - The component to display when the Dropdown is opened. Note that this is mutated by being given the label 'menu'
        // dropdown.state:direction - set to either 1 if the menu is displayed below the button, and -1 if the menu is displayed above the button
        // dropdown.state:height - set to the height of the dropdown if the height  needs to be constrained, undefined if it doesn't need to be constrained (this is useful to do things like set 'overflow' to 'scroll' for example)
        // dropdown.getPotentialHeight() - (optional) If available, called to get the full potential height of the dropdown. If not available, defaults to the dropdown's scrollHeight
    // maintainDropdownPosition - (default:true) If true, while the dropdown is open, it will be repositioned constantly so that it tracks the movement of the button Component
    this.build = function(/*[label,]button, dropdown[, maintainDropdownPosition]*/) {
        if(arguments[0] === undefined || typeof(arguments[0]) === 'string') {
            var label = arguments[0]
            var argn = 1
        } else {
            var argn = 0
        }

        this.button = arguments[argn]
        this.dropdown = arguments[argn+1] // this.dropdown is deprecated
        this.maintainDropdownPosition = arguments[argn+2]
        if(this.maintainDropdownPosition === undefined) {
            this.maintainDropdownPosition = true
        }

        this.label = label
        
        this.isOpen = false
        
        this.dropdown.domNode.style.position = 'absolute'

        this.button.label = 'button'

        this.add(this.button) // Block('wrapper', [buttonComponent/*, dropdown])) // wrap it in a container to get around weirdness with parents that have css overflow auto/hidden
    }

    this.close = function() {
        if(this.isOpen) {
            this.isOpen = false
            this.dropdown.detach()
            //this.dropdown.visible = false
            if(this.interval !== undefined) {
                clearInterval(this.interval)
            }

            this.emit('close')
        }
    }

    this.open = function() {
        if(!this.isOpen) {
            this.isOpen = true

            var that = this

            // find the closest component that can obscure the buttonComponent if it scrolls them above its boundaries
            var overflowView = findOverflowView(this.domNode, 'y')
            var overflowViewBoundary = overflowView.getBoundingClientRect()

            // menu positioning
            //repositionMenu(that, overflowViewBoundary, true)  // i guess we don't need this, and it was causing annoying flicker
            if(this.maintainDropdownPosition) {
                // only reposition (and make visible) the menu after a return back to the scheduler, cause otherwise it doesn't take the explicit styles into account for some reason
                this.interval = setInterval(function() {
                    repositionMenu(that, overflowViewBoundary)
                },50)
            } else {
                // only reposition (and make visible) the menu after a return back to the scheduler, cause otherwise it doesn't take the explicit styles into account for some reason
                setTimeout(function() {
                    repositionMenu(that, overflowViewBoundary)
                },50)
            }

            that.dropdown.attach()  // attach at the top level so it isn't confined to the boundaries of its parents
            that.emit('open')
        }
    }

    this.toggle = function() {
        if(this.isOpen) {
            this.close()
        } else {
            this.open()
        }
    }
})

// repositions the dropdown component according to where the button component is on the page
// overflowViewBoundary -  the boundingClientRect of the block who's boundaries can obscure the buttonComponent
function repositionMenu(that, overflowViewBoundary, firstRepositioning) {
    var buffer = 1 // some distance the menu is from the button (not sure why its there, but this helps work around it)

    var buttonBounds = that.button.domNode.getBoundingClientRect()
    var dropdown = that.dropdown

    if(buttonBounds.bottom > overflowViewBoundary.top && buttonBounds.top < overflowViewBoundary.bottom    // make sure the button is still visible
       && buttonBounds.right > overflowViewBoundary.left && buttonBounds.left < overflowViewBoundary.right
    ) {
        var dropdownStyle = getComputedStyle(that.dropdown.domNode) // is this expensive? Maybe store it as a property on 'that'?

        setDimensionAndPosition('v', dropdown, dropdownStyle,buttonBounds, firstRepositioning)
        setDimensionAndPosition('h', dropdown, dropdownStyle,buttonBounds, firstRepositioning)
//        dropdown.domNode.style.left = buttonBounds.left+'px'
        dropdown.visible = true
    } else  {
        that.dropdown.visible = false
    }
}

// sets either the height and vertical position or the width and horizontal position, depending on the arguments
// type - Either "v" or "h"
// dropdown - The dropdown gem
// dropdownStyle - A result from getComputedStyle(node)
// buttonBounds - The BoundingClientRect of the button
function setDimensionAndPosition(type, dropdown, dropdownStyle, buttonBounds, firstPositioning) {
    if(type === 'v') {
        var lower = 'bottom'
        var upper = 'top'
        var dimension = 'height'
        var directionName = 'direction'

        var potentialDimension = 'getPotentialHeight'
        var scrollDimension = 'scrollHeight'
        var clientDimension = 'clientHeight'
    } else {
        var lower = 'right'
        var upper = 'left'
        var dimension = 'width'
        var directionName = 'horizontalDirection'

        var potentialDimension = 'getPotentialWidth'
        var scrollDimension = 'scrollWidth'
        var clientDimension = 'clientWidth'
    }

    if(type === 'v') {
        var upperOffset = buttonBounds[upper]
        var lowerOffset = buttonBounds[lower]
        var buffer = 1 // some distance the menu is from the button (not sure why its there, but this helps work around it)
    } else {
        // these are switched because in the normal case, the dropdown should be pushed right to the distance of the *left* boundary of the button (and vice versa)
        var upperOffset = buttonBounds[lower]
        var lowerOffset = buttonBounds[upper]
        var buffer = 0
    }

    var dropdownMarginUpper = getStylePxAmount(dropdownStyle, 'margin-'+upper)
    var dropdownMarginLower = getStylePxAmount(dropdownStyle, 'margin-'+lower)

    var dropdownMargins = dropdownMarginUpper + dropdownMarginLower

    if(dropdown[potentialDimension] !== undefined) {
        var dropdownDimension = dropdown[potentialDimension]()
    } else {
        var dropdownDimension = dropdown.domNode[scrollDimension]
    }

    var amountCutOffDownward = lowerOffset + dropdownDimension + dropdownMargins - document.documentElement[clientDimension]
    var amountCutOffUpward = dropdownDimension + dropdownMargins - upperOffset

    if(amountCutOffDownward < 0) { // if its visible by being displayed underneath
        var direction = 1
        var newUpper = lowerOffset-buffer
    } else if(amountCutOffUpward < 0) {  // if its only visible by being displayed upward
        var direction = -1
        var newUpper = upperOffset-dropdownDimension+buffer // puts it above rather than below - note that dropdownDimension should be the same as the clientHeight *after* this function runs (which is what we care about here)
    } else {
        if(amountCutOffDownward < amountCutOffUpward) { // if you can see more of the dropdown by opening it downward
            var direction = 1
            var newDimension = dropdownDimension+dropdownMarginLower - amountCutOffDownward
            var newUpper = lowerOffset-buffer
        } else {
            var direction = -1
            var newDimension = dropdownDimension+dropdownMarginUpper - amountCutOffUpward
            var newUpper = newDimension-upperOffset+buffer
        }
    }

    dropdown.domNode.style[upper] = newUpper+'px'
    if(newDimension !== undefined) {
        if(firstPositioning || dropdown.state.subject[dimension] !== newDimension) {
            dropdown.domNode.style[dimension] = newDimension+'px'
            dropdown.state.set(dimension, newDimension)
        }
    } else {
        if(firstPositioning || dropdown.state.subject[dimension] !== undefined) {
            dropdown.domNode.style[dimension] = ''
            dropdown.state.set(dimension, undefined)
        }
    }

    if(firstPositioning || dropdown.state.subject[directionName] !== direction) {  // don't constantly reset things if they're already that value
        dropdown.state.set(directionName, direction)
    }
}



// gets the right style from the styleMap, depending on the gem's `name` and `label` (`label` styles take precedence)
// takes the component's inheritance tree into account (relies on the gem.constructor.parent property)
var getStyleForComponent = function (styleMap, gem) {
    if(styleMap === undefined)
        return undefined

    return getStyleForLabel(styleMap, gem) || getStyleForGemName(styleMap, gem)
}

var getStyleForLabel = function(styleMap, gem) {
    if(gem.label !== undefined && '$'+gem.label in styleMap) {
        return styleMap['$'+gem.label]
    }
}
var getStyleForGemName = function(styleMap, gem) {
    var constructor = gem.constructor
    while(constructor !== undefined) {
        var style = styleMap[constructor.name]
        if(style !== undefined) {
            return style
        } else {
            constructor = constructor.parent
        }
    }
}


// Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
// any number of objects can be passed into the function and will be merged into the first argument in order
// returns obj1 (now mutated)
var merge = function(obj1, obj2/*, moreObjects...*/){
    return mergeInternal(arrayify(arguments), false)
}
function mergeInternal(objects, deep) {
    var obj1 = objects[0]
    var obj2 = objects[1]

    for(var key in obj2){
       if(Object.hasOwnProperty.call(obj2, key)) {
            if(deep && obj1[key] instanceof Object && obj2[key] instanceof Object) {
                mergeInternal([obj1[key], obj2[key]], true)
            } else {
                obj1[key] = obj2[key]
            }
       }
    }

    if(objects.length > 2) {
        var newObjects = [obj1].concat(objects.slice(2))
        return mergeInternal(newObjects, deep)
    } else {
        return obj1
    }
}

function arrayify(a) {
    return Array.prototype.slice.call(a, 0)
}


// returns the closest ancestor dom node that has a non-visible scroll type for the given axis
// axis - either 'x' or 'y'
var findOverflowView = function(domNode, axis) {
    var overflowView = domNode.parentNode
    while(true) {
        var overflowStyle = window.getComputedStyle(overflowView).getPropertyValue('overflow-'+axis)
        if(overflowView.parentNode === null || overflowView.parentNode === document || (overflowStyle !== 'visible' && overflowStyle !== '')) {
            break;
        }
        overflowView = overflowView.parentNode
    }
    return overflowView
}

// style - an object returned from getComputedStyle
// property - a css property
var getStylePxAmount = function(style, property) {
    var text = style.getPropertyValue(property)
    return parseInt(text.slice(0,text.length-2), 10)
}

// comment out exports if using original.html
module.exports = dropDown

/***/ }),
/* 3 */
/*!*********************************************!*\
  !*** ./node_modules/url-loader!./star1.png ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAzklEQVR4Ac3NMSuEcRzA8c8Tq3oMMlp043WThV3GMxgspJSXcCmzjAqLjcHiZUgpk8WOS7KxuFz9PMOlPP3v32Pi830BX39moepXzp3R3KyBDzMa2xPCroYmPQnhwYRG1sSoVVmlliVdt2LUja5FLaWanr6ByDTQ1/OtcCDk21f4YcdQSPdpW8KKd5HozTJpHX1R61FbxqWodSHrOXHImBeJ5oy1IVQZOqwaClXWjXUqhCtt0HEthBNj3XuxqQBQ2PLqjrTSkVLdtGNT/rMveWmS+mb4BNsAAAAASUVORK5CYII="

/***/ })
/******/ ]);
});
//# sourceMappingURL=likeButton.umd.js.map