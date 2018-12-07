/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 */

export class BrontosaurusToken {

    public static withSecret(secret: string): BrontosaurusToken {

        return new BrontosaurusToken(secret);
    }

    private readonly _secret: string;

    private constructor(secret: string) {

        this._secret = secret;
    }
}
