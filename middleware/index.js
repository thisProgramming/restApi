function checkDir(req, res, next) {
    if(req.params.dir.search(/^(up|down)$/) == -1) {
        let error = new Error('You can only vote down or up.');
        next(error);
    } else {
        next();
    }
}

module.exports = checkDir;