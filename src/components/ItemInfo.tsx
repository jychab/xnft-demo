import React, { FC } from "react";

import { Image, TouchableOpacity, View, Text } from "react-native";
import { useLogin } from "../hooks";
import { DAS } from "../types";
import { equipAsset, unequipAsset } from "../utils/helper";

interface ItemInfoProps {
  equip: boolean;
  selectedItem: DAS.GetAssetResponse;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<DAS.GetAssetResponse | undefined>
  >;
}

export const ItemInfo: FC<ItemInfoProps> = ({
  equip,
  selectedItem,
  setSelectedItem,
}) => {
  const wallet = useLogin();

  return (
    <View className="absolute z-100 max-h-1/2 right-4 top-10 w-1/2 flex flex-col bg-stone-500 opacity-90 p-4 rounded">
      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity className="rounded-lg items-center w-14 h-14 justify-center shadow-inner bg-stone-600 border-2 border-gray-500">
          <Image
            className="rounded-lg w-2/3 h-2/3"
            source={{ uri: selectedItem!.content!.links!.image }}
          />
        </TouchableOpacity>
        <View className="flex flex-col w-1/2">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-gray-200"
          >
            {selectedItem!.content?.metadata.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-gray-200 text-xs"
          >
            {selectedItem!.content?.metadata.name}
          </Text>
        </View>
      </View>
      <Text className="text-gray-200 text-xs my-4">
        {selectedItem!.content?.metadata.description}
      </Text>
      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          onPress={async () => {
            if (wallet && selectedItem) {
              if (equip) {
                await equipAsset(wallet, selectedItem);
              } else {
                await unequipAsset(wallet, selectedItem);
              }
              setSelectedItem(undefined);
            }
          }}
          className="bg-stone-600 rounded px-2 py-1"
        >
          <Text className="text-gray-200 text-xs">
            {equip ? "Equip" : "Unequip"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedItem(undefined)}
          className="bg-stone-600 rounded px-2 py-1"
        >
          <Text className="text-gray-200 text-xs">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
