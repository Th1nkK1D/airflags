import { server } from '../mock/msw';
import Airflags from '../src';

type Feature = 'featureA' | 'featureB';
type FeatureFlags = Record<Feature, boolean>;

const mockAirtableConfig = {
  baseId: 'someBase',
  tableName: 'someTable',
  apiKey: 'apiKey',
};

const expectedDevelopmentFlags: FeatureFlags = {
  featureA: true,
  featureB: true,
};

const expectedProductionFlags: FeatureFlags = {
  featureA: false,
  featureB: true,
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
  Airflags.config({
    environment: 'Development',
    ...mockAirtableConfig,
  });

  await Airflags.load();

  const flags: FeatureFlags = Airflags.getFlags();

  expect(flags).toStrictEqual(expectedDevelopmentFlags);
});

test('getFlags method should return loaded flags without calling config or load again', async () => {
  const flags: FeatureFlags = Airflags.getFlags();

  expect(flags).toStrictEqual(expectedDevelopmentFlags);
});

test('config with new value and re-load should give the corresponded new flags', async () => {
  Airflags.config({
    environment: 'Production',
    ...mockAirtableConfig,
  });

  await Airflags.load();

  const flags: FeatureFlags = Airflags.getFlags();

  expect(flags).toStrictEqual(expectedProductionFlags);
});

test('bad response from airtable request should throw error', async () => {
  Airflags.config({
    environment: 'Production',
    ...mockAirtableConfig,
    baseId: 'badBaseId',
  });

  await expect(Airflags.load).rejects.toThrow();
});
