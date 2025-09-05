import mongoose from "mongoose";

const musicSchema = mongoose.Schema(
  {
    title: String,
    artist: String,
    album: String,
    releaseYear: Number,
    genre: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("musics", musicSchema);
