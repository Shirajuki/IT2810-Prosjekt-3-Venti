import express from "express";
import adminController from "../controllers/admin";

const router = express.Router();

router.get("/", adminController.getIndex);
router.get('/count-products/', adminController.countProducts);
router.get("/getCart", adminController.getGetCart);
router.get("/reviews/:productId", adminController.getReviews);
router.post("/editCart/:productId", adminController.postEditCart);
router.post("/deleteCart/:productId", adminController.postDeleteCart);
router.post("/removeCart/:productId", adminController.postRemoveCart);
router.post("/updateCart/:cart", adminController.postUpdateCart);
router.post("/post-review/", adminController.postReview);
router.get("/:productId", adminController.getProduct);

export default router;
