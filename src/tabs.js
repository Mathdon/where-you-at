import send from 'send';

export default function tabs(server) {
    // Setup home page
    server.get('/', (req, res, next) => {
        res.render('create-team');
    });

    // Setup the static tab
    server.get('/table', (req, res, next) => {
        const teamName = req.body.teamName;
        res.render('table', { teamName });
    });

    // Serve create team tab
    server.get('/create-team', (req, res, next) => {
        res.render('create-team');
    });


    // Setup the configure tab, with first and second as content tabs
    server.get('/configure', (req, res, next) => {
        send(req, 'src/views/configure.html').pipe(res);
    });

    server.get('/first', (req, res, next) => {
        send(req, 'src/views/first.html').pipe(res);
    });

    server.get('/second', (req, res, next) => {
        send(req, 'src/views/second.html').pipe(res);
    });
}
