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
    if (!Airflags.airtableConfig || !Airflags.environment) {
      throw new Error('Config not found, please call Airflag.config() first');
    }

    const { records } = await fetchAirtableRecords(Airflags.airtableConfig);

    Airflags.featureFlags = records.reduce(
      (flags, { fields }) => ({
        ...flags,
        [fields.Name]: !!fields[Airflags.environment],
      }),
      {}
    );
  }

  static getFlags(): FeatureFlags {
    if (!Airflags.featureFlags) {
      throw new Error('Flags not loaded, please call Airflag.load() first');
    }

    return Airflags.featureFlags as FeatureFlags;
  }
}

export default Airflags;
