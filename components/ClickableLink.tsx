import React from "react";
import { Linking, StyleProp, Text, TextStyle } from "react-native";

const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

interface ClickableTextProps {
    text: string;
    style?: StyleProp<TextStyle>;
    linkStyle?: StyleProp<TextStyle>;
}

export const ClickableText: React.FC<ClickableTextProps> = ({
    text,
    style,
    linkStyle,
}) => {
    const parts = text.split(urlRegex);
    return (
        <Text style={style} selectable>
            {parts.map((part, index) => {
                if (urlRegex.test(part)) {
                    const url = part.startsWith("http") ? part : `https://${part}`;
                    return (
                        <Text
                            key={`link-${index}`}
                            style={[{ color: "blue", textDecorationLine: "underline" }, linkStyle]}
                            onPress={() => Linking.openURL(url)}
                        >
                            {part}
                        </Text>
                    );
                }
                return <Text key={`text-${index}`}>{part}</Text>;
            })}
        </Text>
    );
};
