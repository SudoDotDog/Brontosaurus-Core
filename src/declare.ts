/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Declare
 */

export type Basics = string | number | boolean;

export interface IEncryptableObject {

    [key: string]: Basics | null | undefined | Basics[];
}

export interface IBrontosaurusBody extends IEncryptableObject {

    application: string;
    groups: string[];
    username: string;
}

export interface IBrontosaurusHeader extends IEncryptableObject {

    expireAt: number;
    issuedAt: number;
    key?: string;
}
