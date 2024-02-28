// import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
// import {
//   PublicKey,
//   TransactionMessage,
//   VersionedTransaction,
// } from "@solana/web3.js";
// import {
//   getBubblegumAuthorityPDA,
//   bufferToArray,
//   getAssetProof,
//   getWalletPDA,
//   getCollectionMintAddress,
//   getBadgeId,
// } from "../helper";
// import {
//   SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
//   SPL_NOOP_PROGRAM_ID,
// } from "@solana/spl-account-compression";
// import { DAS } from "../../types";
// import { BN, Program } from "@coral-xyz/anchor";
// import { CnftStaking } from "../idl/cnft_staking";
// import { PROGRAM_ID } from "@metaplex-foundation/mpl-bubblegum";

// export const unstakeAsset = async (
//   rpcAsset: DAS.GetAssetResponse,
//   program: Program<CnftStaking>,
//   wallet: PublicKey
// ) => {
//   const walletPda = getWalletPDA(wallet);
//   if (!rpcAsset.compression) {
//     throw new Error("Asset is not compressed!");
//   }

//   console.log(
//     `Transfering asset ${
//       rpcAsset.id
//     } from ${walletPda.toBase58()} to ${wallet.toBase58()}.
// 	  This will depend on indexer api calls to fetch the necessary data.`
//   );
//   let assetProof = await getAssetProof(rpcAsset.id);
//   if (!assetProof?.proof || assetProof.proof.length === 0) {
//     throw new Error("Proof is empty");
//   }
//   let proofPath = assetProof.proof.map((node: string) => ({
//     pubkey: new PublicKey(node),
//     isSigner: false,
//     isWritable: false,
//   }));
//   console.log("Successfully got proof path from RPC.");

//   console.log(
//     "Successfully got asset from RPC. Current owner: " +
//       rpcAsset.ownership.owner
//   );
//   if (rpcAsset.ownership.owner !== walletPda.toBase58()) {
//     throw new Error(
//       `NFT is not owned by the expected owner. Expected ${walletPda.toBase58()} but got ${
//         rpcAsset.ownership.owner
//       }.`
//     );
//   }

//   const leafNonce = rpcAsset.compression.leaf_id;
//   const treeAuthority = getBubblegumAuthorityPDA(
//     new PublicKey(assetProof.tree_id)
//   );

//   let tx = await program.methods
//     .stake({
//       root: bufferToArray(bs58.decode(assetProof.root)),
//       dataHash: bufferToArray(
//         bs58.decode(rpcAsset.compression.data_hash.trim())
//       ),
//       creatorHash: bufferToArray(
//         bs58.decode(rpcAsset.compression.creator_hash.trim())
//       ),
//       index: leafNonce,
//       nonce: new BN(leafNonce),
//     })
//     .accounts({
//       treeAuthority: treeAuthority,
//       stakeAccount: walletPda,
//       merkleTree: new PublicKey(assetProof.tree_id),
//       logWrapper: SPL_NOOP_PROGRAM_ID,
//       compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
//       bubblegumProgram: PROGRAM_ID,
//     })
//     .remainingAccounts(proofPath)
//     .transaction();

//   try {
//     const sig = await program.provider.sendAndConfirm!(tx);
//     // await axios.post(unequipEndpoint, {
//     //   apiKey: dbApiKey,
//     //   wallet: wallet,
//     //   transactionId: sig,
//     //   collectionMintAddress: getCollectionMintAddress(rpcAsset),
//     //   mintAddress: rpcAsset.id,
//     //   badgeId: getBadgeId(rpcAsset),
//     // });
//     return sig;
//   } catch (e) {
//     console.error("Failed to transfer compressed asset", e);
//     throw e;
//   }
// };
