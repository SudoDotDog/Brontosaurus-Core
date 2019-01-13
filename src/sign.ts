/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Sign
 */

import { EncryptableObject, IBrontosaurusHeader } from "@brontosaurus/definition";
import { encryptString, serializeObject } from "./crypto";
import { createHeader } from "./util";

export class BrontosaurusSign {

    public static create(object: EncryptableObject, secret: string): BrontosaurusSign {

        return new BrontosaurusSign(object, secret);
    }

    private readonly _object: EncryptableObject;
    private readonly _secret: string;

    private _key: string | null;

    private constructor(object: EncryptableObject, secret: string) {

        this._object = object;
        this._secret = secret;

        this._key = null;
    }

    public get object(): EncryptableObject {

        return this._object;
    }

    public key(key: string): BrontosaurusSign {

        this._key = key;
        return this;
    }

    public token(expireAt: number = Date.now(), issuedAt: number = Date.now()): string {

        const header: IBrontosaurusHeader = createHeader(expireAt, issuedAt, this._key);
        const serialized: string = `${serializeObject(header)}.${serializeObject(this._object)}`;

        const encrypted: string = encryptString(serialized, this._secret);

        return `${serialized}.${encrypted}`;
    }
}
