import { Screen } from "../components/Screen";
import { ItemInfo } from "../components/ItemInfo";
import { useWalletItems } from "../hooks";
import { FlatList, View } from "react-native";
import React, { useState } from "react";
import { CharacterInfo } from "../components/CharacterInfo";
import { Item } from "../components/Item";
import { DAS } from "../types";

export function Main() {
  const { walletItems } = useWalletItems();
  const [selectedItem, setSelectedItem] = useState<DAS.GetAssetResponse>();
  return (
    <Screen>
      <View className="flex flex-col h-screen gap-4 bg-stone-300">
        <View className="h-[300]">
          <CharacterInfo setSelectedItem={setSelectedItem} />
        </View>
        <View className="h-[150] overflow-hidden">
          <FlatList
            className="bg-stone-500 p-2 w-full h-full flex-1 rounded shadow-lg"
            data={walletItems}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            numColumns={6}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Item setSelectedItem={setSelectedItem} size={14} item={item} />
            )}
          />
        </View>
        {selectedItem && (
          <ItemInfo
            equip={
              walletItems.find((item) => item.id === selectedItem.id) !==
              undefined
            }
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
      </View>
    </Screen>
  );
}
