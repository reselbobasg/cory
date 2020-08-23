import { DataUtilities } from './data_utils';
import { Database } from './../src/database/database';
import {Capability, ICapability, CapabilityType} from './../src/models/models'
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import mongoose from 'mongoose';
import Faker from 'faker'
let database: any;

describe('Data Seeder', function () {
  before(function () {
    database = new Database();
    while (mongoose.connection.readyState !== 2) { 1 === 1 };
  })

  after(function () {
    database.close();
  })
  
  it('Can seed capabilities', async function () {
    await DataUtilities.seedCapabilities();
    const result = await Capability.find();
    expect(result.length > 0).to.equal(true);
    console.log({ result });
  });

});