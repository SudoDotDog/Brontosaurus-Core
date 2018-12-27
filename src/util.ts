/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Util
 */

import { IBrontosaurusHeader } from "./declare";

export const createHeader = (expireAt: number, issuedAt: number, key?: string | null): IBrontosaurusHeader => {

    const header: IBrontosaurusHeader = {
        expireAt,
        issuedAt,
    };

    if (key) {

        return {
            ...header,
            key,
        };
    }

    return header;
};

export const isExpired = (expireAt: number, offset: number): boolean =>
    expireAt + offset < Date.now();

export const decouple = (token: string): [string, string, string] | null => {

    const splited: string[] = token.split('.');
    if (splited.length !== 3) {
        return null;
    }

    return splited as [string, string, string];
};
