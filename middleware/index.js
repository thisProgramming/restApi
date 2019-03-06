function checkDir(req, res, next) {
    if(req.params.dir.search(/^(up|down)$/) == -1) {
        let error = new Error('You can only vote down or up.');
        next(error);
    } else {
        next();
    }
}

function answerSort(a, b) {
    if(a.votes === b.votes) {
        return b.updated - a.updated;
    } else {
        return b.votes - a.votes;
    }
}

module.exports.checkDir = checkDir;
module.exports.answerSort = answerSort;