import { server } from '../mock/msw';
import Airflags from '../src';

beforeAll(() => server.listen());
afterAll(() => server.close());

const mockAirtableConfig = {
  baseId: 'someBase',
  tableName: 'someTable',
  apiKey: 'apiKey',
};

test('load method should load flags from airtable to the static class', async () => {
  const expectedFlags = {
    featureA: true,
    featureB: true,
  };

  Airflags.config({
    environment: 'Development',
    ...mockAirtableConfig,
  });

  await Airflags.load();

  const flags = Airflags.getFlags();

  expect(flags).toStrictEqual(expectedFlags);
});

test('getFlags method should return loaded flags without calling config or load again', async () => {
  const expectedFlags = {
    featureA: true,
    featureB: true,
  };

  const flags = Airflags.getFlags();

  expect(flags).toStrictEqual(expectedFlags);
});

test('config with new value and re-load should give the corresponded new flags', async () => {
  const expectedFlags = {
    featureA: false,
    featureB: true,
  };

  Airflags.config({
    environment: 'Production',
    ...mockAirtableConfig,
  });

  await Airflags.load();

  const flags = Airflags.getFlags();

  expect(flags).toStrictEqual(expectedFlags);
});
