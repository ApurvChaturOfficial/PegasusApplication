import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type LicenseModelType = DefaultSchemaUtilityType & {
  cOrganization?: string,

  dSelectedLicense?: string,
  dLicenseNumber?: string,
  dIssueDate?: string,
  dExpiryDate?: string,

};

const schema = new mongoose.Schema<LicenseModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cOrganization: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationModel' } ,
  
  dSelectedLicense: { type: String },
  dLicenseNumber: { type: String },
  dIssueDate: { type: String },
  dExpiryDate: { type: String },

} as mongoose.SchemaDefinition<LicenseModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const LicenseModel = mongoose.model<LicenseModelType>("LicenseModel", schema);
