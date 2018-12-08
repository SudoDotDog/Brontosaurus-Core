/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Crypto
 */

import { createHmac, Hmac } from 'crypto';
import { IEncryptableObject } from "./declare";

export const encryptObject = (object: IEncryptableObject, secret: string): string => {

    const json: string = JSON.stringify(object);

    return encryptString(json, secret);
};

export const encryptString = (target: string, secret: string): string => {

    const hmac: Hmac = createHmac('sha1', secret);
    hmac.update(target);

    return hmac.digest('hex');
};

export const serializeObject = (object: IEncryptableObject): string => {

    const json: string = JSON.stringify(object);

    const buffer: Buffer = Buffer.from(json);
    const base64: string = buffer.toString('base64');

    return base64;
};

export const deserializeString = <T = IEncryptableObject>(base64: string): T => {

    const buffer: Buffer = Buffer.from(base64, 'base64');
    const content: string = buffer.toString('utf8');

    const object: T = JSON.parse(content);

    return object;
};
