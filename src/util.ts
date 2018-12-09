/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Util
 */

import { IBrontosaurusHeader } from "./declare";

export const createHeader = (time: number): IBrontosaurusHeader => ({
    issuedAt: time,
});

export const isExpired = (time: number, offset: number): boolean =>
    time + offset < Date.now();

export const decouple = (token: string): [string, string, string] | null => {

    const splited: string[] = token.split('.');
    if (splited.length !== 3) {
        return null;
    }

    return splited as [string, string, string];
};
