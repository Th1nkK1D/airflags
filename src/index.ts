import { AirtableConfig, fetchAirtableRecords } from './airtable';

interface AirflagsConfig extends AirtableConfig {
  environment: string;
}

type Flags = Record<string, boolean>;

class Airflags {
  private static airtableConfig: AirtableConfig;
  private static environment: string;
  private static flags: Flags | undefined;

  static config({ environment, ...airtableConfig }: AirflagsConfig): void {
    Airflags.airtableConfig = airtableConfig;
    Airflags.environment = environment;
  }

  static async load(): Promise<void> {
    if (!Airflags.airtableConfig || !Airflags.environment) {
      throw new Error('Config not found, please call Airflag.config() first');
    }

    const { records } = await fetchAirtableRecords(Airflags.airtableConfig);

    Airflags.flags = records.reduce(
      (flags, { fields }) => ({
        ...flags,
        [fields.Name]: !!fields[Airflags.environment],
      }),
      {}
    );
  }

  static is(key: string): boolean {
    if (!Airflags.flags) {
      throw new Error('Flags not loaded, please call Airflag.load() first');
    }

    return !!Airflags.flags[key];
  }

  static getFlags(): Flags {
    if (!Airflags.flags) {
      throw new Error('Flags not loaded, please call Airflag.load() first');
    }

    return Airflags.flags as Flags;
  }
}

export default Airflags;
