import { CoubTimelineModel} from '../models/coub-timelines.model';
import { Rss2ItemFeedPost } from '../models/atom-feed-post.model';
import { CoubFeedConfigModel } from '../models/coub-feed-config.model';
import xml from 'xml';

const feedObject = {
    rss: [
      {
        _attr: {
          version: "2.0",
          "xmlns:atom": "http://www.w3.org/2005/Atom",
        },
      },
      {
        channel: [
          {
            "atom:link": {
              _attr: {
                rel: "self",
                type: "application/rss+xml",
              },
            },
          },
          {
            title: "Coubs timeline",
          },
          {
            link: "https://coub.com/",
          },
          { description: "Someone's Coub.com timeline" },
          { language: "ru-RU" },
        ],
      },
    ],
  };

export async function getCoubsByUrl(url: string, headers: any): Promise<CoubTimelineModel> {
    const fetchParams: RequestInit = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    }

    console.log(`Fetching Coub API with url: ${url} and params: ${fetchParams}`);

    return fetch(url, fetchParams)
        .then(response => response.json())
        .then((data: CoubTimelineModel) => {
            console.log(`Got data from Coub API:`);
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error('Error:', error)
            return Promise.reject(error);
        });

}

export async function constructCoubRss(data: CoubTimelineModel, config: CoubFeedConfigModel): Promise<string> {
    if (!data.coubs) {
        console.error('Error getting coubs from Coub API. Check your remembertoken.');
        return Promise.reject('Error getting coubs from Coub API. Check your remembertoken.');
    }

    const items: Rss2ItemFeedPost[] = data.coubs.map((coub) => {
        let date: string | undefined;
        try {
            date = new Date(coub.published_at).toString();
        } catch (error) {
            console.error(`Error parsing date from Coub API: ${error}`);
            date = new Date().toString();
        }
        const imageLink = coub.picture || coub.timeline_picture || coub.small_picture || coub.sharing_picture || "";
        const tagsString = coub.tags?.length > 0 ? coub.tags.map((tag) => tag.title || "[No tag]").join(", ") : "No tags nor description provided";
        const dimentions: [number, number] = [
            coub.dimensions?.med[0] || coub.site_w_h[0] || coub.size[0] || coub.page_w_h[0] || coub.site_w_h_small[0] || coub.dimensions?.big[0] || 1280,
            coub.dimensions?.med[1] || coub.site_w_h[1] || coub.size[1] || coub.page_w_h[1] || coub.site_w_h_small[1] || coub.dimensions?.big[1] || 720
        ];
        const authorHtmlString = (coub.channel?.title && coub.channel.permalink) ? `<p>Author: ${coub.channel?.title || "[Unknown author]"}, link: <a href=\"https://coub.com/${coub.channel?.permalink}\">https://coub.com/${coub.channel?.permalink}</a></p>`: undefined;
        const categories = coub.categories?.map(category => {
            return {
                category: category.title
            }
        }) || {};

        return {
            item: [
                {title: coub.title},
                {date: date},
                {link: `https://coub.com/view/${coub.permalink}`},
                {comments: `https://coub.com/view/${coub.permalink}/#disqus-comments-root`},
                {author: coub.channel?.title || "[Unknown author]"},
                {guid: coub.permalink},
                {slug: `view/${coub.permalink}`},
                // map tags there to description
                {description: 
                    {
                        _cdata: `\<iframe src=\"//coub.com/embed/${coub.permalink}?muted=false\&autostart=false\&originalSize=true\&startWithHD=true\" allowfullscreen frameborder=\"0\" width=\"${dimentions[0]}\" height=\"${dimentions[1]}\" allow=\"autoplay\"\>\</iframe\>\<script async src=\"//c-cdn.coub.com/embed-runner.js\"\>\</script\>
<div>
<h3>${coub.title}</h3>
<p>Tags: ${tagsString}</p>
<p>Categories: ${coub.categories?.length > 0 ? coub.categories.map((tag) => tag.title || "[No category]").join(", ") : "No categories provided"}</p>
<p>Original link: <a href=\"https://coub.com/view/${coub.permalink}\">https://coub.com/view/${coub.permalink}</a></p>
${authorHtmlString}
<img src=\"${imageLink}\" alt=\"An image of coub with title: ${coub.title}\" />
</div>`
                    }
                },
                {"p:tags": coub.tags?.length > 0 ? coub.tags.map((tag) => tag.title).join(): ""},
                {"p:imageLink": imageLink},
                // {category: coub.categories?.length > 0 ? coub.categories.map((tag) => tag.title || "[No category]").join(", ") : "No categories provided"},
                ...categories
            ]
        }
    });
    
    // find object with `title` prop and set it to `Coubs: ${config.sectionName || "Unknown section"}`
    const channelItem = feedObject.rss!.find((item) => item.channel);
    const titleItem = channelItem ? channelItem.channel!.find((item) => item.title) : undefined;
    const descriptionItem = channelItem ? channelItem.channel!.find((item) => item.description) : undefined;
    if (titleItem) {
      titleItem.title = `Coubs: ${config.sectionName || "Unknown section"}`;
    }
    if (descriptionItem) {
      descriptionItem.description = `Coubs from Coub.com timeline. Section: ${config.sectionName || "Unknown section"}`;
    }

    console.log(`Now pushing items`, items);

    channelItem?.channel!.push(...(items as Array<any>));

    const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);

    return Promise.resolve(feed);
}

export function validateRemembertoken(remembertoken: string): boolean {
    if (
        !remembertoken ||
        typeof remembertoken !== "string" ||
        remembertoken?.length < 1 ||
        remembertoken?.length > 100 ||
        remembertoken === "undefined" ||
        remembertoken === "null"
    ) {
        console.error(
            "Supplied remembertoken is invalid. Check your remembertoken."
        );
        return false;
    }
    return true;
}