;
const uniqueValidator = require("mongoose-unique-validator");
const url = process.env.MONGODB_URI;

console.log(`Connected to ${url}`);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

const phoneBookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minLength: 3 },
  number: { type: String, required: true, minLength: 8 }
});

phoneBookSchema.plugin(uniqueValidator);

phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("PhoneBook", phoneBookSchema);
