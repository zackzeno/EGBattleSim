import Unit from "@/models/Unit/Unit";


export interface DieRoll {
    initiator: Unit;
    target?: Unit;
    type: 'normal'|'special'
    dice: number;
    bonus: number;
    reason: string;
}

export interface DieRollWithResult extends DieRoll {
    result: number;
}