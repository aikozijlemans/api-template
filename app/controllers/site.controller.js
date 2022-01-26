const db = require("../models");
const Site = db.sites;

// Create and Save a new Site
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Site
    const site = new Site({
        uuid: req.body.uuid,
        version: req.body.version,
        name: req.body.name,
        description: req.body.description,
        main:{
            title: req.body.main.title,
            icon16: req.body.main.icon16,
            icon32: req.body.main.icon32,
            touchIcon: req.body.main.touchIcon,
            manifest: req.body.main.manifest,
            maskIcon: req.body.main.maskIcon,
        }
    });

    // Save Site in the database
    site
        .save(site)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the site."
            });
        });
};

// Retrieve all Site from the database.
exports.findAll = (req, res) => {
    const uuid = req.query.uuid;
    const condition = res.body

    Site.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Site with an uuid
exports.find = (req, res) => {
    var response = [];
    console.log(req.query)

    // this would usually adjust your database query
    if(typeof req.query.uuid != 'undefined'){
        sites.filter(function(site){
            if(site.uuid.toInt() === req.query.uuid){
                response.push(site);
            }
        });
    }

    // this would usually adjust your database query
    if(typeof req.query.location != 'undefined'){
        sites.filter(function(site){
            if(site.location === req.query.location){
                response.push(site);
            }
        });
    }

    // de-duplication:
    response = _.uniqBy(response, 'uuid');

    // in case no filtering has been applied, respond with all sites
    if(Object.keys(req.query).length === 0){
        response = sites;
    }

    res.json(response);
};

// Update a Site by the uuid in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const uuid = req.params.uuid;

    Site.findOne(uuid, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update site with uuid=${uuid}. Maybe Site was not found!`
                });
            } else res.send({ message: "site was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with uuid=" + uuid
            });
        });
};

// Delete a Site with the specified uuid in the request
exports.delete = (req, res) => {
    const uuid = req.params.uuid;

    Site.findByuuidAndRemove(uuid, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete site with uuid=${uuid}. Maybe site was not found!`
                });
            } else {
                res.send({
                    message: "Site was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete site with uuid=" + uuid
            });
        });
};