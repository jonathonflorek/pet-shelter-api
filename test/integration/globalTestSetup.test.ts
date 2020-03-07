import { getManager } from 'typeorm';
import { running } from '../../src';

before(async () => {
    // wait for app to be running before doing tests
    await running;
});

afterEach(async () => {
    // Clean Repositories after each test
    // typeORM does not support repository.clear() on Postgres tables
    // (see https://github.com/typeorm/typeorm/issues/1649), so we manually
    // apply the CASCADE rule here.
    await getManager().query(`TRUNCATE TABLE "pet" CASCADE`);
});
