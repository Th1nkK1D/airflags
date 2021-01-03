import { AirtableConfig, fetchAirtableRecords } from './airtable';

interface AirflagsConfig extends AirtableConfig {
  environment: string;
}

type FeatureFlags = {
  [feature: string]: boolean;
};

class Airflags {
  private airtableConfig: AirtableConfig;
  private environment: string;
  private featureFlags: FeatureFlags | undefined;

  constructor({ environment, ...airtableConfig }: AirflagsConfig) {
    this.airtableConfig = airtableConfig;
    this.environment = environment;
  }

  private async fetch() {
    const { records } = await fetchAirtableRecords(this.airtableConfig);

    this.featureFlags = records.reduce(
      (flags, { fields }) => ({
        ...flags,
        [fields.Name]: !!fields[this.environment],
      }),
      {}
    );
  }

  async getFlags(): Promise<FeatureFlags> {
    if (!this.featureFlags) {
      await this.fetch();
    }

    return this.featureFlags as FeatureFlags;
  }
}

export default Airflags;
