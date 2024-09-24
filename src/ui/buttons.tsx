import { Pressable, Text } from "react-native";


export const SubmitButton = ({text, onSubmit}: {text: string, onSubmit: () => void}) => {
  return (
    <Pressable onPress={onSubmit} style={{width: '100%', backgroundColor: '#F8BF50', padding: 16, borderRadius: 12, alignItems: 'center'}}>
      <Text style={{color: '#78561D', fontSize: 16, fontWeight: '500', fontFamily: 'Satoshi-Black'}}>{text}</Text>
    </Pressable>
  );
};
