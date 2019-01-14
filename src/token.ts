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

    public static withSecret(key: string, secret: string): BrontosaurusToken {

        return new BrontosaurusToken(key, secret);
    }

    public static withoutSecret(key: string): BrontosaurusToken {

        return new BrontosaurusToken(key);
    }

    private readonly _secret: string | null;
    private readonly _key: string;

    private constructor(key: string, secret?: string) {

        this._key = key;
        this._secret = secret || null;
    }

    public sign(body: IBrontosaurusBody): BrontosaurusSign {

        if (!this._secret) {
            throw new Error('[Brontosaurus-Core] Need Secret');
        }

        return BrontosaurusSign.create(this._key, body, this._secret);
    }

    public clock(token: string, offset: number): boolean {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return false;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;
        const header: IBrontosaurusHeader = JSON.parse(deserializeString(serializedHeader));

        if (!isNumber(header.issuedAt) || !isNumber(header.expireAt) || !isString(header.key)) {
            return false;
        }

        if (isExpired(header.expireAt, offset)) {
            return false;
        }

        return header.issuedAt <= Date.now();
    }

    public check(token: string): boolean {

        if (!this._secret) {
            throw new Error('[Brontosaurus-Core] Need Secret');
        }

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
        const header: IBrontosaurusHeader = JSON.parse(deserializeString(serializedHeader));

        if (!isString(header.key)) {
            return null;
        }

        if (header.key) {
            return header.key;
        }

        return null;
    }

    public validate(token: string, offset: number): boolean {

        return this.clock(token, offset) && this.check(token);
    }
}
