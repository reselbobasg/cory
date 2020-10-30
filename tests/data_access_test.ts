import {expect} from 'chai';
import {describe, it, before} from 'mocha';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Person} from "../src/mysql/entity/Person";
import {Vendor} from "../src/mysql/entity/Vendor";

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
})