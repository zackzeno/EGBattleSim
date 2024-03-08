import Passive from "@/models/Game/Passive";
import Unit from "@/models/Unit/Unit";
import {Base} from "postcss-selector-parser";

interface BaseEffect {
    type: string;
    initiator: Unit;
    target?: Unit;
}

export interface NullEffect extends BaseEffect {
    type: 'null'
}

export interface DamageEffect extends BaseEffect {
    type: 'damage',
    amount: number,
    target: Unit
}
export interface HealEffect extends BaseEffect {
    type: 'heal',
    amount: number,
    allowAboveBase: boolean,
    target: Unit
}
export interface AddPassiveEffect extends BaseEffect {
    type: 'add-passive';
    passive: Passive;
    target: Unit;
}
export interface RemovePassiveEffect extends BaseEffect {
    type: 'remove-passive';
    passive: Passive;
    target: Unit;
}
export interface SpecialEffect extends BaseEffect {
    type: 'special',
    code: string

    isNegative?: boolean,
    metadata?: object
}

export type AnyEffect =
    | NullEffect
    | DamageEffect
    | HealEffect
    | AddPassiveEffect
    | RemovePassiveEffect
    | SpecialEffect;