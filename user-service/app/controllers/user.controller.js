const UserModel = require("../models/user.model");

exports.create = (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return res.status(400).send({message: "User cannot be empty"});
    }

    const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({message: "Unable to persist user"});
    });
};

exports.findAll = (req, res) => {
    UserModel.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({message: "Error retrieving users"});
    });
}

// Find a single note with a noteId
exports.findOne = (req, res) => {
    console.log("Params: ", req.params);
    UserModel.findById(req.params.userId)
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(404).send({message: "COuld not find user"});
    })
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
// Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find note and update it with the request body
    UserModel.findByIdAndUpdate(req.params.userId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.userId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    UserModel.findByIdAndRemove(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
        });
    });
};