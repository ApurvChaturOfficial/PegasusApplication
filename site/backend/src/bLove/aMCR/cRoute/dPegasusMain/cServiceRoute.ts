import express from 'express';
import serviceController from '../../bController/dPegasusMain/cServiceController';
import validatorMiddleware, { serviceCreateValidation, serviceDeleteValidation, serviceListValidation, serviceRetrieveValidation, serviceUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("service-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("service-list", "Service", "List"), 
  serviceListValidation(), validatorMiddleware, 
  serviceController().list
);

router.route("/create").post(
  rateLimiterMiddleware("service-create", 60, 10), 
  authenticationMiddleware,
  serviceCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  serviceController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("service-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("service-retrieve", "Service", "Retrieve"), 
  serviceRetrieveValidation(), validatorMiddleware, 
  serviceController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("service-update", 60, 10), 
  authenticationMiddleware,
  serviceUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  serviceController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("service-delete", 60, 10), 
  authenticationMiddleware,
  serviceDeleteValidation(), validatorMiddleware, 
  serviceController().delete
)

export const serviceRouter = router;
