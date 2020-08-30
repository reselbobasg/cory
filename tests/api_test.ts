import { httpServer, stopServer } from '../server';
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import mongoose from 'mongoose';
import Faker from 'faker'

describe('API Tests', function () { 
  it('Can start and stop server', async function () {
    await stopServer();
});

});