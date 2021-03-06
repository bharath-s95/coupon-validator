import { Router } from "express";

import {
  addFlatCoupon,
  addPercentCoupon,
  getCoupon,
  validateCoupon,
  calculateDiscount
} from "../controllers/couponController";
import {
  validateFlatCoupon,
  validatePercentCoupon
} from "../lib/validationRules";
import {checkInput} from "../middlewares/checkInput";

const router: Router = Router();

/* Error handler for async / await functions */
const catchErrors = (fn: Function) => {
  return function(...args: any) {
    return fn(...args).catch((err: Error) => console.error(err));
  };
};

router.post(
  "/validate",
  checkInput,
  catchErrors(getCoupon),
  validateCoupon,
  calculateDiscount
);

router.post(
  "/add-flat-coupon",
  validateFlatCoupon(),
  catchErrors(addFlatCoupon)
);
router.post(
  "/add-percent-coupon",
  validatePercentCoupon(),
  catchErrors(addPercentCoupon)
);

export default router;
