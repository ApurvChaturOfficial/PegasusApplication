import express from 'express';
import documentController from '../../bController/dPegasusMain/dDocumentController';
import validatorMiddleware, { documentCreateValidation, documentDeleteValidation, documentListValidation, documentRetrieveValidation, documentUpdateValidation } from '../../../bMiddleware/cValidatorMiddleware';
import checkCacheMiddleware from '../../../bMiddleware/dCheckCacheMiddleware';
import rateLimiterMiddleware from '../../../bMiddleware/eRateLimiterMiddleware';
import personalInfoMiddleware from '../../../bMiddleware/fPersonalInfoMiddleware';
import authenticationMiddleware from '../../../bMiddleware/gAuthenticationMiddleware';


const router = express.Router();

router.route("/list").get(
  rateLimiterMiddleware("document-list", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("document-list", "Document", "List"), 
  documentListValidation(), validatorMiddleware, 
  documentController().list
);

router.route("/create").post(
  rateLimiterMiddleware("document-create", 60, 10), 
  authenticationMiddleware,
  documentCreateValidation(), validatorMiddleware, 
  personalInfoMiddleware("created"),
  documentController().create
)

router.route("/retrieve/:id").get(
  rateLimiterMiddleware("document-retrieve", 60, 10), 
  authenticationMiddleware,
  checkCacheMiddleware("document-retrieve", "Document", "Retrieve"), 
  documentRetrieveValidation(), validatorMiddleware, 
  documentController().retrieve
)

router.route("/update/:id").put(
  rateLimiterMiddleware("document-update", 60, 10), 
  authenticationMiddleware,
  documentUpdateValidation(), validatorMiddleware, 
  personalInfoMiddleware("updated"),
  documentController().update
)

router.route("/delete/:id").delete(
  rateLimiterMiddleware("document-delete", 60, 10), 
  authenticationMiddleware,
  documentDeleteValidation(), validatorMiddleware, 
  documentController().delete
)

export const documentRouter = router;
