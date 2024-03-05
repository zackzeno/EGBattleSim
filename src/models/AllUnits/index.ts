import Unit from "@/models/Unit";
import BiCarlos from "@/models/AllUnits/BiCarlos";
import QuebStache from "@/models/AllUnits/QuebStache";
import RobotMaid from "@/models/AllUnits/RobotMaid";
import Intern from "@/models/AllUnits/Intern";
import Meteor from "@/models/AllUnits/Meteor";
import Gunana from "@/models/AllUnits/Gunana";
import BoneDaddy from "@/models/AllUnits/BoneDaddy";
import CapitalistCat from "@/models/AllUnits/CapitalistCat";
import DoorWithLaserEyes from "@/models/AllUnits/DoorWithLaserEyes";
import George from "@/models/AllUnits/George";
import Goodapple from "@/models/AllUnits/Goodapple";
import Knightnana from "@/models/AllUnits/Knightnana";
import LolShovelBird from "@/models/AllUnits/LolShovelBird";
import MyJet from "@/models/AllUnits/MyJet";
import Speed from "@/models/AllUnits/Speed";
import SvenTorgerson from "@/models/AllUnits/SvenTorgerson";
import TheGhost from "@/models/AllUnits/TheGhost";
import TheGreatMothDetective from "@/models/AllUnits/TheGreatMothDetective";
import TheSixthGraders from "@/models/AllUnits/TheSixthGraders";
import UnionDragon from "@/models/AllUnits/UnionDragon";

const ALL_UNIT_MAP: {[key: string]: {new(): Unit}} = {
    [BiCarlos.id]: BiCarlos,
    [BoneDaddy.id]: BoneDaddy,
    [CapitalistCat.id]: CapitalistCat,
    [DoorWithLaserEyes.id]: DoorWithLaserEyes,
    [George.id]: George,
    [Goodapple.id]: Goodapple,
    [Gunana.id]: Gunana,
    [Intern.id]: Intern,
    [Knightnana.id]: Knightnana,
    [LolShovelBird.id]: LolShovelBird,
    [Meteor.id]: Meteor,
    [MyJet.id]: MyJet,
    [QuebStache.id]: QuebStache,
    [RobotMaid.id]: RobotMaid,
    [Speed.id]: Speed,
    [SvenTorgerson.id]: SvenTorgerson,
    [TheGhost.id]: TheGhost,
    [TheGreatMothDetective.id]: TheGreatMothDetective,
    [TheSixthGraders.id]: TheSixthGraders,
    [UnionDragon.id]: UnionDragon
}

function makeAllUnits() {
    return Object.values(ALL_UNIT_MAP).map(Constructor => new Constructor());
}


export {ALL_UNIT_MAP, makeAllUnits}
