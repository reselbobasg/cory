import { Database } from './../src/database/database';
import {Capability, ICapability, CapabilityType, Rating, IRating, IReviewer, IVendor} from './../src/models/models'
import Faker from 'faker'
export class DataUtilities {
  static async seedCapabilities(): Promise<void> {
    await this.seedCapability(CapabilityType.API);
    await this.seedCapability(CapabilityType.Collaboration);
    await this.seedCapability(CapabilityType.EnterpriseReadiness);
    await this.seedCapability(CapabilityType.IDE);
    await this.seedCapability(CapabilityType.Monitoring);
    await this.seedCapability(CapabilityType.Security);
    await this.seedCapability(CapabilityType.SourceControlManagement);
    await this.seedCapability(CapabilityType.Testing);
    await this.seedCapability(CapabilityType.Tracing);
  }

  static async seedCapability(capabilityType: CapabilityType): Promise<void>{
    const capability: ICapability = new Capability();
    capability.capabilityType = capabilityType;
    capability.description = Faker.lorem.words(5);
    const result = await capability.save();
    console.log({ result });
  }

  static async seedRating(capabilities: Array<ICapability>): Promise<void>{
    const that = this;
    capabilities.forEach( async function(capability) { 
      const reviewer: IReviewer = that.getRandomReviewerSync();
      const vendor: IVendor = that.getRandomVendorSync();
      const comment: string = 'Comment- ' + Faker.lorem.words(4);
      const ratingValue: number = Math.floor(Math.random() * 5) + 1;
      const rating: IRating = new Rating();
      rating.capability_id = capability._id;
      rating.vendor = vendor;
      rating.reviewer = reviewer;
      rating.rating = ratingValue;
      rating.comment = comment;
      const result = await rating.save();
      console.log({ result });
    })  
  }

  static getRandomReviewerSync(): IReviewer{
    const firstName: string = Faker.name.firstName();
    const lastName: string = Faker.name.lastName();
    const email: string = `${firstName}.${lastName}@reviewer.com`;

    return { firstName, lastName, email } as IReviewer;
  }

  static getRandomVendorSync(): IVendor{
    const name: string = Faker.company.companyName();
    const firstName: string = Faker.name.firstName();
    const lastName: string = Faker.name.lastName();
    const comment: string = Faker.lorem.words(5);
    let emAddress: string = name.replace(' ', '');
    emAddress = emAddress.replace(',', '');
    const email: string = `${ firstName }.${ lastName }@${ emAddress }.com`;

    return { name, comment, contact: { firstName, lastName, email } } as IVendor;
    
  }
}