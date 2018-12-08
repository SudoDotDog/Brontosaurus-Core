/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 */

import { encryptString, serializeObject } from "./crypto";
import { IBrontosaurusHeader, IEncryptableObject } from "./declare";
import { BrontosaurusSign } from "./sign";

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

    public validate(token: string): boolean {

        const splited: string[] = token.split('.');
        if (splited.length !== 3) {

            return false;
        }
        const [header, object, hash]: [IBrontosaurusHeader, IEncryptableObject, string] = splited as [IBrontosaurusHeader, IEncryptableObject, string];

        const serialized: string = `${serializeObject(header)}.${serializeObject(object)}`;

        const encrypted: string = encryptString(serialized, this._secret);
        return encrypted === hash;
    }
}
