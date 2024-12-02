import React from "react";
import { Platform } from "react-native";

import FaceComparison from "./FaceComparison";
import FaceComparisonMobile from "./FaceComparisonMobile";

const FaceComparisonWrapper: React.FC = () => {
    return Platform.OS === "web" ? (
        <FaceComparison />
    ) : (
        <FaceComparisonMobile />
    );
};

export default FaceComparisonWrapper;
