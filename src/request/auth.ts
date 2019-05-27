import {IAuth} from "./interfaces";

/**
 * set auth in base64
 * @param auth 
 */
export const setBase64 = (auth: IAuth): string => {
    const base64 = Buffer
        .from(`${auth.username}:${auth.password}`, "utf8")
        .toString("base64");

    return base64;
}