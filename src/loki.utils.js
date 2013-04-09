/**
	* @file Parent namespace for Loki Utilities
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @see {@link loki}
	* @see {@link loki.utils}
	* @see {@link https://github.com/joshrhoades/loki|Loki on Github}
*/

/**
	* Global Shims (prototype/natives) and extensions
*/
/**
	* Extends JavaScript Native to add `.startsWith()` to the `string` `prototype` if it is not already defined/available to the browser.
	*	Note that this is case-sensitive.
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @global
	* @method
	* @since 0.0.1
	* @version 1.0.0
	* @param {string} str - String to check for a starting match
	* @see endsWith
	* @example 'Hello World!'.startsWith('He');//returns true
	* @example
var strMyString	= 'Lorem Ispum Marblehead Faces'
	, strMatch	= 'BLUEY!';
if ((strMyString).startsWith(strMatch)) {
	//returns false, no match, would not execute
} else {
	//this would execute, starts match
}
	* @returns {boolean} `true` if string starts with the provided argument check, `false` if string DOES NOT start with the provided argument check
*/
if (typeof String.prototype.startsWith !== 'function') {
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
};
/**
	* Extends JavaScript Native to add `.endsWith()` to the `string` `prototype` if it is not already defined/available to the browser.
	*	Note that this is case-sensitive.
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @global
	* @method
	* @since 0.0.1
	* @version 1.0.0
	* @param {string} str - String to check for a starting match
	* @see startsWith
	* @example 'Hello World!'.endsWith('TIMMY!');//returns false
	* @example
var strMyString	= 'Lorem Ispum Marblehead Faces'
	, strMatch	= 'BLUEY!';
if ((strMyString).endsWith(strMatch)) {
	//returns false, no match, would not execute
} else {
	//this would execute, endings match
}
	* @returns {boolean} `true` if string ends with the provided argument check, `false` if string DOES NOT end with the provided argument check
*/
if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function (str){
		return this.slice(-str.length) == str;
	};
};
/**
	* Create trim function for browsers that don't support trimming trailing and leading whitespace, such as <= IE8
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @version 1.0.0
	* @since 0.0.1
	* @global
	* @example var strTrim = '    4 spaces before, 8 spaces after        '.trim();//strTrim == '4 spaces before, 8 spaces after'
	* @example
var trimTestBefore	= '    4 spaces before, 8 spaces after        '
	, trimTestAfter	= '4 spaces before, 8 spaces after'
;
if (trimTestBefore.trim() == trimTestAfter) {
	//true, execute
}
	* @method
	* @returns {string} Returns string with leading/trailing whitespace removed
*/
if (typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	};
};
/**
	* Create Array.indexOf if it's not natively available
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @version 1.0.0
	* @since 0.0.1
	* @param {string} val The value indexOf is checking against
	* @returns {number} The index of the first occurrance of val, based on the supplied Array.
	* @example ['one','two','three'].indexOf('three'); //outputs 2
	* @global
	* @method
*/
if (typeof Array.prototype.indexOf !== "function") {
	Array.prototype.indexOf = function(val) {
		for (var i = 0, len = this.length; i < len; i++) {
			if(val === this[i]) {
				return i;
			}
		}
		return -1;
	};
};
/**
	* Global EcmaScript 5 shim to extend JavaScript Natives to add the `isArray` functionality to Array operations for browsers that do not support it.
	*	If `isArray` exists, this function will pass through by default without adding overhead
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @global 
	* @method
	* @since 0.0.1
	* @version 1.0.0
	* @see {@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray}
	* @param {array} arrCheck - Alleged array object to check
	* @example if (Array.isArray(['one','two','three'])) { ... }
	* @example bIsArray = Array.isArray(myArr);
	* @returns {boolean} TRUE If object toString type == `[object Array]`
	* @returns {boolean} FALSE If object toString type != `[object Array]`
*/
if (typeof(Array.isArray) != 'function') {
    Array.isArray = function isArray(arrCheck) {
    	return Object.prototype.toString.call(arrCheck) == '[object Array]';
    };
};

