import {DataUtilities} from '../utilities/data_utils'
import {expect} from 'chai';
import {describe, it, before} from 'mocha';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Person} from "../src/mysql/entity/Person";

import Faker from 'faker'
import {User} from "../src/mysql/entity/User";

let connection: any


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
    })
})