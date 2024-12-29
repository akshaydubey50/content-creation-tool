import mongoose from "mongoose";
import OldLike from "./src/models/likes/oldLikeModel"; // Import old model
import LikeModel from "./src/models/likes/Like.model"; // Import new model
import connectDB from "./src/db/dbConnect";

export default async function migrateBookmarks() {
  await connectDB();
  try {
    // Find all bookmarks with the old structure
    const oldBookmarks = await OldLike.find({});
    console.log(`Found ${oldBookmarks.length} old bookmarks to migrate.`);

    // Iterate over each old bookmark and create a new structure
    for (const oldBookmark of oldBookmarks) {
      if (!oldBookmark.productId) {
        console.warn(
          `Skipping old bookmark with ID ${oldBookmark._id} due to missing productId.`,
        );
        continue; // Skip this bookmark if productId is missing
      }
      // Create a new bookmark object based on the new structure
      const newBookmark = new LikeModel({
        userId: oldBookmark.userId,
        itemId: oldBookmark.productId,
        itemType: "tools", // Assuming old bookmarks were for tools
      });

      // Save the new bookmark
      await newBookmark.save();

      console.log(
        `Migrated old bookmark: ${oldBookmark._id} to new bookmark: ${newBookmark._id}`,
      );
      await OldLike.updateOne(
        { _id: oldBookmark._id },
        { $set: { migrated: true } }, // Add a migrated flag
      );
    }
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the migration script
migrateBookmarks();
