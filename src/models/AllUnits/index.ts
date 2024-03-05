import Unit from "@/models/Unit";
import BiCarlos from "@/models/AllUnits/BiCarlos";
import QuebStache from "@/models/AllUnits/QuebStache";
import RobotMaid from "@/models/AllUnits/RobotMaid";
import Intern from "@/models/AllUnits/Intern";
import Meteor from "@/models/AllUnits/Meteor";
import Gunana from "@/models/AllUnits/Gunana";

const ALL_UNITS: Unit[] = [
    new BiCarlos(),
    new QuebStache(),
    new RobotMaid(),
    new Intern(),
    new Meteor(),
    new Gunana()
];

export default ALL_UNITS;