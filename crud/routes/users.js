var express = require('express');
var router = express.Router();


/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.post('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    console.log(userToDelete);
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: 'success' } : { msg:'error: ' + err });
    });
});

router.post('/edituser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToEdit = req.params.id;
    console.log(userToEdit);

    collection.update({ '_id' : userToEdit },{$set : req.body }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});



module.exports = router;
