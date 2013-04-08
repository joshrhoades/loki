/**
	* @file Parent namespace for Loki References
	* @author Josh Rhoades <joshua.rhoades@gmail.com>
	* @added 4/8/13
	* @see {@link loki}
	* @see {@link loki.refs}
	* @see {@link https://github.com/joshrhoades/loki|Loki on Github}
*/
var loki = loki || {};
loki.refs = {
	namespace: 'loki'
	, version: '0.0.1'
	, logging: {
		logIntro: 'Loki Logging Message:' + "\n"
		, logExit: "\n"
	}	
};
//logs
loki.refs.logs = loki.refs.logs || {};
loki.refs.logs.info = loki.refs.logs.info || [];
loki.refs.logs.warn = loki.refs.logs.warn || [];
loki.refs.logs.error = loki.refs.logs.error || [];
//dom additions
loki.refs.additions = {
	dom: []
	, listeners: []
};
//fire status
loki.componentAvailable('refs');