import mongoose from "mongoose";

const musicSchema = mongoose.Schema(
  {
    title: String,
    artist: String,
    album: String,
    releaseYear: Number,
    genre: String,
    userId: String,
  },
  { timestamps: true }
);

export default mongoose.model("musics", musicSchema);
