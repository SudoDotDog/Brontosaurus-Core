/**
 * @author WMXPY
 * @namespace Brontosaurus
 * @description Namespace
 */

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
