import {getTeamsMembers} from "../clients/microsoft-client";
import {getMonday} from "../helpers/date-helper";

export const calender = async (req, res) => {
    const locations = req.query.locations.split(',');
    const members = await getTeamsMembers();
    const memberNames = members.map((member) => member.displayName);
    const weekCommencing = getMonday();

    res.render('calender', { members: memberNames, locations, weekCommencing });
};
