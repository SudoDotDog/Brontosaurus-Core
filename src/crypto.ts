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

export const serializeString = (before: string): string => {

    const buffer: Buffer = Buffer.from(before);
    const base64: string = buffer.toString('base64');

    return base64;
};

export const deserializeString = (before: string): string => {

    const buffer: Buffer = Buffer.from(before, 'base64');
    const content: string = buffer.toString('utf8');

    return content;
};
