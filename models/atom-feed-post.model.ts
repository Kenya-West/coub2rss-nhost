type SinglePropObject<T> = {
    [P in keyof T]: { [K in P]: T[P] }
}[keyof T][];

export interface Rss2FeedPost {
    title: string;
    date: string;
    guid: string;
    slug: string;
    link: string;
    author: string;
    description: any;
    "p:tags": string;
    "p:imageLink": string;
    category: string;
    comments: string;
}

export interface Rss2ItemFeedPost {
    item: SinglePropObject<Rss2FeedPost>;
}