import {expect} from 'chai';
import {describe, it, before} from 'mocha';
import {createConnection} from "typeorm";
import {Person} from "../src/mysql/entity/Person";
import {Vendor} from "../src/mysql/entity/Vendor";
import {Capability} from "../src/mysql/entity/Capability";
import {Feature} from "../src/mysql/entity/Feature";
import {Rating} from "../src/mysql/entity/Rating";
import {DataManager} from "../src/mysql/DataManager";

import {PersonInput} from "../src/mysql/inputs/PersonInput";


import Faker from 'faker'
import {FeatureInput} from "../src/mysql/inputs/FeatureInput";
import {CapabilityInput} from "../src/mysql/inputs/CapabilityInput";
import {VendorInput} from "../src/mysql/inputs/VendorInput";
import {RatingInput} from "../src/mysql/inputs/RatingInput";

const dataManager:DataManager = new DataManager()

describe('Data Access Tests', function () {

    before(async () => {

    })

    after(async () => {
        await dataManager.close()
    })
    it('Can Get Capabilities', async () => {
        const capabilities = await dataManager.getCapabilities();
        expect(capabilities).to.be.an('array');

    });

    it('Can Get Capability', async () => {
        const capabilities = await dataManager.getCapabilities();
        const capability = await dataManager.getCapability(capabilities[0].id);
        expect(capability).to.be.an('object');
        console.log(capability)
    });

    it('Can Set Person', async () => {
        const input  =  new PersonInput()
        input.firstName = Faker.name.firstName();
        input.lastName = Faker.name.lastName();
        input.email = ` ${input.firstName}.${input.lastName}@example.com `
        const person = await dataManager.setPerson(input);
        expect(person.id).to.be.a('string');
        expect(person.firstName).equals(input.firstName)
        expect(person.lastName).equals(input.lastName)
        expect(person.email).equals(input.email)
    });

    it('Can Set Feature', async () => {
        const input  =  new FeatureInput()
        input.name = Faker.lorem.word().toUpperCase()
        input.description = Faker.lorem.words(6)
        const feature = await dataManager.setFeature(input)
        expect(feature.id).to.be.a('string');
        expect(feature.name).equals(input.name)
        expect(feature.description).equals(input.description)
    });

    it('Can Set Capability', async () => {
        const input  =  new CapabilityInput();
        input.name = Faker.lorem.word().toUpperCase();
        input.description = Faker.lorem.words(6);
        const capability = await dataManager.setCapability(input)
        expect(capability.id).to.be.a('string');
        expect(capability.name).equals(input.name);
        expect(capability.description).equals(input.description);
    });

    it('Can Set Vendor', async () => {
        const input  =  new VendorInput();
        const contacts = await dataManager.getPersons();

        input.name = Faker.company.companyName();
        input.contactIds = [contacts[0].id];
        const vendor = await dataManager.setVendor(input);
        expect(vendor.id).to.be.a('string');
        expect(vendor.name).equals(input.name);
        expect(vendor.contacts[0].firstName).equals(contacts[0].firstName)
        expect(vendor.contacts[0].lastName).equals(contacts[0].lastName);
    });

    it('Can Set Rating', async () => {
        const input  =  new RatingInput();
        const contacts = await dataManager.getPersons();
        const capabilities = await dataManager.getCapabilities();
        const features = await dataManager.getFeatures();
        const vendors = await dataManager.getVendors();
        const reviewer = contacts[Faker.random.number(contacts.length)];
        const vendor =  vendors[Faker.random.number(vendors.length)];
        const capability = capabilities[Faker.random.number(capabilities.length)];
        const feature = features[Faker.random.number(features.length)];

        input.score = Faker.random.number(5);
        input.comment = Faker.lorem.words(20)
        input.capabilityId = capability.id;
        input.featureId = feature.id;
        input.reviewerId = reviewer.id;
        input.vendorId = vendor.id;

        const rating = await dataManager.setRating(input);
        expect(rating.id).to.be.a('string');
        expect(rating.comment).equals(input.comment);
        expect(vendor.name).equals(rating.vendor.name);
        expect(capability.name).equals(rating.capability.name);
        expect(feature.name).equals(rating.feature.name);
        expect(reviewer.firstName).equals(rating.reviewer.firstName);
        expect(reviewer.lastName).equals(rating.reviewer.lastName);
        expect(reviewer.email).equals(rating.reviewer.email);

        console.log(rating);
    });


}).timeout(10000)