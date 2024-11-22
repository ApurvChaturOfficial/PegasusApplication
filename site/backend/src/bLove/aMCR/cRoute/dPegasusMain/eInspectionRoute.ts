import express from 'express';
import inspectionController from '../../bController/dPegasusMain/eInspectionController';
import validatorMiddleware, { inspectionCreateValidation, inspectionDeleteValidation, inspectionListValidation, inspectionRetrieveValidation, inspectionUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("inspection-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("inspection-list", "Product", "List"), 
  inspectionListValidation(), validatorMiddleware, 
  inspectionController().list
);

router.route("/create").post(
  rateLimiterMiddleware("inspection-create", 60, 10), 
  authenticationMiddleware,
  inspectionCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  inspectionController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("inspection-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("inspection-retrieve", "Product", "Retrieve"), 
  inspectionRetrieveValidation(), validatorMiddleware, 
  inspectionController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("inspection-update", 60, 10), 
  authenticationMiddleware,
  inspectionUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  inspectionController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("inspection-delete", 60, 10), 
  authenticationMiddleware,
  inspectionDeleteValidation(), validatorMiddleware, 
  inspectionController().delete
)

export const inspectionRouter = router;
