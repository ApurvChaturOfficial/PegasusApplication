import express from 'express';
import licenseController from '../../bController/dPegasusMain/bLicenseController';
import validatorMiddleware, { licenseCreateValidation, licenseDeleteValidation, licenseListValidation, licenseRetrieveValidation, licenseUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("license-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("license-list", "License", "List"), 
  licenseListValidation(), validatorMiddleware, 
  licenseController().list
);

router.route("/create").post(
  rateLimiterMiddleware("license-create", 60, 10), 
  authenticationMiddleware,
  licenseCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  licenseController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("license-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("license-retrieve", "License", "Retrieve"), 
  licenseRetrieveValidation(), validatorMiddleware, 
  licenseController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("license-update", 60, 10), 
  authenticationMiddleware,
  licenseUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  licenseController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("license-delete", 60, 10), 
  authenticationMiddleware,
  licenseDeleteValidation(), validatorMiddleware, 
  licenseController().delete
)

export const licenseRouter = router;
