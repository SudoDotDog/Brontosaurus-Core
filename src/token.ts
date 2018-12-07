/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 */

import { IEncryptableObject } from "./declare";
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

        return true;
    }
}
