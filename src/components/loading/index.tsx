import { useEffect } from "react";
import { Text,View } from "react-native";

import { CardAnimationSilver } from "@/components/loading/card-animation";
import { useResponsive } from "@/core/hooks/use-responsive";

export default function Loading({setAnimationCompleted}: {setAnimationCompleted: (completed: boolean) => void}) {
  const { hp } = useResponsive();
  useEffect(() => {
    setTimeout(() => {
      setAnimationCompleted(true);
    }, 3000);
  }, []);

  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ position: "absolute", top: hp(1), alignItems: "center" }}
        >
          <Text
            style={{
              color: "#636268",
              fontSize: 22,
              fontFamily: "Satoshi-SemiBold",
            }}
          >
            Starting Game...
          </Text>
        </View>
        <View
          style={{ position: "absolute", top: hp(35), alignItems: "center" }}
        >
          <CardAnimationSilver />
        </View>
      </View>
  );
}
