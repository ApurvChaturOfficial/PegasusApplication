import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type OrganizationModelType = DefaultSchemaUtilityType & {
  // cCategory: {};
  // cTag: {}[];

  cService: {}[];

  dName?: string,
  dType?: string,
  dCompanyEmail?: string,
  // dLicenseNumber?: string,
  // dIssueDate?: string,
  // dExpiryDate?: string,
  // dSelectedLicense?: string,
  dPhoneNumber: string,
  dAddress?: string,
  dSelectedState?: string,
  dSelectedCity?: string,
  dCountry?: string,
  dPin?: string,
  dPanNumber?: string,

};

const schema = new mongoose.Schema<OrganizationModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cService: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceModel' }] ,

  dName: { type: String },
  dType: { type: String },
  dCompanyEmail: { type: String },
  // dLicenseNumber: { type: String },
  // dIssueDate: { type: String },
  // dExpiryDate: { type: String },
  // dSelectedLicense: { type: String },
  dPhoneNumber: { type: String },
  dAddress: { type: String },
  dSelectedState: { type: String },
  dSelectedCity: { type: String },
  dCountry: { type: String },
  dPin: { type: String },
  dPanNumber: { type: String },

} as mongoose.SchemaDefinition<OrganizationModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const OrganizationModel = mongoose.model<OrganizationModelType>("OrganizationModel", schema);
