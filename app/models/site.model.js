const mongoose = require("mongoose");
const Site = mongoose.model(
    "Site",
    new mongoose.Schema({
            title: { type: String },
            description: { type: String },
            published: { type: Boolean },
            website: {
                name: { type: String },
                version: { type: String },
                webTitle: { type: String },
            },
            assets: {
                icon16: { type: String },
                icon32: { type: String },
                touchIcon: { type: String },
                manifest: { type: String },
                maskIcon: { type: String },
            }
        },
        {timestamps: true}
    ));
module.exports = Site;