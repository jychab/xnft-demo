import React, { FC } from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { DAS } from "../types";

interface ItemProps {
  size: number;
  item: DAS.GetAssetResponse;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<DAS.GetAssetResponse | undefined>
  >;
}

export const Item: FC<ItemProps> = ({ item, size, setSelectedItem }) => {
  return (
    <View
      className={`rounded-lg items-center w-${size} h-${size} flex-1 justify-center shadow-inner bg-stone-600 border-2 border-stone-500`}
    >
      <TouchableOpacity
        disabled={!item.content}
        className="rounded-lg w-2/3 h-2/3"
        onPress={() => (item.content ? setSelectedItem(item) : {})}
      >
        {item.content && (
          <Image
            className="rounded-lg w-full h-full"
            source={{ uri: item.content!.links!.image }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
