import React, { useState } from "react";
import { Button, Text, View } from "react-native";

const CounterButton = () => {
    const [count, setCount] = useState(0);

    return (
        <View>
            <Text>Count: {count}</Text>
            <Button title="Increment" onPress={() => setCount(count + 1)} />
        </View>
    );
};

export default CounterButton;
