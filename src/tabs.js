import send from 'send';
import {getTeamsMembers} from "./api/microsoft-client";

export default function tabs(server) {
    // Setup home page
    server.get('/', (req, res, next) => {
        res.render('create-team');
    });

    // Setup the static tab
    server.get('/table', async (req, res, next) => {
        let { locations } = req.query;

        if (locations) {
            locations = req.query.locations.split(',');
        } else {
            locations = ['Office', 'Home'];
        }

        const members = await getTeamsMembers();
        const memberNames = members.map((member) => member.displayName);
        res.render('table', { members: memberNames, locations });
    });

    // Serve create team tab
    server.get('/create-team', (req, res, next) => {
        res.render('create-team');
    });

    // Setup the configure tab, with first and second as content tabs
    server.get('/team-name', (req, res, next) => {
        send(req, 'src/views/team-name.html').pipe(res);
    });

    server.get('/first', (req, res, next) => {
        send(req, 'src/views/first.html').pipe(res);
    });

    server.get('/second', (req, res, next) => {
        send(req, 'src/views/second.html').pipe(res);
    });
}
