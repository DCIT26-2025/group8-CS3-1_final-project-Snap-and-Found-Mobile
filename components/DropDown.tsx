import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type OptionItem = {
  value: string;
  label: string;
};

interface DropDownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
}

export default function Dropdown({
  data,
  onChange,
  placeholder,
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const [value, setValue] = useState("");

  const buttonRef = useRef<View>(null);

  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);

  const onSelect = useCallback((item: OptionItem) => {
    onChange(item);
    setValue(item.label);
    setExpanded(false);
  }, [onChange]);

  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;
        const widthOfComponent = layout.width;

        const finalValue =
          topOffset + heightOfComponent + (Platform.OS === "android" ? -32 : 3);

        setTop(finalValue);
        setWidth(widthOfComponent);
      }}
    >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text} className="font-pregular">{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    top: top + 60, // Adjust the top position to separate the dropdown items
                    width: width, // Set the width of the options to match the button
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text className="font-pregular">{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  optionItem: {
    height: 40,
    justifyContent: "center",
  },
  separator: {
    height: 4,
  },
  options: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    maxHeight: 250,
    top: 0, // Initial top value, will be adjusted dynamically
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});