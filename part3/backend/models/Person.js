import mongoose from "mongoose";
import { Schema } from "mongoose";

console.log("Connecting to Data Base...");
mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: number => /^\d{2}-\d{2,15}$/.test(number),
      message: props => `${props.value} is not a valid phone number`
    }
  },
});
personSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    // delete returnedObject.__v
  }
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model("Person", personSchema);