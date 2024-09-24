import { forwardRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";

interface HeaderButtonProps {
  onPress?: () => void;
  icon?: keyof typeof FontAwesome.glyphMap; // Customizable icon
  color?: string; // Customizable color
}

export const HeaderButton = forwardRef<typeof Pressable, HeaderButtonProps>(
  ({ onPress, icon = "info-circle", color = "gray" }, ref) => {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <FontAwesome
            name={icon}
            size={25}
            color={color}
            style={[
              styles.headerRight,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          />
        )}
      </Pressable>
    );
  }
);

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});
