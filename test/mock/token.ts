/**
 * @author WMXPY
 * @namespace Mock
 * @description EncryptableObject
 */

import { IBrontosaurusBody } from "@brontosaurus/definition";
import * as Chance from 'chance';

const chance: Chance.Chance = new Chance('mock-body');

export const createMockBody = (
    username: string = chance.string(),
    displayName: string = chance.string(),
    tags: string[] = [],
    organization: string = chance.string(),
    organizationTags: string[] = [],
    groups: [] = [],
    infos: Record<string, any> = {},
    beacons: Record<string, any> = {},
    modifies: [] = [],
    mint: string = "",
): IBrontosaurusBody => ({

    username,
    namespace: '',
    displayName,
    tags,
    groups,
    organization,
    organizationTags,
    infos,
    beacons,
    modifies,
    mint,
});
