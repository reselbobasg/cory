import { IResolvers } from "graphql-tools";
import {CapabilityInput} from "../mysql/inputs/CapabilityInput";
import {FeatureInput} from "../mysql/inputs/FeatureInput";
import {PersonInput} from "../mysql/inputs/PersonInput";
import {RatingInput} from "../mysql/inputs/RatingInput";
import {VendorInput} from "../mysql/inputs/VendorInput";
import {DataManager} from "../mysql/DataManager";

const dataManager = new DataManager()

const resolverMap: IResolvers = {
  Mutation: {
    addCapability: async (parent, args) => {
      const input = new CapabilityInput()
      input.name = args.capability.name;
      input.description = args.capability.description;
      //const dm = new DataManager();
      return await dataManager.setCapability(input)
    },
    addFeature: async (parent, args) => {
      const input = new FeatureInput()
      input.name = args.feature.name;
      input.description = args.feature.description;
      //const dm = new DataManager();
      return await dataManager.setFeature(input)

    },
    addPerson: async (parent, args) => {
      const input = new PersonInput()
      input.firstName = args.person.firstName;
      input.lastName = args.person.lastName;
      input.email = args.person.email;
      //const dm = new DataManager();
      return await dataManager.setPerson(input)

    },
    addVendor: async (parent, args) => {
      const input = new VendorInput()
      input.name = args.vendor.name;
      input.contactIds = args.vendor.contactIds;
      //const dm = new DataManager();
      return await dataManager.setVendor(input)
    },
    addRating: async (parent, args) => {
      const input = new RatingInput()
      input.comment = args.rating.comment;
      input.score = args.rating.comment;
      input.capabilityId = args.rating.capabilityId;
      input.featureId = args.rating.featureId;
      input.reviewerId = args.rating.reviewerId;
      input.vendorId = args.rating.vendorId;
      //const dm = new DataManager();
      return await dataManager.setRating(input)
    },
  },
  Query: {
    async capabilities(_: void, args: void): Promise<any[]> {

      return await dataManager.getCapabilities()
    },
    async capability(_: any, args: any): Promise<any> {
      const itm =  await dataManager.getCapability(args.id)
      console.log(itm);
      return itm;
    },

    async features(_: void, args: void): Promise<any[]> {
      return await dataManager.getFeatures()
    },
    async feature(_: any, args: any): Promise<any> {
      const itm =  await dataManager.getFeature(args.id)
      console.log(itm);
      return itm;
    },

    async persons(_: void, args: void): Promise<any[]> {
      return await dataManager.getPersons()
    },
    async person(_: any, args: any): Promise<any> {
      const itm =  await dataManager.getPerson(args.id)
      console.log(itm);
      return itm;
    },

    async vendors(_: void, args: void): Promise<any[]> {
      return await dataManager.getVendors()
    },
    async vendor(_: any, args: any): Promise<any> {
      const itm =  await dataManager.getVendor(args.id)
      console.log(itm);
      return itm;
    },

    async ratings(_: void, args: void): Promise<any[]> {
      const itms = await dataManager.getRatings();
      console.log(itms)
      return itms;
    },
    async rating(_: any, args: any): Promise<any> {
      const itm =  await dataManager.getRating(args.id)
      console.log(itm);
      return itm;
    },
  }
};
export default resolverMap;
