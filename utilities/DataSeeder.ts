import Faker from 'faker'
import {DataManager} from "../src/mysql/DataManager";
import {PersonInput} from "../src/mysql/inputs/PersonInput";
import {Person} from "../src/mysql/entity/Person";
import {Vendor} from "../src/mysql/entity/Vendor";
import {VendorInput} from "../src/mysql/inputs/VendorInput";
import {Capability} from "../src/mysql/entity/Capability";
import {CapabilityInput} from "../src/mysql/inputs/CapabilityInput";
import {Feature} from "../src/mysql/entity/Feature";
import {FeatureInput} from "../src/mysql/inputs/FeatureInput";
import {RatingInput} from "../src/mysql/inputs/RatingInput";
import {Rating} from "../src/mysql/entity/Rating";

import {getConnection} from "typeorm"

export class DataSeeder {
    async seed(): Promise<number> {
        const dataManager = new DataManager()

        //seed 10 persons
        const persons = new Array<Person>();
        for (let i = 0; i < 10; i++) {
            const input = new PersonInput();
            input.firstName = Faker.name.firstName();
            input.lastName = Faker.name.lastName();
            input.email = ` ${input.firstName}.${input.lastName}@example.com `
            persons.push(await dataManager.setPerson(input));
        }

        //seed 2 vendors
        const vendors = new Array<Vendor>();
        for (let i = 0; i < 2; i++) {
            const input = new VendorInput();
            input.name = Faker.company.companyName();
            input.contactIds = [persons[0].id];
            input.contactIds = [persons[1].id];
            vendors.push(await dataManager.setVendor(input))
        }

        //seed the 5 capabilities
        const capabilities = new Array<Capability>();
        for (let i = 0; i < 5; i++) {
            const input = new CapabilityInput();
            input.name = Faker.lorem.word().toUpperCase();
            input.description = Faker.lorem.words(6);
            capabilities.push(await dataManager.setCapability(input));
        }

        //seed the 5 features
        const features = new Array<Feature>();
        for (let i = 0; i < 5; i++) {
            const input = new FeatureInput();
            input.name = Faker.lorem.word()
            input.description = 'It can do this: ' + Faker.lorem.words(6)
            features.push(await dataManager.setFeature(input))
        }

        //rate each capabilities by each feature for the first vendor'
        const input = new RatingInput();
        const ratings = new Array<Rating>();
        let cnt = 0;
        input.vendorId = vendors[0].id;
        input.reviewerId = persons[0].id
        input.featureId = features[0].id;
        input.capabilityId = capabilities[0].id;
        input.comment = await Faker.lorem.words(20);
        input.score = await Faker.random.number(5);
        const rating = await dataManager.setRating(input);
        ratings.push(rating);
        console.log(rating);
        cnt++;
        return cnt;
    }

    async close(): Promise<void>{
        const conn = await getConnection()
        if(conn) conn.close();
    }
}


