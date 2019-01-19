/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Sign
 * @package Unit Test
 */

import { IBrontosaurusBody } from '@brontosaurus/definition';
import { expect } from 'chai';
import * as Chance from 'chance';
import { BrontosaurusSign } from '../../src/sign';
import { MockEncryptableObject } from '../mock/encryptable-object';
import { createMockBody } from '../mock/token';

describe('Given {BrontosaurusSign} class', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-sign');

    it('should be able to construct object', (): void => {

        const secret: string = chance.string();
        const mockObject: MockEncryptableObject = MockEncryptableObject.create();
        const body: IBrontosaurusBody = createMockBody();

        const sign: BrontosaurusSign = BrontosaurusSign.create(chance.string(), body, secret);

        expect(sign.body).to.be.deep.equal(body);
    });

    it('should be able to generate token', (): void => {

        const currentTime: number = Date.now();

        const secret: string = chance.string();
        const mockObject: MockEncryptableObject = MockEncryptableObject.create();

        const sign: BrontosaurusSign = BrontosaurusSign.create(chance.string(), createMockBody(), secret);
        const token: string = sign.token(currentTime, currentTime);

        expect(token).to.be.equal(sign.token(currentTime, currentTime));
    });
});
