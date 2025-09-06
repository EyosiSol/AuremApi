import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const GetProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const UpdateProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, oldPassword, newPassword } = req.body;

  try {
    // 1. Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // 2. Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 3. Build update object
    const updateFields = {};

    if (name) updateFields.name = name;

    if (newPassword) {
      // Require oldPassword to change password
      if (!oldPassword) {
        return res
          .status(400)
          .json({ message: "Old password required to set a new one" });
      }

      const isMatch = await comparePassword(oldPassword, user.password);

      if (!isMatch) return res.status(401).json({ message: "Wrong password" });

      updateFields.password = await hashPassword(newPassword);
    }

    // 4. Update user and return updated doc
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    res.json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
