import {
  ICapability,
  Capability,
  IRating,
  Rating,
  IFullRating,
} from "../models/models";
import { IResolvers } from "graphql-tools";
const resolverMap: IResolvers = {
  Mutation: {
    addRating: async (parent, args) => {
      //validate the capability_id
      const caps = await Capability.find().lean();
      const result = caps.filter((c) => c._id.toString() === args.rating.capability_id)
      if (result.length === 0) throw new Error(`${args.rating.capability_id} is an unknown capability_id`)
      //create a model ...
      const rating = new Rating();
      rating.capability_id = args.rating.capability_id;
      rating.rating = args.rating.rating;
      rating.comment = args.rating.comment;
      rating.reviewer = args.rating.reviewer;
      rating.vendor = args.rating.vendor;
      //... and save it
      return await rating.save() as IRating
    },
  },
  Query: {
    async capabilities(_: void, args: void): Promise<ICapability[]> {
      return await Capability.find();
    },
    async ratings(_: void, args: void): Promise<IFullRating[]> {
      const caps = await Capability.find().lean();
      const ratings = await Rating.find();
      const fullRating = new Array<IFullRating>();
      ratings.forEach((rating) => {
        const r = rating as IFullRating;
        r.capability = caps.filter((c) =>
          c._id.toString() === r.capability_id
        )[0];
        console.log(r.capability);
        fullRating.push(r);
      });
      return fullRating;
    },
  },
};
export default resolverMap;
