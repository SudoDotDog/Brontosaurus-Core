/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 */

import { isNumber } from "util";
import { deserializeString, encryptString } from "./crypto";
import { IBrontosaurusHeader, IEncryptableObject } from "./declare";
import { BrontosaurusSign } from "./sign";
import { decouple, isExpired } from "./util";

export class BrontosaurusToken {

    public static withSecret(secret: string): BrontosaurusToken {

        return new BrontosaurusToken(secret);
    }

    private readonly _secret: string;

    private constructor(secret: string) {

        this._secret = secret;
    }

    public sign(object: IEncryptableObject): BrontosaurusSign {

        return BrontosaurusSign.create(object, this._secret);
    }

    public clock(token: string, offset: number): boolean {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return false;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;
        const header: IBrontosaurusHeader = deserializeString(serializedHeader);

        if (!isNumber(header.issuedAt) || !isNumber(header.expireAt)) {
            return false;
        }

        if (isExpired(header.expireAt, offset)) {
            return false;
        }

        return header.issuedAt <= Date.now();
    }

    public check(token: string): boolean {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return false;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;
        const serialized: string = `${serializedHeader}.${serializedObject}`;
        const encrypted: string = encryptString(serialized, this._secret);

        return encrypted === hash;
    }

    public key(token: string): string | null {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return null;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;
        const header: IBrontosaurusHeader = deserializeString(serializedHeader);

        if (header.key) {

            return header.key;
        }

        return null;
    }

    public validate(token: string, offset: number): boolean {

        return this.clock(token, offset) && this.check(token);
    }
}
