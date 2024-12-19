import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type InspectionModelType = DefaultSchemaUtilityType & {
  cOrganization?: string,

  dReportName?: string,
  dUploadDate?: string,
  dFileUploaded?: string,
  dFileUploadedID?: string,

};

const schema = new mongoose.Schema<InspectionModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cOrganization: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationModel' } ,
  
  dReportName: { type: String },
  dUploadDate: { type: String },
  dFileUploaded: { type: String },
  dFileUploadedID: { type: String },

} as mongoose.SchemaDefinition<InspectionModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const InspectionModel = mongoose.model<InspectionModelType>("InspectionModel", schema);
