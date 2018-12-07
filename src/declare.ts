/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Declare
 */

export interface IEncryptableObject {

    [key: string]: string | number | boolean;
}

export interface IBrontosaurusHeader extends IEncryptableObject {

    issuedAt: number;
}