var loki = loki || {};
/**
	* Loki Utilities Namespace
	* @namespace
	* @added 4/8/13
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @version 0.0.1
*/
loki.utils = {
/**
	* Common logging function to handle global logging with timestamps, and allow for production (no debug) vs. non-production (debug) modes.
	* 	Function will also determine if the console object is available (or not) and supress it if needed (for older browsers).
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @version 0.0.1
	* @since 0.0.1
	* @method
	* @memberof loki.utils
	* @fires console events (of type `Info`, `Warn`, or `Error`) based on second argument passed in of `0`, `1`, or `2`.
	* 	If second argument for console type is ommitted, defaults to `console.info` (`0`)
	* @param {string} strLog - string of information to log
	* @param {number} [intType=0] - type of log event: Info (0)|Warn (1)|Error (2), defaults to 0 if not specified
	* @requires BLS.utils.debugEnabled
	* @property {string} strLog - ternary operator, sets strLog to be the passed in value from callee, or switch to error message if no value passed in from callee
	* @property {string} strReturn - concatenates strLog (previously set) with bracketed messaging for easy idenfification of BLS logging events in console
	* @todo If Console is undefined, we still need to be able to log events. Right now we supress logging if there is no console.
	*	Add an alternative for all scenarios.
	* @example <caption>logs a `console.error` message</caption>
loki.utils.doLogging('fn myFunction threw an error of "' + errorString + '"',2);
	* @example <caption>logs a `console.warn` message</caption>
loki.utils.doLogging('fn myFunction could not render a value, reverting to default: "' + strDefault + '"',1);
	* @example <caption>logs an `console.info` message</caption>
loki.utils.doLogging('fn myFunction received update message from XHR source, switching views to: "' + viewNewMode + '"',0);
	* @example <caption>logs a `console.info` message, second argument ommitted/default</caption>
loki.utils.doLogging('fn myFunction received update message from XHR source, switching views to: "' + viewNewMode + '"');
	* @returns {console} - `console[intType](strReturn)`: console of debug intro + timestamp at time of execution + string to log (strLog)
*/
	doLogging: function(strLog,nType) {
		var nType			= nType || 0
			, strLog		= (strLog) ? strLog : 'No log message was set!'
			, arrLogTypes	= ['info','warn','error']
			, strReturn		= loki.refs.logging.logIntro + strLog + loki.refs.logging.logExit
		;
		/**
			* Push logged messages to appropriate global logs container
		*/
		switch(nType) {
			case 0:
				loki.refs.logs.info.push(strLog);
				break;
			case 1:
				loki.refs.logs.warn.push(strLog);
				break;
			case 2:
				loki.refs.logs.error.push(strLog);
				break;
		}
		if (typeof console === 'undefined' || typeof console[arrLogTypes[nType]] === 'undefined') {
			//if console is not unavailable (in certain older browsers), suppress events. TODO to replace this with an IE-friendly logging event
		} else {
			//we have console, and the specific directive for console is available, fire
			return console[arrLogTypes[nType]](strReturn);
		}
	}
/**
    * This function will qet all queryString elements available by name (key), if no matches are found, it returns `FALSE`. Revised 4/8/13 for performance,
    *	drastically faster operation now, and using dependency injection for unit testing abilities.
    * @author Josh Rhoades <joshua.rhoades@gmail.com>
    * @version 0.0.3
    * @added 4/8/13
    * @since 0.0.1
    * @method
    * @memberof loki.utils
    * @param {string} key - queryString parameter to match on
    * @param {object} theContext The object to fetch against, allows for dependency injection/testability. If not passed in, function will default to use
    *	the global `window` object
    * @returns {boolean} Returns `FALSE` if no match
    * @returns {string} Returns the string value of the matched queryString parameter
    * @example
//common usage
var debugMode = loki.utils.getQueryString('debug');//returns false if `debug=true` is not in the queryString
if (debugMode && debugMode.toLowerCase() == 'true') {
	//we're in debug mode!
} else {
	//we're not in debug mode!
}
	* @example
//passing in context, such as overriding the window object for Unit Tests
var localContext = {
		location: {
			search: '?test=truethify'
		}
	}
	, strTruth = loki.utils.getQueryString('test',localContext);//returns 'truethify'
;
*/
    , getQueryString : function(strKey, theContext) {
    	var theContext	= theContext || window
    		, arrSearch	= theContext.location.search.split(strKey + '=')[1]
    	;
    	return arrSearch ? decodeURIComponent(arrSearch.split('&')[0]) : false;
    }
/**
	* Adapted from John Resig's cross-browser function for adding an eventListener to an element.
	* @name addEvent
	* @author John Resig
	* @param {object} obj The object the eventListener is being attached to.
	* @param {string} type The type of event to listen for.
	* @param {function} fn The callback function that should be triggered when the event occurs.
	* @param {object or string} container Paramaters to pass to your function when the event is fired.  Could be an object or string.
	* @example
loki.utils.addEvent(handle, "click", fTest, {name:"addam", age:"33"})
// calls the function "fTest" like this:
fTest(e, args) // e = event...; args = {name:"addam", age:"33"}
	* @method
	* @memberof loki.utils
	* @see {@link http://ejohn.org/projects/flexible-javascript-events/}
	* @see {@link loki.utils.removeEvent }
*/
	, addEvent: function (obj, type, fn, args) {
		var args = args || false; // to allow arguements to be passed forward
		//Supports attachEvent (i.e. IE), pass the captured event to the callback when triggered.
		if (obj.attachEvent) {
			obj['e'+type+fn] = fn;
			obj[type+fn] = function() {
				var evt = window.event;
				//Add in the preventDefault function on the event object, for IE compatibility
				if (typeof(evt.preventDefault) != "function") {
					evt.preventDefault = function() { this.returnValue = false; };
				}
				obj['e'+type+fn](evt);
			};
			obj.attachEvent('on'+type,  (function(args) {
				return function(e){
					//e.stopPropagation();
					e.returnValue = false;
					obj[type+fn(e, args)]
				};
			})(args), false);
		} else {
			/* Use the standard method. */
			obj.addEventListener(type, (function(args){ // function with arguement
				return function(e){ // return with event
					e.stopPropagation();
					e.preventDefault()	
					fn(e, args) // pass event & arguements to function
				};
			})(args), false); // args for the event itself
		}
		loki.refs.additions.listeners.push({ theObject: obj, theType: type, theFn: fn, theArgs: args  });
		return obj;
	}
/**
	* John Resig's cross-browser function for removing an eventListener from an element.
	* @name removeEvent
	* @author John Resig
	* @param {object} obj The object the eventListener is being removed from.
	* @param {string} type The type of event being listened for.
	* @param {function} fn The callback function that's being triggered when the event occurs.
	* @method
	* @memberof loki.utils
	* @see {@link http://ejohn.org/projects/flexible-javascript-events/}
	* @see {@link loki.utils.addEvent }
*/
	, removeEvent: function (obj, type, fn) {	
		if (obj.detachEvent) {
			if (obj[type + fn]) {
				obj.detachEvent('on' + type, obj[type + fn]);
				obj[type+fn] = null;
			} else {
				obj.detachEvent('on' + type);
			}
		} else {
			/* Use the standard method. */
			obj.removeEventListener(type, fn, false);
		}
	}
/**
	* A global utility, that FE will use to queue up functions to be run on document ready.
	* This method will be easier to debug, and more maintainable than a bunch of $(document).ready - type calls.
	* @name readyQueue
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @version 0.0.2
	* @since 0.0.1
	* @added 4/8/13
	* @param {object} options The passed set of parameters
	* @returns {object} What's being returned
	* @example loki.utils.readyQueue.add({fn:function(){ loki.core.register("BLS-Notification", BLS.core.serviceCall, {analytics:false})}});
	* @example loki.utils.readyQueue.add({fn:function(){ loki.core.startAll()}});
	* @example loki.utils.readyQueue.add({ fn:loki.apps.sessionTimer().init() });
	* @method
	* @memberof loki.utils
*/
	, readyQueue : (function(document, undefined) {
		var mAPI			= {}
			, bAlreadyRun	= false
			, mQueue		= []
		;
	
		function add(options) {
			options = options || {};
			if (typeof(options.fn) != "function") {
				return;
			}
			if (bAlreadyRun === true) {
				runFunction(options);
			} else {
				mQueue.push(options);
			}
		}
		mAPI.add = add;
		function runFunction(options) {
			try {
				options["fn"]();
			} catch(err) {
				this.utils.doLogging(err, 2);
			}
		}
		function onReady() {
			var nLength = mQueue.length;
			if (bAlreadyRun === true) {
				return;
			}
			for (var i = 0, numItems = nLength; i < numItems; i++) {
				runFunction(mQueue[i]);
			}
			bAlreadyRun = true;
		}
	
		/* Document Ready Binding */
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", onReady, false);
		} else {
			if (window.addEventListener) {
				window.addEventListener("load", onReady, false);
			} else {
				if (window.attachEvent) {
					window.attachEvent("onload", onReady);
				} else {
					if (document.getElementById) {
						window.onload = onReady();
					}
				}
			}
		}
		return mAPI;
	})(document)
//end util public functions
};
//fire status
loki.componentAvailable('utils');