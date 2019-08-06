/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Index
 * @package Unit Test
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from '@brontosaurus/definition';
import { expect } from 'chai';
import * as Chance from 'chance';
import { Brontosaurus, BrontosaurusSign } from '../../src';
import { BrontosaurusKey, generateKey, serializeString } from '../../src/crypto';
import { createMockBody } from '../mock/token';

describe('Given {Brontosaurus} class', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-index');
    const secret: BrontosaurusKey = generateKey();

    it('should be able to deserialize object', (): void => {

        const object: {
            a: string;
        } = {
            a: chance.string(),
        };
        const serialized: string = serializeString(JSON.stringify(object));
        const deserialized: {
            a: string;
        } = Brontosaurus.deserialize(serialized);

        expect(deserialized).to.be.deep.equal(object);
    });

    it('should be able to decouple body', (): void => {

        const body: IBrontosaurusBody = createMockBody();
        const currentTime: number = Date.now();

        const sign: BrontosaurusSign = BrontosaurusSign.create(chance.string(), body, secret);
        const token: string = sign.token(currentTime, currentTime);

        const deserialized: IBrontosaurusBody | null = Brontosaurus.decoupleBody(token);

        expect(deserialized).to.be.deep.equal(body);
    });

    it('should be able to decouple header', (): void => {

        const key: string = chance.string();
        const currentTime: number = Date.now();

        const sign: BrontosaurusSign = BrontosaurusSign.create(key, createMockBody(), secret);
        const token: string = sign.token(currentTime, currentTime);

        const deserialized: IBrontosaurusHeader | null = Brontosaurus.decoupleHeader(token);

        expect(deserialized).to.be.deep.equal({
            issuedAt: currentTime,
            expireAt: currentTime,
            key,
        });
    });
});
