const express = require("express");
const { isAuthUser , authRoles } = require("../middleware/auth");
const { newOrder, orderDetail, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");

const router = express.Router();

router.route("/order/new").post( isAuthUser ,newOrder);
router.route("/order/:id").get( isAuthUser, authRoles("admin"),orderDetail);
router.route("/orders/me").get( isAuthUser ,myOrders);
router.route("/admin/orders").get( isAuthUser, authRoles("admin"),getAllOrders);

router.route("/admin/order/:id").put( isAuthUser, authRoles("admin"),updateOrder).delete(isAuthUser, authRoles("admin") , deleteOrder);




module.exports = router;