module.exports = app => {
    const sites = require("../controllers/site.controller.js");

    const router = require("express").Router();

    // Create a new Tutorial
    router.post("/", sites.create);

    // Retrieve all Tutorials
    router.get("/", sites.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:uuid", sites.find);

    // Update a Tutorial with id
    router.put("/:uuid", sites.update);

    // Delete a Tutorial with id
    router.delete("/:uuid", sites.delete);

    app.use("/api/sites", router);
};