/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Token
 * @package Unit Test
 */

import { IBrontosaurusBody } from '@brontosaurus/definition';
import { expect } from 'chai';
import * as Chance from 'chance';
import { BrontosaurusKey, generateKey } from '../../src/crypto';
import { BrontosaurusSign } from '../../src/sign';
import { BrontosaurusToken } from '../../src/token';
import { createMockBody } from '../mock/token';

describe('Given {BrontosaurusToken} class', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-token');
    const secret: BrontosaurusKey = generateKey();

    it('should be able to construct object', (): void => {

        const token: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        expect(token).to.be.instanceOf(BrontosaurusToken);
    });

    it('should be able to get key', (): void => {

        const currentTime: number = Date.now();

        const key: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(chance.string(), currentTime, currentTime);

        const result: string | null = BrontosaurusToken.key(token);

        expect(result).to.be.equal(key);
    });

    it('should be able to sign token', (): void => {

        const currentTime: number = Date.now();

        const key: string = chance.string();
        const body: IBrontosaurusBody = createMockBody();

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);
        const sign: BrontosaurusSign = clazz.sign(key, body);
        const token: string = sign.token(chance.string(), currentTime, currentTime);

        const result: string | null = BrontosaurusToken.key(token);

        expect(result).to.be.equal(key);
    });

    it('should be valid if valid', (): void => {

        const currentTime: number = Date.now();

        const key: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(chance.string(), currentTime, currentTime);

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-magic-numbers
        expect(clazz.validate(token, 5000)).to.be.true;
    });

    it('should be invalid if expired', (): void => {

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const mockTime: number = Date.now() - 8000;

        const key: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(chance.string(), mockTime, Date.now());

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-magic-numbers
        expect(clazz.validate(token, 5000)).to.be.false;
    });

    it('should be invalid if time traveling', (): void => {

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const mockTime: number = Date.now() + 8000;

        const key: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(chance.string(), mockTime, mockTime);

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-magic-numbers
        expect(clazz.validate(token, 5000)).to.be.false;
    });

    it('should be invalid if can not crypt', (): void => {

        const mockTime: number = Date.now();
        const currentTime: number = Date.now();

        const key: string = chance.string();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(chance.string(), mockTime, currentTime).replace('a', 'b');

        const clazz: BrontosaurusToken = BrontosaurusToken.withSecret(secret);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-magic-numbers
        expect(clazz.validate(token, 5000)).to.be.false;
    });
});
