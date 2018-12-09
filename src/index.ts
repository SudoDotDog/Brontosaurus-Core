/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Index
 */

import { deserializeString } from "./crypto";
import { IEncryptableObject } from "./declare";
import { BrontosaurusToken } from "./token";

export class Brontosaurus {

    public static token(secret: string): BrontosaurusToken {

        return BrontosaurusToken.withSecret(secret);
    }

    public static deserialize<T = IEncryptableObject>(base64: string): T {

        return deserializeString(base64);
    }
}

export { BrontosaurusSign } from "./sign";
export { BrontosaurusToken, IEncryptableObject };
