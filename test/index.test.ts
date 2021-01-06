import { server } from '../mock/msw';
import Airflags from '../src';

const mockAirtableConfig = {
  baseId: 'someBase',
  tableName: 'someTable',
  apiKey: 'apiKey',
};

beforeAll(() => server.listen());
afterAll(() => server.close());

test('calling loaded before config should throw an error', async () => {
  await expect(Airflags.load).rejects.toThrow();
});

test('calling getFlags before load should throw an error', () => {
  expect(Airflags.getFlags).toThrow();
});

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

test('bad response from airtable request should throw error', async () => {
  Airflags.config({
    environment: 'Production',
    ...mockAirtableConfig,
    baseId: 'badBaseId',
  });

  await expect(Airflags.load).rejects.toThrow();
});
