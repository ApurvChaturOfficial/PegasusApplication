import express from 'express';
import enrolledServiceController from '../../bController/dPegasusMain/fEnrolledServiceController';
import validatorMiddleware, { enrolledServiceCreateValidation, enrolledServiceDeleteValidation, enrolledServiceListValidation, enrolledServiceRetrieveValidation, enrolledServiceUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("enrolledservice-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("enrolledservice-list", "Enrolled Service", "List"), 
  enrolledServiceListValidation(), validatorMiddleware, 
  enrolledServiceController().list
);

router.route("/create").post(
  rateLimiterMiddleware("enrolledservice-create", 60, 10), 
  authenticationMiddleware,
  enrolledServiceCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  enrolledServiceController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("enrolledservice-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("enrolledservice-retrieve", "Enrolled Service", "Retrieve"), 
  enrolledServiceRetrieveValidation(), validatorMiddleware, 
  enrolledServiceController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("enrolledservice-update", 60, 10), 
  authenticationMiddleware,
  enrolledServiceUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  enrolledServiceController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("enrolledservice-delete", 60, 10), 
  authenticationMiddleware,
  enrolledServiceDeleteValidation(), validatorMiddleware, 
  enrolledServiceController().delete
)

export const enrolledServiceRouter = router;
