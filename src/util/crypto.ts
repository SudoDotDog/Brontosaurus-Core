/**
 * @author WMXPY
 * @namespace Util
 * @description Crypto
 */

import { createHmac, Hmac } from 'crypto';
import { EncryptableObject } from "./declare";

export const encryptObject = (object: EncryptableObject, secret: string): string => {

    const json: string = JSON.stringify(object);

    const hmac: Hmac = createHmac('sha256', secret);
    hmac.update(json);
    return hmac.digest('hex');
};

export const serializeObject = (object: EncryptableObject): string => {

    const json: string = JSON.stringify(object);

    const buffer: Buffer = Buffer.from(json);
    const base64: string = buffer.toString('base64');

    return base64;
};

export const deserializeString = (base64: string): EncryptableObject => {

    const buffer: Buffer = Buffer.from(base64, 'base64');
    const content: string = buffer.toString('utf8');

    const object: EncryptableObject = JSON.parse(content);

    return object;
};
