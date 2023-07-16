const express = require('express');
const { createUser, LoginUser, logOut, forgotPassword, resetPassword, userDetails, updatePass, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteProfileAdmin } = require('../controllers/userController');

const { isAuthUser, authRoles } = require('../middleware/auth');
const router = express.Router();

router.route("/createUser").post(createUser);

router.route("/login").post(LoginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/password/updatePassword").put( isAuthUser ,updatePass);

router.route("/me/updateProfile").put( isAuthUser ,updateProfile);

router.route("/admin/getUsers").get(isAuthUser , authRoles("admin") , getAllUsers);

router.route("/admin/user/:id").get(isAuthUser , authRoles("admin") , getSingleUser).put(isAuthUser , authRoles("admin") , updateUserRole).delete(isAuthUser , authRoles("admin") ,deleteProfileAdmin);

router.route("/logout").get(logOut);

router.route("/me").get(isAuthUser , userDetails);



module.exports = router;