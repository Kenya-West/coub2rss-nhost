import { Request, Response } from 'express';
import { constructCoubRss, getCoubsByUrl, validateRemembertoken } from '../services/coub-rss.facade';
import { CoubFeedConfigModel } from '../models/coub-feed-config.model';

const coubFeedConfig: CoubFeedConfigModel = {
    sectionName: 'subscriptions feed (newest)',
}

export default (req: Request, res: Response) => {
    const remembertoken = req.query.remembertoken as string;

    if (!validateRemembertoken(remembertoken)) {
        res.status(400).send('Invalid remembertoken');
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Cookie': `remember_token=${req.query.remembertoken}`
    }

    console.log(`Got remembertoken: ${remembertoken}`);

    const url = `https://coub.com/api/v2/timeline?page=1`;

    getCoubsByUrl( url, headers ).then(async (data) => {
        const feed = await constructCoubRss(data, coubFeedConfig);

        res.status(200);
        res.type('application/rss+xml');
        res.send(feed);
    })
    .catch((error) => {
        console.error('Error:', error)
        res.status(400).send(error);
    });
}