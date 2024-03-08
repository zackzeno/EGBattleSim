import Game from "@/models/Game/Game";
import Unit from "@/models/Unit/Unit";
import {AnyEffect, DamageEffect, HealEffect, NullEffect} from "@/models/Game/Effect";
import {DieRoll, DieRollWithResult} from "@/models/Game/DieRoll";


interface Passive {
    onRoundStart?(game: Game, unit: Unit): Promise<void>
    onTurnStart?(game: Game, unit: Unit): Promise<AnyEffect[]>
    onBeforeRollDie?(game: Game, unit: Unit, dieRoll: DieRoll): Promise<DieRoll>
    onTurnEnd?(game: Game, unit: Unit): Promise<void>
    onRoundEnd?(game: Game, unit: Unit): Promise<void>

    onDamageTarget?(game: Game, unit: Unit, turnEffect: DamageEffect): Promise<[NullEffect|DamageEffect, AnyEffect[]]>
    onHealTarget?(game: Game, unit: Unit, turnEffect: HealEffect): Promise<[NullEffect|HealEffect, AnyEffect[]]>
    // onTarget?(game: Game, unit: Unit, turnEffect: AnyEffect): Promise<[AnyEffect, AnyEffect[]]>
}

class Passive {

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly parent: Unit,
        public hidden: boolean = false,
        public readonly expiration?: number,
    ) {

    }

}


export default Passive