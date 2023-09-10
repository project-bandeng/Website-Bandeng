import { useCallback } from "react";
import config from "../config";

export default function useBackendURLTranslator(){

    const convert = (url) => {
        // const BACKEND_DOMAIN = config.BACKEND_URL;
        // let path = BACKEND_DOMAIN + url;
        return url;
    }

    return convert
}