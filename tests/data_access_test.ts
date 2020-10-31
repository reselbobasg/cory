import {expect} from 'chai';
import {describe, it, before} from 'mocha';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Person} from "../src/mysql/entity/Person";
import {Vendor} from "../src/mysql/entity/Vendor";
import {Capability} from "../src/mysql/entity/Capability";
import {Feature} from "../src/mysql/entity/Feature";
import {Rating} from "../src/mysql/entity/Rating";

import Faker from 'faker'

describe('Data Access Tests', function () {

    before(async () => {

    })

    after(async () => {
    })
    it('Can create Person', async () => {
        await createConnection().then(async connection => {
            const person = new Person();
            person.firstName = Faker.name.firstName();
            person.lastName = Faker.name.lastName();
            person.email = ` ${person.firstName}.${person.lastName}@example.com `
            await connection.manager.save(person);
            expect(person.id).to.be.a('string');
            const persons = await connection.manager.find(Person);
            const result = persons.filter(p => {
                if(p.id === person.id) return p;
            });
            expect(result[0].id) .equals(person.id);
            await connection.close();
        });
    });

    it('Can create Vendor with Contacts', async () => {

        await createConnection().then(async connection => {
            const person1 = new Person();
            person1.firstName = Faker.name.firstName();
            person1.lastName = Faker.name.lastName();
            person1.email = ` ${person1.firstName}.${person1.lastName}@example.com `
            await connection.manager.save(person1);

            const person2 = new Person();
            person2.firstName = Faker.name.firstName();
            person2.lastName = Faker.name.lastName();
            person2.email = ` ${person2.firstName}.${person2.lastName}@example.com `
            await connection.manager.save(person2);

            const vendor = new Vendor();
            vendor.name = Faker.company.companyName();
            vendor.contacts = [person1, person2];
            await connection.manager.save(vendor);

            const repo = connection.getRepository(Vendor);
            const vendors = await repo.find({ relations: ["contacts"] });

            const v1 = vendors.filter(v => {
                if(v.id === vendor.id) return v;
            });
            expect(v1[0].id) .equals(vendor.id);

            expect(v1[0].contacts.length) .equals(2);

            const p1 = v1[0].contacts.filter(p => {
                if(p.id === person1.id) return p;
            });

            expect(p1[0].firstName) .equals(person1.firstName);
            expect(p1[0].lastName) .equals(person1.lastName);
            expect(p1[0].email) .equals(person1.email);

            const p2 = vendor.contacts.filter(p => {
                if(p.id === person2.id) return p;
            });

            expect(p2[0].firstName) .equals(person2.firstName);
            expect(p2[0].lastName) .equals(person2.lastName);
            expect(p2[0].email) .equals(person2.email);

            await connection.close();
        });
    });

    it('Can create Capability', async () => {
        await createConnection().then(async connection => {
            const capability = new Capability();
            capability.name = Faker.lorem.word().toUpperCase();
            capability.description = Faker.lorem.words(10)
            await connection.manager.save(capability);

            const capbilities = await connection.manager.find(Capability);
            const result = capbilities.filter(c => {
                if (c.id === capability.id) return c;
            });
            expect(result[0].id).equals(capability.id);
            console.log({capability:result[0] })
            await connection.close();
        });
    });

    it('Can create Feature', async () => {
        await createConnection().then(async connection => {
            const feature = new Feature();
            feature.name = Faker.lorem.word().toUpperCase() + 'orama';
            feature.description = Faker.lorem.words(6)
            await connection.manager.save(feature);

            const capability = new Capability();
            capability.name = Faker.lorem.word().toUpperCase();
            capability.description = Faker.lorem.words(10)
            await connection.manager.save(capability);

            const features = await connection.manager.find(Feature);
            const result = features.filter(f => {
                if(f.id === feature.id) return f;
            });
            expect(result[0].id) .equals(feature.id);
            expect(result[0].name) .equals(feature.name);
            expect(result[0].description) .equals(feature.description);
            console.log({feature:result[0] })
            await connection.close();
        });
    })

    it('Can create Rating', async () => {
        await createConnection().then(async connection => {
            //Feature
            const feature = new Feature();
            feature.name = Faker.lorem.word().toUpperCase() + 'orama';
            feature.description = Faker.lorem.words(6)
            await connection.manager.save(feature);

            //Capability
            const capability = new Capability();
            capability.name = Faker.lorem.word().toUpperCase();
            capability.description = Faker.lorem.words(10)
            await connection.manager.save(capability);

            //Vendor
            const contact = new Person();
            contact.firstName = Faker.name.firstName();
            contact.lastName = Faker.name.lastName();
            contact.email = ` ${contact.firstName}.${contact.lastName}@example.com `
            await connection.manager.save(contact);

            const reviewer = new Person();
            reviewer.firstName = Faker.name.firstName();
            reviewer.lastName = Faker.name.lastName();
            reviewer.email = ` ${reviewer.firstName}.${reviewer.lastName}@example.com `
            await connection.manager.save(reviewer);

            const vendor = new Vendor();
            vendor.name = Faker.company.companyName();
            vendor.contacts = [contact];
            await connection.manager.save(vendor);

            const rating = new Rating();
            rating.comment = Faker.lorem.words(10);
            rating.capability = capability;
            rating.reviewer = reviewer;
            rating.feature = feature;
            rating.score = Faker.random.number(5);
            rating.vendor = vendor;
            await connection.manager.save(rating);

            const ratings = await connection.manager.find(Rating);
            const result = ratings.filter(r => {
                if(r.id === rating.id) return r;
            });

            expect(result[0].id) .equals(rating.id);
            expect(result[0].capability.name).equals(rating.capability.name);
            expect(result[0].feature.name).equals(rating.feature.name);
            expect(result[0].reviewer.lastName).equals(rating.reviewer.lastName);

            await connection.close();
        });
    })

}).timeout(10000)