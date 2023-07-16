const express = require("express");
const { getAllProducts , createProduct,updateProduct,deleteProduct, getProductDetails, createReview, getAllReviews, deleteReview, getAdminProduct} = require("../controllers/productController");
const { isAuthUser , authRoles } = require("../middleware/auth");

const router = express.Router();
//products hum sbko dikhaenge...
router.route("/products").get( getAllProducts);

//obs only a person who is admin can only access to add or delete or update an item...
router.route("/product/new").post(isAuthUser, authRoles("admin") ,createProduct);

router.route("/admin/products").get(isAuthUser, authRoles("admin") ,getAdminProduct);

router.route("/product/:id").put(isAuthUser, authRoles("admin") ,updateProduct).delete(isAuthUser, authRoles("admin") ,deleteProduct);
router.route("/review").put( isAuthUser ,createReview);
router.route("/product/:id").get(getProductDetails);

router.route("/reviews").get(getAllReviews).delete(isAuthUser , deleteReview);



module.exports = router;
