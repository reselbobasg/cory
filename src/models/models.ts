import mongoose, { Schema, Document } from 'mongoose';

export enum  CapabilityType {
  API = 'API',
  Collaboration = 'COLLABORATION',
  EnterpriseReadiness = 'ENTERPRISEREADINESS',
  IDE = 'IDE',
  Monitoring = 'MONITORING',
  Security = 'SECURITY',
  SourceControlManagement = 'SOURCECONTROLMANAGEMENT',
  Testing = 'TESTING',
  Tracing = 'TRACING',
};

export interface IReviewer extends Document {
  //_id: string;
  firstName:  string;
  lastName: string;
  email: string;
  createDate?: Date;
}

export interface IFeature extends Document {
  //_id: string;
  description:  string;
  vendor: IVendor;
  createDate?: Date;
}

export interface IVendor extends Document {
  //_id: string;
  name: string;
  comment: string;
  contact: {
    firstName:  string;
    lastName: string;
    email: string;
  }
}

export interface ICapability extends Document {
  _id: string;
  capabilityType:  CapabilityType;
  description: string;
  createDate?: Date;
}



export interface IRating extends Document {
  _id: string;
  rating: number;
  comment: string;
  vendor: IVendor;
  reviewer: IReviewer;
  createdAt: Date;
  //updates: Array<Date>;
  //lastUpdate: Date;
  capability_id: string;
}

export interface ISimpleCapability{
  _id: string;
  capabilityType:  CapabilityType;
  description: string;
}

export interface IFullRating extends IRating{
  capability: ISimpleCapability;
}

const reviewerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
});

const capabilitySchema: Schema = new Schema({
  capabilityType: { type: String, enum: Object.values(CapabilityType) },
  description: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
});

const featureSchema: Schema = new Schema({
  description: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  vendor: {
    name: {type: String, required: true},
    comment: {type: String, required: true},
    contact:{
      firstName: {type: String, required: true},
      lastName: {type: String, required: true},
      email: {type: String, required: true},
    }
  }
});

const ratingSchema: Schema = new Schema( {
  rating: {type: Number, required: true},
  comment: {type: String, required: true},
  reviewer: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
  },
  vendor: {
    name: {type: String, required: true},
    comment: {type: String, required: true},
    contact:{
      firstName: {type: String, required: true},
      lastName: {type: String, required: true},
      email: {type: String, required: true},
    }
  },
  createdAt: { type: Date, default: Date.now },
  updates: { type:[Date]},
  lastUpdate: { type: Date },
  capability_id:{type: String, required: true},
});

const Reviewer = mongoose.model<IReviewer>('Reviewer', reviewerSchema);
const Capability = mongoose.model<ICapability>('Capability', capabilitySchema);
const Rating = mongoose.model<IRating>('Rating', ratingSchema);
const Feature = mongoose.model<IFeature>('Feature', featureSchema);

export { Capability, Rating, Feature, Reviewer };
