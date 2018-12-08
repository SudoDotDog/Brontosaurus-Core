/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Util
 * @package Unit Test
 */


import { expect } from 'chai';
import * as Chance from 'chance';
import { isExpired } from '../../src/util';

describe('Given [Util] help functions', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-util');

    it('should be able to check time expiration', (): void => {

        const current: number = Date.now();

        const period: number = 100;

        // tslint:disable-next-line
        expect(isExpired(current, period)).to.be.false;
    });
});
