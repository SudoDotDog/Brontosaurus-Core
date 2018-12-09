/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Sign
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { BrontosaurusSign } from '../../src/sign';
import { MockEncryptableObject } from '../mock/encryptable-object';

describe('Given {BrontosaurusSign} class', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-sign');

    it('should be able to construct object', (): void => {

        const secret: string = chance.string();
        const mockObject: MockEncryptableObject = MockEncryptableObject.create();

        const sign: BrontosaurusSign = BrontosaurusSign.create(mockObject.object, secret);

        expect(sign.object).to.be.deep.equal(mockObject.object);
    });

    it('should be able to generate token', (): void => {

        const currentTime: number = Date.now();

        const secret: string = chance.string();
        const mockObject: MockEncryptableObject = MockEncryptableObject.create();

        const sign: BrontosaurusSign = BrontosaurusSign.create(mockObject.object, secret);
        const token: string = sign.token(currentTime);

        expect(token).to.be.equal(sign.token(currentTime));
    });
});
