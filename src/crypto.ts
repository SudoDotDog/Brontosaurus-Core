/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Crypto
 */

import { createHash, createSign, createVerify, generateKeyPairSync, Hash, Signer, Verify } from 'crypto';

export type BrontosaurusKey = {
    readonly public: string;
    readonly private: string;
};

export const generateKey = (): BrontosaurusKey => {

    const result = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    } as any);

    return {
        public: result.publicKey,
        private: result.privateKey,
    };
};

export const md5String = (target: string): string => {

    const hash: Hash = createHash('md5');
    hash.update(target);

    return hash.digest('hex');
};

export const signString = (target: string, privateKey: string): string => {

    const signer: Signer = createSign('RSA-SHA256');
    signer.update(target);
    const sign: string = signer.sign(privateKey, 'base64').replace(/=/g, '');

    return sign.replace(/\+/g, '-').replace(/\//g, '_');
};

export const verifyString = (target: string, token: string, publicKey: string): boolean => {

    const verify: Verify = createVerify('RSA-SHA256');
    verify.update(target);
    const result: boolean = verify.verify(publicKey, token, 'base64');

    return result;
};

export const serializeString = (before: string): string => {

    const buffer: Buffer = Buffer.from(before);
    const base64: string = buffer.toString('base64');

    return base64.replace(/=/g, '');
};

export const deserializeString = (before: string): string => {

    const buffer: Buffer = Buffer.from(before, 'base64');
    const content: string = buffer.toString('utf8');

    return content;
};
