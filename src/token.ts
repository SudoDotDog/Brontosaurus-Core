/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { BrontosaurusKey, deserializeString, verifyString } from "./crypto";
import { TokenStringTuple } from "./declare";
import { BrontosaurusSign } from "./sign";
import { decouple, isExpired } from "./util";

export class BrontosaurusToken {

    public static withSecret(secret: BrontosaurusKey): BrontosaurusToken {

        return new BrontosaurusToken(secret);
    }

    public static key(token: string): string | null {

        const decoupled: TokenStringTuple | null = decouple(token);

        if (!decoupled) {
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [serializedHeader, serializedObject, hash]: TokenStringTuple = decoupled;

        try {

            const header: IBrontosaurusHeader = JSON.parse(deserializeString(serializedHeader));

            if (typeof header.key !== 'string') {
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

    private readonly _secret: BrontosaurusKey;

    private constructor(secret: BrontosaurusKey) {

        this._secret = secret;
    }

    public sign(key: string, body: IBrontosaurusBody): BrontosaurusSign {

        return BrontosaurusSign.create(key, body, this._secret);
    }

    public key(token: string): string | null {

        return BrontosaurusToken.key(token);
    }

    public clock(token: string, offset: number, allowDelay: number = 0): boolean {

        const decoupled: TokenStringTuple | null = decouple(token);

        if (!decoupled) {
            return false;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [serializedHeader, serializedObject, hash]: TokenStringTuple = decoupled;

        try {

            const header: IBrontosaurusHeader = JSON.parse(deserializeString(serializedHeader));

            if (typeof header.issuedAt !== 'number'
                || typeof header.expireAt !== 'number'
                || typeof header.key !== 'string') {
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

        const decoupled: TokenStringTuple | null = decouple(token);

        if (!decoupled) {
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [serializedHeader, serializedObject, hash]: TokenStringTuple = decoupled;

        try {

            const body: IBrontosaurusBody = JSON.parse(deserializeString(serializedObject));

            return body;
        } catch (err) {

            return null;
        }
    }

    public check(token: string): boolean {

        const decoupled: TokenStringTuple | null = decouple(token);

        if (!decoupled) {
            return false;
        }

        const [serializedHeader, serializedObject, hash]: TokenStringTuple = decoupled;
        const serialized: string = `${serializedHeader}.${serializedObject}`;
        const result: boolean = verifyString(serialized, hash, this._secret.public);

        return result;
    }

    public validate(token: string, offset: number): boolean {

        return this.clock(token, offset) && this.check(token);
    }
}
