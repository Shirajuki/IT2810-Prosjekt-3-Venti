import express from "express";
import adminController from "../controllers/admin";

const router = express.Router();

router.get("/", adminController.getIndex);

router.get("/getCart", adminController.getGetCart);

router.post("/editCart/:productId", adminController.postEditCart);

router.post("/deleteCart/:productId", adminController.postDeleteCart);

router.post("/removeCart/:productId", adminController.postRemoveCart);

router.post("/updateCart/:cart", adminController.postUpdateCart);

router.get("/reviews/:productId", adminController.getReviews);

router.post("/post-review/", adminController.postReview);

router.get('/count-products/', adminController.countProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/add-product", adminController.postProduct);

router.get("/:productId", adminController.getProduct);

router.post("/delete/:productId", adminController.postDelete);

// module.exports = router;
export default router;
