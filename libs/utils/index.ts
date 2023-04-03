import { EnumNFT } from "libs/types";
import { MapIconNFT } from "utils/Images";

export const Utils = {
    getImageNFT: (type: EnumNFT) => {
        return MapIconNFT[type];
    }
}