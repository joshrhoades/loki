/**
	* @file Parent namespace for Loki
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @see {@link loki}
	* @see {@link https://github.com/joshrhoades/loki|Loki on Github}
*/

/**
	* Loki Namespace
	* @namespace
	* @added 4/8/13
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @version 0.0.1
	* @since 0.0.1
	* @property {object} loki The global.parent `loki` object
	* @property {boolean} loki.debug The flag of whether or not loki should act in debug mode
	* @property {object} loki.load Object containing specific loading references
	* @property {string} loki.load.path The default path to loki's dependent files, to be used by {@link loki.addComponent}
	* @property {string} loki.load.target Allows specification of whether Loki should load in the `HEAD` or `BODY`
	* @property {object} loki.components Object specifying the loki components to be loaded
	* @property {object} loki.components.componentName An object representing a component to be loaded, such as `refs`
	* @property {string} loki.components.componentName.file The file path to be loaded for this component
	* @property {boolean} loki.components.componentName.loaded The `boolean` status of whether or not the component has loaded.
	*	Is updated via {@link loki.componentAvailable}
	* @returns {object} Returns all loki objects, functions, classes, namespaces, and modules
*/
var loki = loki || {
	debug: true
	, load: {
		path: 'src/'
		, target: 'head'
	}
	, components: {
		refs: {
			file: 'loki.refs.js'
			, loaded: false
		}
		, utils: {
			file: 'loki.utils.js'
			, loaded: false
		}
		, apps: {
			file: 'loki.apps.js'
			, loaded: false
		}
	}
/**
	* Function that allows Loki namespace to be extended on the fly, but also load self dependencies
	* This requires `loki.components` to be populated (either at instantiation or by dynamically updating, such as via a plugin) with an object represting
	*	the component to be loaded
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @version 0.0.2
	* @since 0.0.1
	* @memberof loki
	* @method
	* @example
loki.addComponent('componentObjectName');
*/
	, addComponent: function(component) {
		var objComponent	= this.components[component]
			objScript		= document.createElement('script')
			objTarget		= document.getElementsByTagName(this.load.target);
		;
		if (objComponent && objComponent.loaded === false) {
			objScript.setAttribute('type', 'text/javascript');
			objScript.setAttribute('src', this.load.path + objComponent.file);
			objTarget[0].appendChild(objScript);
		}
	}
/**
	* Function verifies that a component has been loaded. Each component, such as `loki.refs.js` fires a final call to `loki.componentAvailable('name')` to verify
	*	it is available and ready
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @version 0.0.2
	* @since 0.0.1
	* @memberof loki
	* @method
	* @example
loki.componentAvailable('componentObjectName');
*/
	, componentAvailable: function(component) {
		this.components[component].loaded = true;
		if (this.debug) { console.info(component,'has loaded'); }
		if (this.listener) {
			this.listener(component);
		}
	}
	, listener: function(component) {
		//expose listeners if needed
	}
	, init: function() {
		for (prop in this.components) {
			if (this.components.hasOwnProperty(prop)) {
				if (!prop.loaded) {
					this.addComponent(prop);
				}
			}
		}
	}
};
//start your engines
(function() {
	loki.init();
})();
