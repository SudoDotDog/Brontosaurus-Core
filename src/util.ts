/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Util
 */

import { BrontosaurusDefinition } from "@brontosaurus/definition";
import { deserializeString, serializeString } from "./crypto";
import { TokenStringTuple } from "./declare";

export const definition = BrontosaurusDefinition.withEncoder(serializeString, deserializeString);

export const isExpired = (expireAt: number, offset: number): boolean =>
    (expireAt + offset) < Date.now();

export const decouple = (token: string): TokenStringTuple | null => {

    const splited: string[] = token.split('.');
    if (splited.length !== 3) {
        return null;
    }

    return splited as TokenStringTuple;
};
