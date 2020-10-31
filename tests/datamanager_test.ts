import {expect} from 'chai';
import {describe, it, before} from 'mocha';
import {createConnection} from "typeorm";
import {Person} from "../src/mysql/entity/Person";
import {Vendor} from "../src/mysql/entity/Vendor";
import {Capability} from "../src/mysql/entity/Capability";
import {Feature} from "../src/mysql/entity/Feature";
import {Rating} from "../src/mysql/entity/Rating";
import {DataManager} from "../src/mysql/DataManager";


import Faker from 'faker'

const dataManager:DataManager = new DataManager()

describe('Data Access Tests', function () {

    before(async () => {

    })

    after(async () => {
        dataManager.close()
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


}).timeout(10000)