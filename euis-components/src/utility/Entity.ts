
///<reference path="../../types/modding.d.ts" />

import { Entity as E2 } from "common/data-binding/common-types";

export type Entity = {
    __Type: 'Unity.Entities.Entity, Unity.Entities, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null';
    Index: number;
    Version: number;
};

export function toEntityTyped(entity: E2): Entity {
    return {
        __Type: 'Unity.Entities.Entity, Unity.Entities, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null',
        Index: entity.index,
        Version: entity.version
    }
}