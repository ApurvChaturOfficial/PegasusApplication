import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type OrganizationModelType = DefaultSchemaUtilityType & {
  cEnrolledService?: string[],
  cAssignedEmployee?: string,

  dName?: string,
  dType?: string,
  dCompanyEmail?: string,
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

  cEnrolledService: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EnrolledServiceModel' }],
  cAssignedEmployee: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },

  dName: { type: String },
  dType: { type: String },
  dCompanyEmail: { type: String },
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
