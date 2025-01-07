import { WatchlistDataRequest } from "../mal_schema";

/**
 * A single stat that can be calculated for a user's watchlist.
 */
export default interface IStat {
  /**
   * The ID of the stat. This is in UUID format.
   * 
   * Used to identify a stat in the request url (like `/stats/:id`) and in the UI.
   */
  id: string;

  /**
   * The name of the stat.
   */
  name: string;

  /**
   * The description of the stat
   */
  description: string;

  /**
   * The function used to calculate the stat.
   * 
   * @param data The user's watchlist data used to calculate the stat
   * @returns The calculated stat (as a promise)
   */
  calculate: (data: WatchlistDataRequest) => Promise<any>; // TODO: Define the return type
}