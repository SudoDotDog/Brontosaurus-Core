/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { isNumber, isString } from "util";
import { deserializeString, encryptString } from "./crypto";
import { BrontosaurusSign } from "./sign";
import { decouple, isExpired } from "./util";

export class BrontosaurusToken {

    public static withSecret(secret: string): BrontosaurusToken {

        return new BrontosaurusToken(secret);
    }

    public static key(token: string): string | null {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return null;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;

        try {

            const header: IBrontosaurusHeader = JSON.parse(deserializeString(serializedHeader));

            if (!isString(header.key)) {
                return null;
            }

            if (header.key) {
                return header.key;
            }

            return null;
        } catch (err) {

            return null;
        }
    }

    private readonly _secret: string;

    private constructor(secret: string) {

        this._secret = secret;
    }

    public sign(key: string, body: IBrontosaurusBody): BrontosaurusSign {

        return BrontosaurusSign.create(key, body, this._secret);
    }

    public key(token: string): string | null {

        return BrontosaurusToken.key(token);
    }

    public clock(token: string, offset: number, allowDelay: number = 0): boolean {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return false;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;

        try {

            const header: IBrontosaurusHeader = JSON.parse(deserializeString(serializedHeader));

            if (!isNumber(header.issuedAt) || !isNumber(header.expireAt) || !isString(header.key)) {
                return false;
            }

            if (isExpired(header.expireAt, offset)) {
                return false;
            }

            return header.issuedAt <= (Date.now() + allowDelay);
        } catch (err) {

            return false;
        }
    }

    public body(token: string): IBrontosaurusBody | null {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return null;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;

        try {

            const body: IBrontosaurusBody = JSON.parse(deserializeString(serializedObject));

            return body;
        } catch (err) {

            return null;
        }
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

    public validate(token: string, offset: number): boolean {

        return this.clock(token, offset) && this.check(token);
    }
}
