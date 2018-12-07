/**
 * @author WMXPY
 * @namespace Mock
 * @description EncryptableObject
 */

import * as Chance from 'chance';
import { IEncryptableObject } from '../../src/declare';

export class MockEncryptableObject {

    public static create(key?: string, value?: string): MockEncryptableObject {

        return new MockEncryptableObject(key, value);
    }

    private readonly _key: string;
    private readonly _value: string;

    private constructor(key?: string, value?: string) {

        const chance: Chance.Chance = new Chance('mock-encryptable-object');

        this._key = key || chance.string();
        this._value = value || chance.string();
    }

    public get object(): IEncryptableObject {

        return {
            [this._key]: this._value,
        };
    }

    public get key(): string {

        return this._key;
    }

    public get value(): string {

        return this._value;
    }
}
