module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            published: Boolean,
            name: String,
            version: String,
            webTitle: String,
            icon16: String,
            icon32: String,
            touchIcon: String,
            manifest: String,
            maskIcon: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("site", schema);
};