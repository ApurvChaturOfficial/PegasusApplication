import express from 'express';
import crypto from 'crypto';
import mongoose, { isValidObjectId } from 'mongoose';
import { body, param, validationResult } from 'express-validator';

import ErrorUtility from '../../bLove/cUtility/aErrorUtility';
import { BaseManyToOneModel } from '../aMCR/aModel/aSetting/aBaseManyToOneModel';
import { BaseManyToManyModel } from '..//aMCR/aModel/aSetting/bBaseManyToManyModel';
import { BaseModel } from '../aMCR/aModel/aSetting/cBaseModel';
import { BaseOneToOneModel } from '../aMCR/aModel/aSetting/dBaseOneToOneModel';
import { BaseOneToManyModel } from '../aMCR/aModel/aSetting/eBaseOneToManyModel';

import { UserModel } from '../aMCR/aModel/bUserAdministration/aUserModel';
import { MenuModel } from '../aMCR/aModel/bUserAdministration/cMenuModel';
import { RoleModel } from '../aMCR/aModel/bUserAdministration/bRoleModel';

import { OrganizationModel } from '../aMCR/aModel/dPegasusMain/aOrganizationModel';
import { LicenseModel } from '../aMCR/aModel/dPegasusMain/bLicenseModel';
import { ServiceModel } from '../aMCR/aModel/dPegasusMain/cServiceModel';
import { DocumentModel } from '../aMCR/aModel/dPegasusMain/dDocumentModel';
import { InspectionModel } from '../aMCR/aModel/dPegasusMain/eInspectionModel';
import { EnrolledServiceModel } from '../aMCR/aModel/dPegasusMain/fEnrolledServiceModel';


const validatorMiddleware = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const errors = validationResult(request)

  const joinErrors = errors
    .array()
    .map(each => each.msg)
    .join(". ")

  if (errors.isEmpty()) return next();
  else return next(new ErrorUtility(joinErrors, 400));
}

// BaseManyToOne
const baseManyToOneListValidation = () => []

const baseManyToOneCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base", 400);
        }
  
        const retrieve = await BaseModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Not Found", 404);
      }));
      return true;
    }),
]

const baseManyToOneRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

const baseManyToOneUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base", 400);
        }
  
        const retrieve = await BaseModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Not Found", 404);
      }));
      return true;
    }),
]

const baseManyToOneDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// BaseManyToMany
const baseManyToManyListValidation = () => []

const baseManyToManyCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base", 400);
        }
  
        const retrieve = await BaseModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Not Found", 404);
      }));
      return true;
    }),
]

const baseManyToManyRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseManyToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

const baseManyToManyUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseManyToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base", 400);
        }
  
        const retrieve = await BaseModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Not Found", 404);
      }));
      return true;
    }),
]

const baseManyToManyDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseManyToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// Base
const baseListValidation = () => []

const baseCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBaseOneToOne")
    .notEmpty().withMessage("Please select base one to one")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base One To One")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base One To One Not Found", 404)
      return true;
    }),
  body("cBaseOneToMany")
    .notEmpty().withMessage("Please select base one to many")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base One To Many", 400);
        }
  
        const retrieve = await BaseOneToManyModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base One To Many Not Found", 404);
      }));
      return true;
    }),
  body("cBaseManyToOne")
    .notEmpty().withMessage("Please select base many to one")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base Many To One")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Many To One Not Found", 404)
      return true;
    }),
  body("cBaseManyToMany")
    .notEmpty().withMessage("Please select base many to many")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base Many To Many", 400);
        }
  
        const retrieve = await BaseManyToManyModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Many To Many Not Found", 404);
      }));
      return true;
    }),
]

const baseRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBaseOneToOne")
    .notEmpty().withMessage("Please select base one to one")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base One To One")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base One To One Not Found", 404)
      return true;
    }),
  body("cBaseOneToMany")
    .notEmpty().withMessage("Please select base one to many")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base One To Many", 400);
        }
  
        const retrieve = await BaseOneToManyModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base One To Many Not Found", 404);
      }));
      return true;
    }),
  body("cBaseManyToOne")
    .notEmpty().withMessage("Please select base many to one")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base Many To One")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseManyToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Many To One Not Found", 404)
      return true;
    }),
  body("cBaseManyToMany")
    .notEmpty().withMessage("Please select base many to many")
    .custom(async (value: mongoose.ObjectId[]) => {
      await Promise.all(value.map(async (each) => {
        const idAsString = each as unknown as string;
  
        if (!mongoose.Types.ObjectId.isValid(idAsString)) {
          throw new ErrorUtility("Invalid MongoDB ID format for Base Many To Many", 400);
        }
  
        const retrieve = await BaseManyToManyModel.findById(idAsString);
        if (!retrieve) throw new ErrorUtility("Base Many To Many Not Found", 404);
      }));
      return true;
    }),
]

const baseDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// BaseOneToOne
const baseOneToOneListValidation = () => []

const baseOneToOneCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseOneToOneRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

const baseOneToOneUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseOneToOneDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseOneToOneModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// BaseOneToMany
const baseOneToManyListValidation = () => []

const baseOneToManyCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseOneToManyRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseOneToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

const baseOneToManyUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await BaseOneToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
  body("cBase")
    .notEmpty().withMessage("Please select base")
    .isMongoId().withMessage("Invalid MongoDB ID format for Base")
    .custom(async (value: mongoose.ObjectId) => {
      const retrieve = await BaseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    }),
]

const baseOneToManyDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await BaseOneToManyModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Base Not Found", 404)
      return true;
    })
]

// User
const userListValidation = () => []

const userCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter Title")
]

const userRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please enter valid parameter", 404);
      return true;
    })
    .custom(async value => {
      const retrieve = await UserModel.findById(value);
      if (!retrieve) throw new ErrorUtility("User Not Found", 404);
      return true;
    })
]

const userUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please enter valid parameter", 404);
      return true;
    })
    .custom(async value => {
      const retrieve = await UserModel.findById(value);
      if (!retrieve) throw new ErrorUtility("User Not Found", 404);
      return true;
    })
]

const userDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please enter valid parameter", 404);
      return true;
    })
    .custom(async value => {
      const retrieve = await UserModel.findById(value);
      if (!retrieve) throw new ErrorUtility("User Not Found", 404);
      return true;
    })
]

const userLoginValidation = () => [
  body("eEmail")
    .notEmpty().withMessage("Please enter email")
    .isEmail().withMessage("Please enter valid email")
    .custom(async value => {
      const retrieve = await UserModel.findOne({eEmail: value});
      if (!retrieve) throw new ErrorUtility("Invalid Email or Password", 401);
      return true;
    }),
  body("ePassword")
    .notEmpty().withMessage("Please enter password")
    .custom(async (value, { req: request }) => {
      const retrieve = await UserModel.findOne({eEmail: request.body.eEmail}).select("+ePassword");
      if (retrieve) {
        const isMatch = await retrieve.comparePassword(value);
        if (!isMatch) throw new ErrorUtility("Invalid Email or Password", 401)
      };
      return true;
    }),
]

const userRegisterValidation = () => [
  body("eFirstname")
    .notEmpty().withMessage("Please enter firstname"),
  body("eLastname")
    .notEmpty().withMessage("Please enter lastname"),  
  body("eEmail")
    .notEmpty().withMessage("Please enter email")
    .isEmail().withMessage("Please enter valid email")
    .custom(async value => {
      const retrieve = await UserModel.findOne({eEmail: value});
      if (retrieve) throw new ErrorUtility("User Already Exists...", 401);
      return true;
    }),
  body("eMobile")
    .notEmpty().withMessage("Please enter mobile"),  
  body("ePassword")
    .notEmpty().withMessage("Please enter password"),  
]

const userForgotPasswordValidation = () => [
  body("eEmail")
  .notEmpty().withMessage("Please enter email")
  .isEmail().withMessage("Please enter valid email")
  .custom(async value => {
    const retrieve = await UserModel.findOne({eEmail: value});
    if (!retrieve) throw new ErrorUtility("User Not Found", 401);
    return true;
  }),
]

const userResetPasswordValidation = () => [
  param("token")
    .notEmpty().withMessage("Reset token is required")
    .isHexadecimal().withMessage("Reset token must be a valid hexadecimal string")
    .custom(async (token) => {
			const resetToken = crypto.createHash("sha256").update(token).digest("hex");
      const retrieve = await UserModel.findOne({
        eResetPasswordToken: resetToken,
        eResetPasswordTokenExpire: { $gt: Date.now() }
      });
      if (!retrieve) throw new ErrorUtility('Reset password link is invalid or has expired', 400);
      return true;
    }),
  body("ePassword")
    .notEmpty().withMessage("Please enter password"),  
  body("eConfirmPassword")
    .notEmpty().withMessage("Please enter confirm password")
    .custom((value, { req }) => {
      if (value !== req.body.ePassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),  
]

const userLogoutValidation = () => []

const userProfileRetrieveValidation = () => []

const userProfileUpdateValidation = () => []

const userProfilePasswordUpdateValidation = () => []

const userProfileDeleteValidation = () => []

// Role
const roleListValidation = () => []

const roleCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title")
]

const roleRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await RoleModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Role Not Found", 404)
      return true;
    })
]

const roleUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await RoleModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Role Not Found", 404)
      return true;
    })
]

const roleDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await RoleModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Role Not Found", 404)
      return true;
    })
]

// Menu
const menuListValidation = () => []

const menuCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title")
]

const menuRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await MenuModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Menu Not Found", 404)
      return true;
    })
]

const menuUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await MenuModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Menu Not Found", 404)
      return true;
    })
]

const menuDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await MenuModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Menu Not Found", 404)
      return true;
    })
]

// Organization
const organizationListValidation = () => []

const organizationCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
]

const organizationRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await OrganizationModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Organization Not Found", 404)
      return true;
    })
]

const organizationUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await OrganizationModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Organization Not Found", 404)
      return true;
    }),
]

const organizationDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await OrganizationModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Organization Not Found", 404)
      return true;
    })
]

// License
const licenseListValidation = () => []

const licenseCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
]

const licenseRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await LicenseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("License Not Found", 404)
      return true;
    })
]

const licenseUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await LicenseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("License Not Found", 404)
      return true;
    }),
]

const licenseDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await LicenseModel.findById(value);
      if (!retrieve) throw new ErrorUtility("License Not Found", 404)
      return true;
    })
]

// Service
const serviceListValidation = () => []

const serviceCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
]

const serviceRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await ServiceModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Service Not Found", 404)
      return true;
    })
]

const serviceUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await ServiceModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Service Not Found", 404)
      return true;
    }),
]

const serviceDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await ServiceModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Service Not Found", 404)
      return true;
    })
]

// Document
const documentListValidation = () => []

const documentCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
]

const documentRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await DocumentModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Document Not Found", 404)
      return true;
    })
]

const documentUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await DocumentModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Document Not Found", 404)
      return true;
    }),
]

const documentDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await DocumentModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Document Not Found", 404)
      return true;
    })
]

// Inspection
const inspectionListValidation = () => []

const inspectionCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
]

const inspectionRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await InspectionModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Inspection Not Found", 404)
      return true;
    })
]

const inspectionUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await InspectionModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Inspection Not Found", 404)
      return true;
    }),
]

const inspectionDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await InspectionModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Inspection Not Found", 404)
      return true;
    })
]

// Enrolled Service
const enrolledServiceListValidation = () => []

const enrolledServiceCreateValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
]

const enrolledServiceRetrieveValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await EnrolledServiceModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Enrolled Service Not Found", 404)
      return true;
    })
]

const enrolledServiceUpdateValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
     const retrieve = await EnrolledServiceModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Enrolled Service Not Found", 404)
      return true;
    }),
]

const enrolledServiceDeleteValidation = () => [
  param("id")
    .custom(value => {
      if (!isValidObjectId(value)) throw new ErrorUtility("Please provide valid parameter", 404)
      return true;
    })
    .custom(async value => {
      const retrieve = await EnrolledServiceModel.findById(value);
      if (!retrieve) throw new ErrorUtility("Enrolled Service Not Found", 404)
      return true;
    })
]

export default validatorMiddleware;
export {
  baseManyToOneListValidation,
  baseManyToOneCreateValidation,
  baseManyToOneRetrieveValidation,
  baseManyToOneUpdateValidation,
  baseManyToOneDeleteValidation,

  baseManyToManyListValidation,
  baseManyToManyCreateValidation,
  baseManyToManyRetrieveValidation,
  baseManyToManyUpdateValidation,
  baseManyToManyDeleteValidation,

  baseListValidation,
  baseCreateValidation,
  baseRetrieveValidation,
  baseUpdateValidation,
  baseDeleteValidation,

  baseOneToOneListValidation,
  baseOneToOneCreateValidation,
  baseOneToOneRetrieveValidation,
  baseOneToOneUpdateValidation,
  baseOneToOneDeleteValidation,

  baseOneToManyListValidation,
  baseOneToManyCreateValidation,
  baseOneToManyRetrieveValidation,
  baseOneToManyUpdateValidation,
  baseOneToManyDeleteValidation,

  userListValidation,
  userCreateValidation,
  userRetrieveValidation,
  userUpdateValidation,
  userDeleteValidation,
  userLoginValidation,
  userRegisterValidation,
  userForgotPasswordValidation,
  userResetPasswordValidation,
  userLogoutValidation,
  userProfileRetrieveValidation,
  userProfileUpdateValidation,
  userProfilePasswordUpdateValidation,
  userProfileDeleteValidation,

  roleListValidation,
  roleCreateValidation,
  roleRetrieveValidation,
  roleUpdateValidation,
  roleDeleteValidation,

  menuListValidation,
  menuCreateValidation,
  menuRetrieveValidation,
  menuUpdateValidation,
  menuDeleteValidation,

  organizationListValidation,
  organizationCreateValidation,
  organizationRetrieveValidation,
  organizationUpdateValidation,
  organizationDeleteValidation,

  licenseListValidation,
  licenseCreateValidation,
  licenseRetrieveValidation,
  licenseUpdateValidation,
  licenseDeleteValidation,

  serviceListValidation,
  serviceCreateValidation,
  serviceRetrieveValidation,
  serviceUpdateValidation,
  serviceDeleteValidation,

  documentListValidation,
  documentCreateValidation,
  documentRetrieveValidation,
  documentUpdateValidation,
  documentDeleteValidation,

  inspectionListValidation,
  inspectionCreateValidation,
  inspectionRetrieveValidation,
  inspectionUpdateValidation,
  inspectionDeleteValidation,

  enrolledServiceListValidation,
  enrolledServiceCreateValidation,
  enrolledServiceRetrieveValidation,
  enrolledServiceUpdateValidation,
  enrolledServiceDeleteValidation,
}
