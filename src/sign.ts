/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Sign
 */

import { encryptString, serializeObject } from "./crypto";
import { IBrontosaurusHeader, IEncryptableObject } from "./declare";
import { createHeader } from "./header";

export class BrontosaurusSign {

    public static create(object: IEncryptableObject, secret: string): BrontosaurusSign {

        return new BrontosaurusSign(object, secret);
    }

    private readonly _object: IEncryptableObject;
    private readonly _secret: string;

    private constructor(object: IEncryptableObject, secret: string) {

        this._object = object;
        this._secret = secret;
    }

    public token(): string {

        const header: IBrontosaurusHeader = createHeader();
        const serialized: string = `${serializeObject(header)}.${serializeObject(this._object)}`;

        const encrypted: string = encryptString(serialized, this._secret);

        return `${serialized}.${encrypted}`;
    }
}
