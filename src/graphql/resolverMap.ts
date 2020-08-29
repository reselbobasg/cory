import { ICapability, Capability, IRating, Rating, IFullRating } from '../models/models';
import { IResolvers } from 'graphql-tools';
const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    },
    async capabilities(_: void, args: void): Promise<ICapability[]> {
      return await Capability.find();
    },
    async ratings(_: void, args: void): Promise<IFullRating[]> {
      const caps = await Capability.find().lean();
      const ratings = await Rating.find();
      const fullRating = new Array<IFullRating>();
      ratings.forEach(rating => {
        const r = rating as IFullRating;
        r.capability = caps.filter(c => c._id.toString() === r.capability_id)[0];
        console.log(r.capability);
        fullRating.push(r);
      })
      return fullRating;
    },
  },
};
export default resolverMap;