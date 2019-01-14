/**
 * @author WMXPY
 * @namespace Util
 * @description Crypto
 * @package Unit Test
 */

import { EncryptableObject } from '@brontosaurus/definition';
import { expect } from 'chai';
import * as Chance from 'chance';
import { deserializeString, encryptObject, serializeString } from '../../src/crypto';

describe('Given [Crypto] help functions', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-crypto');

    describe('Given [encryptObject] function', (): void => {

        it('should be able to encode object', (): void => {

            const key: string = chance.string();
            const value: string = chance.string();

            const object: EncryptableObject = {
                [key]: value,
            };

            const secret: string = chance.string();

            const encrypted: string = encryptObject(object, secret);

            expect(encrypted).to.be.equal(encryptObject(object, secret));
        });

        it('should get different value with different secret', (): void => {

            const key: string = chance.string();
            const value: string = chance.string();

            const object: EncryptableObject = {
                [key]: value,
            };

            const encrypted: string = encryptObject(object, chance.string());

            expect(encrypted).to.be.not.equal(encryptObject(object, chance.string()));
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
