const autoIncrementModelID = require('./counterModel');
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            uuid: { type: Number, unique: true, min: 1 },
            version: String,
            name: String,
            description: String,
            main:{
                title: String,
                icon16: String,
                icon32: String,
                touchIcon: String,
                manifest: String,
                maskIcon: String,
            }
        },
        {timestamps: true}
    );

    schema.pre('save', function (next) {
        if (!this.isNew) {
            next();
            return;
        }

        autoIncrementModelID('activities', this, next);
    });

    return mongoose.model("site", schema);
};