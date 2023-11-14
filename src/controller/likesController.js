const { Likes,unLikes } = require("../Database/models");

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.loggedInUser.id;

    // Check if the user has already liked the post
    const existingLike = await Likes.findOne({ where: { postId, userId } });

    if (existingLike) {
      // If the user has already liked the post, remove the like
      await existingLike.destroy();
      // Decrement the 'likes' count in the Likes model
      await Likes.decrement("likes", { by: 1, where: { postId } });
      res.status(200).json({ message: "Your like removed" });
    } else {
      // Check if the user has disliked the post
      const existingDislike = await unLikes.findOne({
        where: { postId, userId },
      });
      if (existingDislike) {
        // If the user has disliked the post, remove the dislike
        await existingDislike.destroy();
        // Decrement the 'unLikes' count in the unLikes model
        await unLikes.decrement("unLikes", { by: 1, where: { postId } });
      }

      // Add a like for the user
      await Likes.create({ postId, userId });
      // Increment the 'likes' count in the Likes model
      await Likes.increment("likes", { by: 1, where: { postId } });
      res.status(200).json({ message: "Your like added" });
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      console.error("Validation errors:", error.errors);
    } else {
      console.error("Unhandled error:", error);
    }
    return res.status(500).json({
      status: "500",
      message: "Failed to add or remove like",
      error: error.message,
    });
  }
};
