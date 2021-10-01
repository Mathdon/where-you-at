// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import path from 'path';
import express from 'express';
import { adapter, EchoBot } from './bot';
import tabs from './tabs';
import MessageExtension from './message-extension';

// See https://aka.ms/bot-services to learn more about the different parts of a bot.
import { ActivityTypes } from 'botbuilder';

// Read botFilePath and botFileSecret from .env file.
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

const app = express();
const PORT = process.env.port || process.env.PORT || 3333;

app.use(express.static(path.join(__dirname, "/static")));

// Adding tabs to our app. This will setup routes to various views
tabs(app);

// Adding a bot to our app
const bot = new EchoBot();

// Adding a messaging extension to our app
const messageExtension = new MessageExtension();

// Listen for incoming requests.
app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === ActivityTypes.Invoke)
            await messageExtension.run(context);
        else await bot.run(context);
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
