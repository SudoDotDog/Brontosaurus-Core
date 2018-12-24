/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { BrontosaurusSign } from '../../src/sign';
import { BrontosaurusToken } from '../../src/token';
import { MockEncryptableObject } from '../mock/encryptable-object';

describe('Given {BrontosaurusToken} class', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-token');

    it('should be able to construct object', (): void => {

        const secret: string = chance.string();
        const token: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        expect(token).to.be.instanceOf(BrontosaurusToken);
    });

    it('should be valid if valid', (): void => {

        const currentTime: number = Date.now();

        const secret: string = chance.string();
        const mockObject: MockEncryptableObject = MockEncryptableObject.create();

        const sign: BrontosaurusSign = BrontosaurusSign.create(mockObject.object, secret);
        const token: string = sign.token(currentTime, currentTime);

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // tslint:disable-next-line
        expect(clazz.validate(token, 5000)).to.be.true;
    });

    it('should be invalid if expired', (): void => {

        const mockTime: number = Date.now() - 8000;

        const secret: string = chance.string();
        const mockObject: MockEncryptableObject = MockEncryptableObject.create();

        const sign: BrontosaurusSign = BrontosaurusSign.create(mockObject.object, secret);
        const token: string = sign.token(mockTime, Date.now());

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // tslint:disable-next-line
        expect(clazz.validate(token, 5000)).to.be.false;
    });

    it('should be invalid if time traveling', (): void => {

        const mockTime: number = Date.now() + 8000;
        const currentTime: number = Date.now();

        const secret: string = chance.string();
        const mockObject: MockEncryptableObject = MockEncryptableObject.create();

        const sign: BrontosaurusSign = BrontosaurusSign.create(mockObject.object, secret);
        const token: string = sign.token(mockTime, mockTime);

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // tslint:disable-next-line
        expect(clazz.validate(token, 5000)).to.be.false;
    });

    it('should be invalid if can not crypt', (): void => {

        const mockTime: number = Date.now();
        const currentTime: number = Date.now();

        const secret: string = chance.string();
        const mockObject: MockEncryptableObject = MockEncryptableObject.create();

        const sign: BrontosaurusSign = BrontosaurusSign.create(mockObject.object, secret);
        const token: string = sign.token(mockTime, currentTime) + chance.string();

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // tslint:disable-next-line
        expect(clazz.validate(token, 5000)).to.be.false;
    });
});
