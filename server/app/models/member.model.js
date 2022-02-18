module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      code: String,
      alegraId: String,
      email: String,
      phone: String,
      address: String,
      birdDate: String,
      referenceCode: String
    },
    { timestamps: true }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Member = mongoose.model("member", schema);
  return Member;
};
