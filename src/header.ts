/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Header
 */

import { IBrontosaurusHeader } from "./declare";

export const createHeader = (): IBrontosaurusHeader => ({
    issuedAt: Date.now(),
});
