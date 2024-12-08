import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type ServiceModelType = DefaultSchemaUtilityType & {
  dFormNumber?: string,
  dFormType?: string,
  dCategory?: string,
  dOwnLoan?: string,
  dGovtFees?: string,
  dOurFees?: string,
  dAddedDate?: string,
  dServiceValidity?: string,

};

const schema = new mongoose.Schema<ServiceModelType>({
  ...DefaultSchemaUtility.schema.obj,
  
  dFormNumber: { type: String },
  dFormType: { type: String },
  dCategory: { type: String },
  dOwnLoan: { type: String },
  dGovtFees: { type: String },
  dOurFees: { type: String },
  dAddedDate: { type: String },
  dServiceValidity: { type: String },

} as mongoose.SchemaDefinition<ServiceModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const ServiceModel = mongoose.model<ServiceModelType>("ServiceModel", schema);
