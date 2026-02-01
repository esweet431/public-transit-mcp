import OnebusawaySDK from "onebusaway-sdk";

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
  // SDK defaults to Puget Sound region (api.pugetsound.onebusaway.org)
  return new OnebusawaySDK({ apiKey });
}

export { OnebusawaySDK };
