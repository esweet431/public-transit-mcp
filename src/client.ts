import OnebusawaySDK from "onebusaway-sdk";

const PUGET_SOUND_BASE_URL = "https://api.pugetsound.onebusaway.org/api/where";

export function createClient(): OnebusawaySDK {
  // get API key from environment variable
  const apiKey = process.env.ONEBUSAWAY_API_KEY;
  
  // validate that API key exists
  if (!apiKey) {
    throw new Error(
      "ONEBUSAWAY_API_KEY environment variable is required. " +
      "Get an API key from https://www.soundtransit.org/help-contacts/business-information/open-transit-data-otd"
    );
  }

  // create and return OneBusAway SDK client
  return new OnebusawaySDK({
    apiKey,
    // default to Puget Sound if no base URL is provided
    baseURL: process.env.ONEBUSAWAY_BASE_URL ?? PUGET_SOUND_BASE_URL,
  });
}

export { OnebusawaySDK };
