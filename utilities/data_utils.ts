import { Database } from './../src/database/database';
import {Capability, ICapability, CapabilityType} from './../src/models/models'
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
}