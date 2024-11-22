import express from 'express';
import organizationController from '../../bController/dPegasusMain/aOrganizationController';
import validatorMiddleware, { organizationCreateValidation, organizationDeleteValidation, organizationListValidation, organizationRetrieveValidation, organizationUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("organization-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("organization-list", "Organization", "List"), 
  organizationListValidation(), validatorMiddleware, 
  organizationController().list
);

router.route("/create").post(
  rateLimiterMiddleware("organization-create", 60, 10), 
  authenticationMiddleware,
  organizationCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  organizationController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("organization-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("organization-retrieve", "Organization", "Retrieve"), 
  organizationRetrieveValidation(), validatorMiddleware, 
  organizationController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("organization-update", 60, 10), 
  authenticationMiddleware,
  organizationUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  organizationController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("organization-delete", 60, 10), 
  authenticationMiddleware,
  organizationDeleteValidation(), validatorMiddleware, 
  organizationController().delete
)

export const organizationRouter = router;
