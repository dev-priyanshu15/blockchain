const express = require("express");
const {
  getUserController,
  verifyAccount,
  buyCredit,
  followUserController,
  unfollowUserController,
  blockUserController,
  unblockUserController,
  getBlockedUsersController,
  deleteUserController,
  searchUserController,
  uploadProfilePictureController,
  uploadCoverPictureController,
  getAllDappUsers,
  updateUserController,
  playCount,
} = require("../controllers/userController");
const upload = require("../middlewares/upload");
const router = express.Router();

///GET USER
router.get("/:userId", getUserController);
//GET ALL USER
router.get("/alldaapusers/:userId", getAllDappUsers);

//UPDATE USER
router.put("/update/:userId", updateUserController);

//PLAY COUNT
router.put("/playcount/:userId", playCount);

//VERIFY USER
router.put("/verify/:userId", verifyAccount);

//BUY CREDIT
router.put("/credit/:userId", buyCredit);

//FOLLOW USER
router.post("/follow/:userId", followUserController);

//UNFOLLOW USER
router.post("/unfollow/:userId", unfollowUserController);

//BLOCK USER
router.post("/block/:userId", blockUserController);

//UNBLOCK USER
router.post("/unblock/:userId", unblockUserController);

//GET BLOCKED USERS
router.get("/blocked/:userId", getBlockedUsersController);

//DELETE USER
router.delete("/delete/:userId", deleteUserController);

//SEARCH USER
router.get("/search/:query", searchUserController);

//UPDATE PROFILE PICTURE
router.put("/update-profile-picture/:userId", uploadProfilePictureController);

//UPDATE PROFILE PICTURE
router.put("/update-cover-picture/:userId", uploadCoverPictureController);

module.exports = router;
