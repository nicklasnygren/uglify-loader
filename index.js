var UglifyJS = require("uglify-js");
var loaderUtils = require('loader-utils');

module.exports = function(source, inputSourceMap) {
    var callback = this.async();

    if (this.cacheable) {
        this.cacheable();
    }

    var opts = this.options['uglify-loader'] || {};
    opts.inSourceMap = inputSourceMap;
    // just an indicator to generate source maps, the output result.map will be modified anyway
    opts.outSourceMap = "out.map.js";
    opts.fromString = true;

    var result = UglifyJS.minify(source, opts);

    var sourceFilename = loaderUtils.getRemainingRequest(this);
    var current = loaderUtils.getCurrentRequest(this);
    var sourceMap = JSON.parse(result.map);
    sourceMap.sources = [sourceFilename];
    sourceMap.file = current;
    sourceMap.sourcesContent = [source];

    callback(null, result.code, sourceMap);
};
