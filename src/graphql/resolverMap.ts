import { ICapability, Capability, IRating, Rating } from '../models/models';
import { IResolvers } from 'graphql-tools';
const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    },
    async capabilities(_: void, args: void): Promise<ICapability[]> {
      return await Capability.find();
    },
    async ratings(_: void, args: void): Promise<IRating[]> {
      return await Rating.find();
    },
  },
};
export default resolverMap;