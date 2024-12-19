import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type LicenseModelType = DefaultSchemaUtilityType & {
  cOrganization?: string,
  cEnrolledService?: string,

  dSelectedLicense?: string,
  dLicenseNumber?: string,
  dIssueDate?: string,
  dExpiryDate?: string,
  dFileUploaded?: string,
  dFileUploadedID?: string,

};

const schema = new mongoose.Schema<LicenseModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cOrganization: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationModel' } ,
  cEnrolledService: { type: mongoose.Schema.Types.ObjectId, ref: 'EnrolledServiceModel' } ,
  
  dSelectedLicense: { type: String },
  dLicenseNumber: { type: String },
  dIssueDate: { type: String },
  dExpiryDate: { type: String },
  dFileUploaded: { type: String },
  dFileUploadedID: { type: String },

} as mongoose.SchemaDefinition<LicenseModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const LicenseModel = mongoose.model<LicenseModelType>("LicenseModel", schema);
