import { Database } from './../src/database/database';
import {Capability, ICapability, CapabilityType} from './../src/models/models'
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import mongoose from 'mongoose';
import Faker from 'faker'
let database: any;


describe('Data Access Tests', function () {

    before(function () {
        database = new Database();
    })

    after(function () {
        database.close();
    })
    it('Can access database', function () {
        expect(mongoose.connection.readyState > 0).to.equal(true);
        console.log({readyState: mongoose.connection.readyState});
    });

    it('Can Save Capability', async function () {
        const capability: ICapability = new Capability();
        capability.capabilityType = CapabilityType.IDE;
        capability.description = Faker.lorem.words(5);
        const result = await capability.save();
        console.log({ result });

    });
})