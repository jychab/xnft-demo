import { useEffect, useState } from "react";
import { usePublicKeys } from "./xnft-hooks";
import { PublicKey } from "@solana/web3.js";
import { DAS, WalletAsset } from "../types";
import { getAssetBatch, padAssets, getAssetsByOwner } from "../utils/helper";
import { auth, db } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import { query, collection, onSnapshot } from "firebase/firestore";

export function useLogin() {
  const pubKeys = usePublicKeys();
  const [wallet, setWallet] = useState<PublicKey>();
  useEffect(() => {
    if (pubKeys && pubKeys["solana"]) {
      const wallet = new PublicKey(pubKeys["solana"]);
      signInAnonymously(auth).then(() => setWallet(wallet));
    }
  }, [pubKeys]);
  return wallet;
}

export function useInventoryItems() {
  const wallet = useLogin();
  const [inventory, setInventory] = useState<DAS.GetAssetResponse[]>([]);

  useEffect(() => {
    if (wallet) {
      const assetQuery = query(
        collection(db, `Wallets/${wallet.toString()}/Assets`)
      );
      const unsubscribe = onSnapshot(assetQuery, (snapshot) => {
        loadCharacterAssets(
          snapshot.docs.map((doc) => doc.data() as WalletAsset),
          setInventory
        );
      });
      return () => unsubscribe();
    } else {
      setInventory([]);
    }
  }, [wallet]);
  return {
    inventory,
  };
}

async function loadCharacterAssets(
  items: WalletAsset[],
  setInventory: React.Dispatch<React.SetStateAction<DAS.GetAssetResponse[]>>
) {
  let assets: DAS.GetAssetResponse[] = [];
  if (items) {
    const response = await getAssetBatch(items.map((item) => item.mintAddress));
    if (response) {
      assets = assets.concat(response);
    }
  }
  setInventory(padAssets(assets, 6, 6));
}

export function useWalletItems() {
  const wallet = useLogin();
  const { inventory } = useInventoryItems();
  const [walletItems, setWalletItems] = useState<DAS.GetAssetResponse[]>([]);
  useEffect(() => {
    if (wallet) {
      const filteredInventory = inventory.filter((item) => item.content);
      getAssetsByOwner(wallet.toString(), 1).then((response) => {
        let items: DAS.GetAssetResponse[] = [];
        if (response) {
          items = items.concat(
            response.items.filter(
              (asset) =>
                filteredInventory.length === 0 ||
                filteredInventory.find((item) => item.id === asset.id) ===
                  undefined
            )
          );
        }
        setWalletItems(padAssets(items, 18, 6));
      });
    }
  }, [wallet, inventory]);
  return { walletItems };
}
