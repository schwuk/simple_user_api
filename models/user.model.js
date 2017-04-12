module.exports = function (mongoose) {
  var modelName = "user";
  var Types = mongoose.Schema.Types;
  var Schema = new mongoose.Schema({
    firstname: {
      type: Types.String
    },
    surname: {
      type: Types.String
    },
    email: {
      type: Types.String,
      required: true,
      unique: true
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {}
  };

  return Schema;
};
