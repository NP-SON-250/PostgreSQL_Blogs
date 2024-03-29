import { unLikes, Likes } from "../Database/models";

//dis like a post

export const disLikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.loggedInUser.id;

    const existingDislike = await unLikes.findOne({where: { postId, userId },});

    if (existingDislike) {
      await existingDislike.destroy();
      await unLikes.decrement("unLikes", { by: 1, where: { postId } });
      res.status(200).json({ message: "Your dislike removed" });
    } else {
      const existingLike = await Likes.findOne({ where: { postId, userId } });
      if (existingLike) {
        await existingLike.destroy();
        await Likes.decrement("likes", { by: 1, where: { postId } });
      }
      await unLikes.create({ postId, userId });
      await unLikes.increment("unLikes", { by: 1, where: { postId } });
      res.status(200).json({ message: "Post disliked" });
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      console.error("Validation errors:", error.errors);
    } else {
      console.error("Unhandled error:", error);
    }
    return res.status(500).json({
      status: "500",
      message: "Failed to add or remove dislike",
      error: error.message,
    });
  }
};
