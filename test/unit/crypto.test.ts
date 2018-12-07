/**
 * @author WMXPY
 * @namespace Util
 * @description Crypto
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { deserializeString, encryptObject, serializeObject } from '../../src/crypto';
import { IEncryptableObject } from '../../src/declare';

describe('Given [Crypto] help functions', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-crypto');

    describe('Given [encryptObject] function', (): void => {

        it('should be able to encode object', (): void => {

            const key: string = chance.string();
            const value: string = chance.string();

            const object: IEncryptableObject = {
                [key]: value,
            };

            const secret: string = chance.string();

            const encrypted: string = encryptObject(object, secret);

            expect(encrypted).to.be.equal(encryptObject(object, secret));
        });

        it('should get different value with different secret', (): void => {

            const key: string = chance.string();
            const value: string = chance.string();

            const object: IEncryptableObject = {
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

            const object: IEncryptableObject = {
                [key]: value,
            };

            const serialized: string = serializeObject(object);

            expect(serialized).to.be.equal(serializeObject(object));
        });

        it('should be able to deserialize object', (): void => {

            const key: string = chance.string();
            const value: string = chance.string();

            const object: IEncryptableObject = {
                [key]: value,
            };

            const serialized: string = serializeObject(object);

            expect(object).to.be.deep.equal(deserializeString(serialized));
        });
    });

});
