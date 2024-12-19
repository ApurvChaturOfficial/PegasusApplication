import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type EnrolledServiceModelType = DefaultSchemaUtilityType & {
  cOrganization?: string,
  cService?: mongoose.Types.ObjectId;
  
  dPaymentStatus?: boolean,
  dActionStatus?: boolean,

};

const schema = new mongoose.Schema<EnrolledServiceModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cOrganization: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationModel' } ,
  cService: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceModel' },

  dPaymentStatus: { type: Boolean, default: false },
  dActionStatus: { type: Boolean, default: false },

} as mongoose.SchemaDefinition<EnrolledServiceModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const EnrolledServiceModel = mongoose.model<EnrolledServiceModelType>("EnrolledServiceModel", schema);
