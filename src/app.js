import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import exphbs  from 'express-handlebars';
import { adapter, EchoBot } from './bot';
import tabs from './api/tabs';
import config from './config/api-config';
import MessageExtension from './message-extension';
import { ActivityTypes } from 'botbuilder';

config();

const PORT = process.env.port || process.env.PORT || 3333;
const bot = new EchoBot();
const messageExtension = new MessageExtension();
const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: "",
    layoutsDir: "",
    partialsDir: __dirname + '/views/partials/',
    helpers: require('./config/handlebars-helpers')
}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "/static")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tabs', tabs)

app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === ActivityTypes.Invoke)
            await messageExtension.run(context);
        else await bot.run(context);
    });
});

app.listen(PORT, () => {
    console.info(`Server listening on http://localhost:${PORT}`);
});
