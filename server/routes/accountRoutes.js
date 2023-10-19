// import express from "express";
// import {
//   protect,
//   validateSession,
//   validateAdmin,
//   validation,
// } from "../middleware/_index.js";
// import {
//   updateAccountFeature,
//   viewAccountFeature,
//   deleteAccountFeature,
//   logoutAccountFeature,
// } from "../controller/account/index.js";
// const router = express.Router();

// router
//   .route("/profile")
//   .get([protect, validateSession, validateAdmin], viewAccountFeature)
//   .put(
//     [validation, protect, validateSession, validateAdmin],
//     updateAccountFeature
//   )
//   .delete([protect, validateSession, validateAdmin], deleteAccountFeature);

// router.post(
//   "/profile/logout",
//   [protect, validateSession, validateAdmin],
//   logoutAccountFeature
// );

// export default router;
