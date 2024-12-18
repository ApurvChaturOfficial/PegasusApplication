import mongoose from 'mongoose';
import slugify from 'slugify';
import { DefaultSchemaUtility, DefaultSchemaUtilityType } from '../../../cUtility/bDefaultSchemaUtility';


export type ProductModelType = DefaultSchemaUtilityType & {
  cCategory: {};
  cTag: {}[];
};

const schema = new mongoose.Schema<ProductModelType>({
  ...DefaultSchemaUtility.schema.obj,

  cCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryModel' } ,
  cTag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TagModel' }],

} as mongoose.SchemaDefinition<ProductModelType>)

// Pre Validate
schema.pre("validate", function(next) {
  this.aSlug = slugify(String(this?.aTitle));
  next();
})

export const ProductModel = mongoose.model<ProductModelType>("ProductModel", schema);
