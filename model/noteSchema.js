const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    isRemoved: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const noteModel = mongoose.model("Note", NoteSchema);

module.exports = noteModel;
