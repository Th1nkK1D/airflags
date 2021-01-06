import { AirtableConfig, fetchAirtableRecords } from './airtable';

interface AirflagsConfig extends AirtableConfig {
  environment: string;
}

type FeatureFlags = {
  [feature: string]: boolean;
};

class Airflags {
  private static airtableConfig: AirtableConfig;
  private static environment: string;
  private static featureFlags: FeatureFlags | undefined;

  static config({ environment, ...airtableConfig }: AirflagsConfig): void {
    Airflags.airtableConfig = airtableConfig;
    Airflags.environment = environment;
  }

  static async load(): Promise<void> {
    const { records } = await fetchAirtableRecords(Airflags.airtableConfig);

    this.featureFlags = records.reduce(
      (flags, { fields }) => ({
        ...flags,
        [fields.Name]: !!fields[Airflags.environment],
      }),
      {}
    );
  }

  static getFlags(): FeatureFlags {
    return this.featureFlags as FeatureFlags;
  }
}

export default Airflags;
