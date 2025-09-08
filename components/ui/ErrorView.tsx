import { emojis } from "@/utils/emojis";
import { Pressable, Text, View } from "react-native";

type ErrorViewProps = {
  error: string;
  getData: () => void;
};

export default function ErrorView({ error, getData }: ErrorViewProps) {
  return (
    <View className="flex-1 p-4 bg-background dark:bg-dark-background justify-center">
      <View className="items-center space-y-4">
        <Text className="text-6xl">{emojis.invalid || "❌"}</Text>

        <Text className="text-4xl font-extrabold text-red-500 dark:text-red-400">
          ¡Ups!
        </Text>

        <Text className="text-center text-base text-red-500 dark:text-red-400 px-4">
          {error}
        </Text>

        <Pressable
          className="mt-4 px-6 py-3 bg-warning dark:bg-dark-warning rounded-full"
          onPress={getData}

        >
          <Text className="text-foreground font-semibold text-base">
            Reintentar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
