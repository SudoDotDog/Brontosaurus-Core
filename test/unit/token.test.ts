/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 * @package Unit Test
 */

import { IBrontosaurusBody } from '@brontosaurus/definition';
import { expect } from 'chai';
import * as Chance from 'chance';
import { BrontosaurusSign } from '../../src/sign';
import { BrontosaurusToken } from '../../src/token';
import { createMockBody } from '../mock/token';

describe('Given {BrontosaurusToken} class', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-token');

    it('should be able to construct object', (): void => {

        const key: string = chance.string();
        const secret: string = chance.string();
        const token: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        expect(token).to.be.instanceOf(BrontosaurusToken);
    });

    it('should be able to get key', (): void => {

        const currentTime: number = Date.now();

        const key: string = chance.string();
        const secret: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(currentTime, currentTime);

        const result: string | null = BrontosaurusToken.key(token);

        expect(result).to.be.equal(key);
    });

    it('should be able to sign token', (): void => {

        const currentTime: number = Date.now();

        const key: string = chance.string();
        const body: IBrontosaurusBody = createMockBody();
        const secret: string = chance.string();

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);
        const sign: BrontosaurusSign = clazz.sign(key, body);
        const token: string = sign.token(currentTime, currentTime);

        const result: string | null = BrontosaurusToken.key(token);

        expect(result).to.be.equal(key);
    });

    it('should be valid if valid', (): void => {

        const currentTime: number = Date.now();

        const key: string = chance.string();
        const secret: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(currentTime, currentTime);

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // tslint:disable-next-line
        expect(clazz.validate(token, 5000)).to.be.true;
    });

    it('should be invalid if expired', (): void => {

        const mockTime: number = Date.now() - 8000;

        const key: string = chance.string();
        const secret: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(mockTime, Date.now());

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // tslint:disable-next-line
        expect(clazz.validate(token, 5000)).to.be.false;
    });

    it('should be invalid if time traveling', (): void => {

        const mockTime: number = Date.now() + 8000;

        const key: string = chance.string();
        const secret: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(mockTime, mockTime);

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // tslint:disable-next-line
        expect(clazz.validate(token, 5000)).to.be.false;
    });

    it('should be invalid if can not crypt', (): void => {

        const mockTime: number = Date.now();
        const currentTime: number = Date.now();

        const key: string = chance.string();
        const secret: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(mockTime, currentTime) + chance.string();

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // tslint:disable-next-line
        expect(clazz.validate(token, 5000)).to.be.false;
    });
});
