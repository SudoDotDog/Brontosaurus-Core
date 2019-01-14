/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Util
 */

import { BrontosaurusDefinition } from "@brontosaurus/definition";
import { deserializeString, serializeString } from "./crypto";

export const definition = BrontosaurusDefinition.withEncoder(serializeString, deserializeString);

export const isExpired = (expireAt: number, offset: number): boolean =>
    expireAt + offset < Date.now();

export const decouple = (token: string): [string, string, string] | null => {

    const splited: string[] = token.split('.');
    if (splited.length !== 3) {
        return null;
    }

    return splited as [string, string, string];
};
