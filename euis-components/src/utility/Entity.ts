
///<reference path="../../types/utils.d.ts" />

import { Entity as E2 } from "cs2/utils";

export type Entity = {
    Index: number;
    Version: number;
};

export function toEntityTyped(entity: E2): Entity {
    return {
        Index: entity.index,
        Version: entity.version
    }
}