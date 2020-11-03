import "reflect-metadata";
import {Connection} from "typeorm";
import {createConnection} from "typeorm";
import {Person} from "./entity/Person";
import {Vendor} from "./entity/Vendor";
import {Capability} from "./entity/Capability";
import {Feature} from "./entity/Feature";
import {Rating} from "./entity/Rating";

import {FeatureInput} from "./inputs/FeatureInput"
import {CapabilityInput} from "./inputs/CapabilityInput"
import {PersonInput} from "./inputs/PersonInput"
import {VendorInput} from "./inputs/VendorInput";
import {RatingInput} from "./inputs/RatingInput";

export class DataManager {
    connection: Connection
    async connectToDb(): Promise<Connection>{

        if(!this.connection) this.connection = await createConnection();
        return this.connection
    }

    async setRating(input:RatingInput): Promise<Rating> {
        const reviewer = await this.getPerson(input.reviewerId);
        const capability = await this.getCapability(input.capabilityId);
        const vendor = await this.getVendor(input.vendorId);
        const feature = await this.getFeature(input.featureId);
        const conn = await this.connectToDb()
        const rating = new Rating()
        rating.vendor = vendor;
        rating.reviewer = reviewer;
        rating.capability = capability;
        rating.feature = feature;
        rating.score = input.score;
        rating.comment = input.comment
        return await conn.manager.save(rating);
    }

    async getRatings(): Promise<Rating[]> {
        const conn = await this.connectToDb()
        return await conn.manager.find(Rating);
    }

    async getRating(id:string): Promise<any> {
        const conn = await this.connectToDb()
        const repo = conn.getRepository(Rating);
        const items = await repo.find({ where: { id: id }  });
        if (items.length > 0) return items[0];
    }

    async setVendor(input:VendorInput): Promise<Vendor> {
        const contacts = new Array<Person>();
        input.contactIds.forEach(async (id:string) => {
            contacts.push(await this.getPerson(id));
        })
        const conn = await this.connectToDb()
        const vendor = new Vendor()
        vendor.name = input.name;
        vendor.contacts = contacts;
        return await conn.manager.save(vendor);
    }

    async getVendor(id:string): Promise<any> {
        const conn = await this.connectToDb()
        const repo = conn.getRepository(Vendor);
        const vendors = await repo.find({ where: { id: id } ,relations: ["contacts"] });
        if (vendors.length > 0) return vendors[0];
    }

    async getVendors(): Promise<Vendor[]> {
        const conn = await this.connectToDb()
        //return conn.manager.find(Vendor)
        const repo = conn.getRepository(Vendor);
        const items = await repo.find({relations: ["contacts"] });
        console.log(items);
        return items;
    }

    async setPerson(input:PersonInput): Promise<Person> {
        const person = new Person();
        person.firstName = input.firstName;
        person.lastName = input.lastName;
        person.email = input.email;
        const conn = await this.connectToDb()
        return await conn.manager.save(person);
    }

    async getPersons(): Promise<Person[]> {
        const conn = await this.connectToDb()
        return this.connection.manager.find(Person)
    }

    async getPerson(id:string): Promise<any> {
        const conn = await this.connectToDb()
        const capability = conn
            .getRepository(Person)
            .createQueryBuilder("person")
            .where("person.id = :id", { id: id })
            .getOne();
        return capability
    }

    async setCapability(input:CapabilityInput): Promise<Capability> {
        const capability = new Capability();
        capability.name = input.name;
        capability.description = input.description
        const conn = await this.connectToDb()
        return await conn.manager.save(capability);
    }

    async getCapabilities(): Promise<Capability[]> {
        const conn = await this.connectToDb()
        return this.connection.manager.find(Capability)
    }

    async getCapability(id:string): Promise<any> {
        const conn = await this.connectToDb()
        const capability = conn
            .getRepository(Capability)
            .createQueryBuilder("capability")
            .where("capability.id = :id", { id: id })
            .getOne();
        return capability
    }

    async setFeature(input:FeatureInput): Promise<Feature> {
        const feature = new Feature();
        feature.name = input.name;
        feature.description = input.description
        const conn = await this.connectToDb()
        return await conn.manager.save(feature);
    }

    async getFeatures(): Promise<Feature[]> {
        const conn = await this.connectToDb()
        return this.connection.manager.find(Feature)
    }

    async getFeature(id:string): Promise<any> {
        const conn = await this.connectToDb()
        const repo = conn.getRepository(Feature);
        const features = await repo.find({ where: { id: id } ,relations: ["ratings"] });
        if(features.length>0) return features[0];
    }

    async close(){
        await this.connection.close();
    }
}
