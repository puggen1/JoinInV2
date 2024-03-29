# Javascript 2 CA - JoinIn

![The frontpage og joinIn](./assets/frontpage.PNG)

JoinIn - An social media platform, where you can post your thoughts and images, and see what others are up to.

Backend opperated by an API.

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/1b74f3d1-91e4-4af5-b0b1-a8e33614781f/deploy-status)](https://app.netlify.com/sites/joininv2-feed/deploys)

## Table of Contents

- [Live version](#live-version)
- [Description](#description)
  - [Requirements for the assignment:](#here-are-the-requirements-for-the-assignment)
  - [The website contains the following pages:](#the-website-contains-the-following-pages)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installing](#installing)
  - [Running](#running)
- [Contributing](#contributing)
- [Contact](#contact)
- [improvements](#improvements)

## Live version

[Netlify](https://joininv2-stablebuild.netlify.app/)

---

## Description

This was a school project, aimed at showing what I have learned from this course. This assignment was an follow up from the one before, Here I would connect the Frontend i had designed to an API, And add other features to the site, including sort, filter and search functions.

The main focus was to implement the javascript and api, but it was natural to improve and change some design elements aswell.

---

### Requirements for the assignment:

- User with @noroff.no or @stud.noroff.no email can register profile
- Registered user can login
- User can view a post content feed
- User can filter the post content feed
- User can search the post content feed
- User can view a post content item by ID
- User can create a post content item
- User can update a post content item
- User can delete a post content item

I have used localstorage to Save user data and keep track of the JWT token, making user experience better.
The website is set up to have authentication required to access the website. this means that you wont have access to anything on the api before regestering and logging in.
**Note** you can be on the other pages, but you wont be able to see any content, only placeholders.

I have tried creating functions that are reusable, for example the globalApiCall can get and send data, making it easier to access the api.
also the responses.mjs is multiple funcitions to create Bootstrap alerts, and inserting them into the DOM.

The design is responsive for all devices, and ive tried to make it similar on all pages.
The colors used are almost equal to the standard bootstrap colors, something that was an coincidence.

---

### The website contains the following pages:

- Login/Register page
  <br>
  The index of the project, here you can login or register a new user.

- Feed page
  <br>
  the feed contains all posts, and you can filter and search the posts. There is also a form to create a new post.

- Profile page
  <br>
  On the profile page you can see your own posts, and update your avatar.

- Post page
  <br>
  Here you can see a single post, and if it is your own post, you can update or delete it.

- Settings page
  <br>
  placeholder page

- terms page
  <br>
  placeholder page

---

## Built With

I built the project using vanilla javascript, html and css. I also used the following libraries:

- [Bootstrap](https://getbootstrap.com)
- [sass](https://sass-lang.com/)

---

## Getting Started

### Installing

How to reproduce the project:

1. Clone the repo:

```bash
git clone git@github.com:puggen1/JoinInV2.git
```

2. Install the dependencies:

```
npm install
```

### Running

To run the app, run the following commands:

start both sass and live server:

```bash
npm run dev
```

or start both sass and live server in different terminals:

```bash
npm run sass
```

```bash
npm run live
```

**Note** i would recommend using the vscode extension live server, as it will more easily work with sass.

---

## Contributing

If you want to contribute to the project, either by fixing bugs or adding features, feel free to do so.
If you have found an bug, please create an issue, and i will try to fix it as soon as possible.
You can open a pull request if you want to add features or fix bugs yourself.

---

## Contact

You can contact me on the following places:

[LinkedIn](https://www.linkedin.com/in/bendik-kvam/)

---

## improvements

I have made the following improvements to the project:

- Added avatar button that opens the avatar modal, there you can add an avatar to your profile / update your avatar.

- Added avatar or placeholder avatar to header and profile

- hidden change avatar when not own profile

- fixed search - it bugged when things was null