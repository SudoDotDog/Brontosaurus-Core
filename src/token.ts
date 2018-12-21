/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 */

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

        if (!header.issuedAt) {
            return false;
        }

        if (isExpired(header.issuedAt, offset)) {
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

    public validate(token: string, offset: number): boolean {

        return this.clock(token, offset) && this.check(token);
    }
}
