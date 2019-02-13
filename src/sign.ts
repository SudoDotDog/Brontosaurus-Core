/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Sign
 */

import { BrontosaurusDefinition, IBrontosaurusBody } from "@brontosaurus/definition";
import { encryptString } from "./crypto";
import { definition } from "./util";

export class BrontosaurusSign {

    public static create(key: string, body: IBrontosaurusBody, secret: string): BrontosaurusSign {

        return new BrontosaurusSign(key, body, secret);
    }

    private readonly _key: string;
    private readonly _body: IBrontosaurusBody;
    private readonly _secret: string;

    private constructor(key: string, body: IBrontosaurusBody, secret: string) {

        this._key = key;
        this._body = body;
        this._secret = secret;
    }

    public get body(): IBrontosaurusBody {

        return this._body;
    }

    public token(expireAt: number = Date.now(), issuedAt: number = Date.now()): string {

        const header: string = definition.header({
            expireAt,
            issuedAt,
            key: this._key,
        });
        const body: string = definition.body(this.body);

        const encrypted: string = BrontosaurusDefinition.signWith(header, body, (content: string) => encryptString(content, this._secret));
        return encrypted;
    }
}
