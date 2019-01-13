/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Index
 */

import { EncryptableObject, IBrontosaurusHeader } from "@brontosaurus/definition";
import { deserializeString } from "./crypto";
import { BrontosaurusToken } from "./token";
import { decouple } from "./util";

export class Brontosaurus {

    public static token(secret: string): BrontosaurusToken {

        return BrontosaurusToken.withSecret(secret);
    }

    public static deserialize<T = EncryptableObject>(base64: string): T {

        return deserializeString(base64);
    }

    public static decoupleBody<T = EncryptableObject>(token: string): T | null {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return null;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;
        return this.deserialize(serializedObject);
    }

    public static decoupleHeader(token: string): IBrontosaurusHeader | null {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return null;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;
        return this.deserialize(serializedHeader);
    }
}

export { BrontosaurusSign } from "./sign";
export { BrontosaurusToken };

