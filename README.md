# Coub2RSS for nhost.io

This is a repository for creating RSS feeds based on your Coub account. It produces RSS 2.0 XML-comaptible feeds that are fetched from coubs your liked, from your own recommendation feeds (daily/weekly/monthly), or from coub authors you follow.

## Setup

### Get `remember_token` from Coub.com

1. Open [coub.com](https://coub.com/), sign in to your account;
2. Open DevTools, go to **Storage**->**Cookies** (any Gecko-based browser) / **Application**->**Cookies** (any Chromium-based browser);
3. Find `remember_token` string, copy its value.

### Fork/clone this repository

- `git clone git@github.com:Kenya-West/coub2rss-nhost.git`; \
or
- Press "Fork" button

### Deploy to nhost.io

1. Go to [nhost.io](https://nhost.io), sign in/sign up to your account;
2. Create a project;
3. Link cloned/forked repository in **Deployments** section;
4. Now it works!

## How to use

Available endpoints are:

- RSS of coubs you liked: `https://<YOUR SUBDOMAIN>.functions.<NHOST PROJECT REGION>.nhost.run/v1/get-coub-rss-likes?remembertoken=<REMEMBER TOKEN>`
- RSS of your daily feed: `https://<YOUR SUBDOMAIN>.functions.<NHOST PROJECT REGION>.nhost.run/v1/get-coub-rss-subscriptions-daily?remembertoken=<REMEMBER TOKEN>`
- RSS of your weekly feed: `https://<YOUR SUBDOMAIN>.functions.<NHOST PROJECT REGION>.nhost.run/v1/get-coub-rss-subscriptions-weekly?remembertoken=<REMEMBER TOKEN>`
- RSS of your monthly feed: `https://<YOUR SUBDOMAIN>.functions.<NHOST PROJECT REGION>.nhost.run/v1/get-coub-rss-subscriptions-monthly?remembertoken=<REMEMBER TOKEN>`
- RSS of your subscriptions: `https://<YOUR SUBDOMAIN>.functions.<NHOST PROJECT REGION>.nhost.run/v1/get-coub-rss-subscriptions?remembertoken=<REMEMBER TOKEN>`

You can go to these endpoints by your browser and get XML output.

You can now add these source as RSS feed in your favourite feeds reader app/service.

