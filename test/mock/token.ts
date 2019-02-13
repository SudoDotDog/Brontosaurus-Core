/**
 * @author WMXPY
 * @namespace Mock
 * @description EncryptableObject
 */

import { IBrontosaurusBody } from "@brontosaurus/definition";
import * as Chance from 'chance';

const chance: Chance.Chance = new Chance('mock-body');

export const createMockBody = (username: string = chance.string(), groups: [] = [], infos: {} = {}, beacons: {} = {}, mint: string = ""): IBrontosaurusBody => ({

    username,
    groups,
    infos,
    beacons,
    mint,
});
