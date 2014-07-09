/**
 *  find recursively in a given folder for a given pattern into file names
 *  returns an array of matching files
 */

var fs = require('fs'),
    path = require('path'),
    util = require('util');

/**
 *  @param root path to the dir to search in
 *  @param regexp regexp to test filenames against
 *  @return array of matched files (path are relative to dirname)
 */
module.exports = exports = function(root, regexp) {

    if (!fs.existsSync(root) || !fs.lstatSync(root).isDirectory()) {
        throw new Error(util.format('%s must be a valid directory', root));
    }

    var results = [];

    (function _find(dirName, regexp) {
        var content = fs.readdirSync(dirName);

        content.forEach(function(item, index) {
            var itemPath = path.join(dirName, item);
            var isDir = fs.lstatSync(itemPath).isDirectory();

            // find recursively
            if (!isDir) {
                if (regexp.test(item)) {
                    relativePath = itemPath.replace(root, '');
                    results.push(relativePath);
                }
            } else {
                _find(itemPath, regexp);
            }
        });
    }(root, regexp));

    return results;
}
