/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Index
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Brontosaurus, BrontosaurusSign } from '../../src';
import { serializeObject } from '../../src/crypto';
import { IBrontosaurusHeader } from '../../src/declare';

describe('Given {Brontosaurus} class', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-index');

    it('should be able to deserialize object', (): void => {

        const object: {
            a: string;
        } = {
            a: chance.string(),
        };
        const serialized: string = serializeObject(object);
        const deserialized: {
            a: string;
        } = Brontosaurus.deserialize(serialized);

        expect(deserialized).to.be.deep.equal(object);
    });

    it('should be able to decouple body', (): void => {

        const object: {
            a: string;
        } = {
            a: chance.string(),
        };
        const secret: string = chance.string();
        const currentTime: number = Date.now();

        const sign: BrontosaurusSign = BrontosaurusSign.create(object, secret);
        const token: string = sign.token(currentTime, currentTime);

        const deserialized: {
            a: string;
        } | null = Brontosaurus.decoupleBody(token);

        expect(deserialized).to.be.deep.equal(object);
    });

    it('should be able to decouple header', (): void => {

        const object: {
            a: string;
        } = {
            a: chance.string(),
        };
        const secret: string = chance.string();
        const currentTime: number = Date.now();

        const sign: BrontosaurusSign = BrontosaurusSign.create(object, secret);
        const token: string = sign.token(currentTime, currentTime);

        const deserialized: IBrontosaurusHeader | null = Brontosaurus.decoupleHeader(token);

        expect(deserialized).to.be.deep.equal({
            issuedAt: currentTime,
            expireAt: currentTime,
        });
    });
});
