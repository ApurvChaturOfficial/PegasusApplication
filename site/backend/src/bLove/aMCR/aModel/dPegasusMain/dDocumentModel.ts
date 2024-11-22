import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type DocumentModelType = DefaultSchemaUtilityType & {
  cOrganization?: string,

  dDocumentName?: string,
  dUploadDate?: string,
  dComment?: string,

};

const schema = new mongoose.Schema<DocumentModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cOrganization: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationModel' } ,
  
  dDocumentName: { type: String },
  dUploadDate: { type: String },
  dComment: { type: String },

} as mongoose.SchemaDefinition<DocumentModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const DocumentModel = mongoose.model<DocumentModelType>("DocumentModel", schema);
