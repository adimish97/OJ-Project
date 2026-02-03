import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    description: {
      type: String,
      required: true
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
      index: true
    },

    timeLimit: {
      type: Number, // milliseconds
      required: true,
      default: 1000
    },

    memoryLimit: {
      type: Number, // MB
      required: true,
      default: 256
    },

    inputFormat: {
      type: String,
      required: true
    },

    outputFormat: {
      type: String,
      required: true
    },

    constraints: {
      type: String
    },

    tags: {
      type: [String],
      index: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }

    // isPublished: {
    //   type: Boolean,
    //   default: false
    // }
  },
  {
    timestamps: true
  }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
