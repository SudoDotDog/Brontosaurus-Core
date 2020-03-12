/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Namespace
 */

export enum BRONTOSAURUS_NAMESPACE {

    DEFAULT = "brontosaurus.default",
    ADMIN = "brontosaurus.admin",
}

export const verifyNamespace = (namespace: string): boolean => {

    const matcher: RegExp = /^[A-Za-z0-9][A-Za-z0-9-.]+[A-Za-z0-9]$/;
    if (!matcher.test(namespace)) {
        return false;
    }

    const splited: string[] = namespace.split('.');
    if (splited.length < 2) {
        return false;
    }

    return true;
};
