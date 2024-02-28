import React, { FC } from "react";

import { FlatList, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useInventoryItems } from "../hooks";
import { Item } from "./Item";
import { DAS } from "../types";

interface CharacterInfoProps {
  setSelectedItem: React.Dispatch<
    React.SetStateAction<DAS.GetAssetResponse | undefined>
  >;
}
export const CharacterInfo: FC<CharacterInfoProps> = ({ setSelectedItem }) => {
  const { inventory } = useInventoryItems();

  return (
    <View className="bg-stone-400 h-full w-full z-0 rounded items-center justify-center">
      <MaterialCommunityIcons name="human-child" color={"black"} size={200} />
      <View className="absolute z-10 h-auto w-2/3 items-center justify-center flex rounded bottom-2">
        <FlatList
          className=""
          data={inventory}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item }) => (
            <Item setSelectedItem={setSelectedItem} size={14} item={item} />
          )}
        />
      </View>
    </View>
  );
};
