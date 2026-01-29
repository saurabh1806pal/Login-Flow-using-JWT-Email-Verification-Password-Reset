const User = require("../models/user.model");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        userData: {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          isAccountVerified: user.isAccountVerified,
        },
      });
    }

    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
