// src/suiApi.ts
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

// connect to Sui testnet
const client = new SuiClient({ url: getFullnodeUrl("testnet") });

// Replace with your deployed packageId
const PACKAGE_ID = "0xYOUR_PACKAGE_ID_HERE";

export async function fetchCounters() {
  try {
    // Example: fetch all objects created by your package
    const objects = await client.getOwnedObjects({
      owner: "0xYOUR_ADDRESS_HERE", // or use a query filter
      options: { showContent: true },
    });

    // Filter & map to counters
    return objects.data.map((obj: any, index: number) => ({
      id: obj.data?.objectId,
      value: obj.data?.content?.fields?.value ?? 0,
      owner: obj.data?.owner,
      rank: index + 1,
    }));
  } catch (error) {
    console.error("Error fetching counters:", error);
    return [];
  }
}
