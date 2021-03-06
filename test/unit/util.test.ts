/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Util
 * @package Unit Test
 */

import { expect } from 'chai';
import { isExpired } from '../../src/util';

describe('Given [Util] help functions', (): void => {

    it('should be able to check time expiration', (): void => {

        const current: number = Date.now();

        const period: number = 100;

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(isExpired(current, period)).to.be.false;
    });
});
