import {describe, it} from 'mocha';
import {DataSeeder} from "./DataSeeder";
describe('Data Seed Tests', function () {
    it('Can Seed Data', async function () {
        const ds =  new DataSeeder();
        const count = await ds.seed();
        await ds.close();
        console.log({count});
    });
}).timeout(20000)
