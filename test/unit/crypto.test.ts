/**
 * @author WMXPY
 * @namespace Util
 * @description Crypto
 * @package Unit Test
 */

import { EncryptableObject } from '@brontosaurus/definition';
import { expect } from 'chai';
import * as Chance from 'chance';
import { BrontosaurusKey, deserializeString, generateKey, serializeString, signString, verifyString } from '../../src/crypto';

describe('Given [Crypto] help functions', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-crypto');

    describe('Given [generateKey] function', (): void => {

        it('should be able to generate a key', (): void => {

            const result: BrontosaurusKey = generateKey();

            expect(result.public).to.be.include('END PUBLIC KEY');
            expect(result.private).to.be.include('END PRIVATE KEY');
        });
    });

    describe('Given [Encrypt] functions', (): void => {

        const secret: BrontosaurusKey = generateKey();

        it('should be able to encode / verify object', (): void => {

            const value: string = chance.string();

            const encoded: string = signString(value, secret.private);
            const result: boolean = verifyString(value, encoded, secret.public);

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(result).to.be.true;
        });

        it('should be able to encode / verify huge object', (): void => {

            const value: string = chance.string().repeat(10000);

            const encoded: string = signString(value, secret.private);
            const result: boolean = verifyString(value, encoded, secret.public);

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(result).to.be.true;
        });
    });

    describe('Given [serializeObject] and [deserializeString] functions', (): void => {

        it('should be able to serialize object', (): void => {

            const key: string = chance.string();
            const value: string = chance.string();

            const object: EncryptableObject = {
                [key]: value,
            };

            const serialized: string = serializeString(JSON.stringify(object));

            expect(serialized).to.be.equal(serializeString(JSON.stringify(object)));
        });

        it('should be able to deserialize object', (): void => {

            const key: string = chance.string();
            const value: string = chance.string();

            const object: EncryptableObject = {
                [key]: value,
            };

            const serialized: string = serializeString(JSON.stringify(object));

            expect(JSON.stringify(object)).to.be.deep.equal(deserializeString(serialized));
        });
    });

});
