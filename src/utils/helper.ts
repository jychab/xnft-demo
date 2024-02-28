import { PROGRAM_ID } from "@metaplex-foundation/mpl-bubblegum";
import { PublicKey } from "@solana/web3.js";
import { dbApiKey, equipEndpoint, heliusEndpoint, unequipEndpoint } from ".";
import axios from "axios";
import { DAS, WalletAsset } from "../types";
import { v4 as uuidv4 } from "uuid";
import { Interface, OwnershipModel } from "../enums";

// export function getBubblegumAuthorityPDA(merkleRollPubKey: PublicKey) {
//   const [bubblegumAuthorityPDAKey] = PublicKey.findProgramAddressSync(
//     [merkleRollPubKey.toBuffer()],
//     PROGRAM_ID
//   );
//   return bubblegumAuthorityPDAKey;
// }

// export function bufferToArray(buffer: Buffer): number[] {
//   const nums = [];
//   for (let i = 0; i < buffer.length; i++) {
//     nums.push(buffer[i]);
//   }
//   return nums;
// }

// export function getWalletPDA(wallet: PublicKey): PublicKey {
//   const [walletPda] = PublicKey.findProgramAddressSync(
//     [wallet.toBuffer()],
//     STAKE_ACCOUNT_PROGRAM_ID
//   );
//   return walletPda;
// }

export async function getAssetBatch(
  assetIds: string[]
): Promise<DAS.GetAssetResponse | undefined> {
  try {
    const response = await axios.post(heliusEndpoint, {
      jsonrpc: "2.0",
      method: "getAssetBatch",
      id: "compression-example",
      params: { ids: assetIds },
    });
    return response.data.result as DAS.GetAssetResponse;
  } catch (error) {
    console.error(error);
  }
}

export async function getAssetProof(assetId: any): Promise<any> {
  try {
    const response = await axios.post(heliusEndpoint, {
      jsonrpc: "2.0",
      method: "getAssetProof",
      id: "compression-example",
      params: { id: assetId },
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAssetsByOwner(
  ownerAddress: string,
  page: number
): Promise<DAS.GetAssetResponseList | undefined> {
  try {
    const response = await axios.post(heliusEndpoint, {
      jsonrpc: "2.0",
      method: "getAssetsByOwner",
      id: "compression-example",
      params: { ownerAddress, page },
    });
    return response.data.result as DAS.GetAssetResponseList;
  } catch (error) {
    console.error(error);
  }
}

export async function equipAsset(
  wallet: PublicKey,
  asset: DAS.GetAssetResponse
): Promise<void> {
  try {
    await axios.post(equipEndpoint, {
      apiKey: dbApiKey,
      wallet,
      nft: asset,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function unequipAsset(
  wallet: PublicKey,
  asset: DAS.GetAssetResponse
): Promise<void> {
  try {
    await axios.post(unequipEndpoint, {
      apiKey: dbApiKey,
      wallet,
      collectionMintAddress: getCollectionMintAddress(asset),
      mintAddress: asset.id,
    });
  } catch (error) {
    console.error(error);
  }
}

export function padAssets(
  asset: DAS.GetAssetResponse[],
  minLength: number,
  columnLength: number
) {
  // Calculate the number of nulls needed to pad the array
  let paddingLength = Math.max(0, minLength - asset.length);

  // If the padded length exceeds minLength, calculate additional padding
  if (paddingLength === 0 && asset.length % columnLength !== 0) {
    paddingLength = 6 - (asset.length % columnLength);
  }
  for (let i = 0; i < paddingLength; i++) {
    const empty: DAS.GetAssetResponse = {
      id: uuidv4(),
      content: undefined,
      interface: Interface.CUSTOM,
      ownership: {
        frozen: false,
        delegated: false,
        ownership_model: OwnershipModel.SINGLE,
        owner: "",
      },
      mutable: false,
      burnt: false,
    };
    asset.push(empty);
  }
  return asset;
}

export function getCollectionMintAddress(item: DAS.GetAssetResponse) {
  if (item.grouping) {
    const group = item.grouping?.find(
      (group) => group.group_key === "collection"
    );
    return group ? group.group_value : undefined;
  } else {
    return undefined;
  }
}

export function getBadgeId(item: DAS.GetAssetResponse) {
  if (item.content && item.content.metadata.attributes) {
    const badge = item.content.metadata.attributes.find(
      (attribute) => attribute.trait_type === "Badge ID"
    );
    return badge ? badge.value : undefined;
  } else {
    return undefined;
  }
}
