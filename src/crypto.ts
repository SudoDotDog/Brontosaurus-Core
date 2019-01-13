/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Crypto
 */

import { EncryptableObject } from "@brontosaurus/definition";
import { createHmac, Hmac } from 'crypto';

export const encryptObject = (object: EncryptableObject, secret: string): string => {

    const json: string = JSON.stringify(object);

    return encryptString(json, secret);
};

export const encryptString = (target: string, secret: string): string => {

    const hmac: Hmac = createHmac('sha1', secret);
    hmac.update(target);

    return hmac.digest('hex');
};

export const serializeObject = (object: EncryptableObject): string => {

    const json: string = JSON.stringify(object);

    const buffer: Buffer = Buffer.from(json);
    const base64: string = buffer.toString('base64');

    return base64;
};

export const deserializeString = <T = EncryptableObject>(base64: string): T => {

    const buffer: Buffer = Buffer.from(base64, 'base64');
    const content: string = buffer.toString('utf8');

    const object: T = JSON.parse(content);

    return object;
};
