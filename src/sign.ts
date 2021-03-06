/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Sign
 */

import { BrontosaurusDefinition, IBrontosaurusBody } from "@brontosaurus/definition";
import { BrontosaurusKey, signString } from "./crypto";
import { definition } from "./util";

export class BrontosaurusSign {

    public static create(key: string, body: IBrontosaurusBody, secret: BrontosaurusKey): BrontosaurusSign {

        return new BrontosaurusSign(key, body, secret);
    }

    private readonly _key: string;
    private readonly _body: IBrontosaurusBody;
    private readonly _secret: BrontosaurusKey;

    private constructor(key: string, body: IBrontosaurusBody, secret: BrontosaurusKey) {

        this._key = key;
        this._body = body;
        this._secret = secret;
    }

    public get body(): IBrontosaurusBody {

        return this._body;
    }

    public get publicKey(): string {

        return this._secret.public;
    }

    public get privateKey(): string {

        return this._secret.private;
    }

    public token(
        attempt: string,
        expireAt: number = Date.now(),
        issuedAt: number = Date.now(),
    ): string {

        const header: string = definition.header({
            alg: "RS256",
            algorithm: "RSA-SHA256",
            attempt,
            expireAt,
            issuedAt,
            key: this._key,
        });

        const body: string = definition.body(this.body);

        const encrypted: string = BrontosaurusDefinition.signWith(
            header,
            body,
            (content: string) => signString(content, this._secret.private),
        );
        return encrypted;
    }
}
