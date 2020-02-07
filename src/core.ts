/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Core
 */

import { EncryptableObject, IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { BrontosaurusKey, deserializeString, generateKey } from "./crypto";
import { BrontosaurusToken } from "./token";
import { decouple } from "./util";

export class Brontosaurus {

    public static token(secret: BrontosaurusKey): BrontosaurusToken {

        return BrontosaurusToken.withSecret(secret);
    }

    public static deserialize<T = EncryptableObject>(base64: string): T {

        const deserialized: string = deserializeString(base64);
        return JSON.parse(deserialized);
    }

    public static decouple(token: string): [string, string, string] | null {

        const decoupled: [string, string, string] | null = decouple(token);
        return decoupled;
    }

    public static decoupleBody(token: string): IBrontosaurusBody | null {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return null;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;

        try {

            const deserialized: IBrontosaurusBody = this.deserialize(serializedObject);
            return deserialized;
        } catch (err) {

            return null;
        }
    }

    public static decoupleHeader(token: string): IBrontosaurusHeader | null {

        const decoupled: [string, string, string] | null = decouple(token);

        if (!decoupled) {
            return null;
        }

        const [serializedHeader, serializedObject, hash]: [string, string, string] = decoupled;

        try {

            const deserialized: IBrontosaurusHeader = this.deserialize(serializedHeader);
            return deserialized;
        } catch (err) {

            return null;
        }
    }

    public static generateBrontosaurusKey(): BrontosaurusKey {

        return generateKey();
    }
}
