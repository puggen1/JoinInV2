# JoinInV2

This is the course assignment for JS2. the Task is to implement javascript to excisting html and css

## content

1.[Netlify Link](#netlify) 2.[critical Error](#error) 3.[design](#design) 4.[javascript](#javascript) 5.[Work plan](#work-plan) 6.[sources](#sources)

## netlify

https://joininv2-stablebuild.netlify.app/

## error

beacause of a reason i dont know about, the api changes the way it returns error messages, this really messed up my global api call, since it is responnsible of returning errors to many things.
first i found out about it, i changed the code. but then the api changed again.
that is why on 19.10.22 i added an fix to this. A ternary operator to check both way the api gives response.

## design

the design uses bootstrap and some custom css.
ive tried to make the design as similar on the diffrent pages. with some limitations

## javascript

i have for the most tried to make dynamically js functions.

### Post class

most content related to posts, uses the class Post. this have multiple methods to display and create diffrent elements the posts need.

### globalApiCall

to get and send data to the api. I use the globalApiCall function. It works for most api methods.

### validation

i have used rexeg for validation. so i can limit the errors from the api, and only get errors like user already excist.

```js
usernameRegex = /^[a-zA-Z0-9_æøåÆØÅ]{3,15}$/;
emailRegex = /^[a-z0-9.æøå]{0,}[a-z0-9]{1,}@(stud.)?noroff.no$/i;
passwordRegex = /^[a-zA-Z0-9æøåÆØÅ]{8,30}$/;
```

### responses

for both possitive and negative responses i have created several functions to display bootstrap alerts. these functions does muliple things:

- change color
- placement
- dismissable

### post and id

to update and delete posts, i use data-id to give the methods correct id, so i dont use html id multiple times.
i also use bootstrap modals for update, so i had to look into bootstrap modal methods.

### Reuse code

i have tried to reuse code as much as possible. i had a rough plan in my head in the start of how i would do this. in Post class, i used the same code for both feed and profile, but due to wanting it a little bit diffrent on single post, i had to write some of it again.
other places where i planned to use it again, there where often some small complications, like location. i solved this by adding more parameters to the functions/methods, and changed small part of code inside based on for example booleans.
example: Post customButtons. here it will do small changes based on if it is on singlepage, feed or profile.

### improvments

late in the proccess i improved the Post class a bit, most importantly, i decleared all diffrent values i needed, instad of one(postData) that made me use postData.title, postData.author.name etc.
i also changed all named from this.postCreate to this.create. so it looked a little better.

## work plan

this is my work plan
https://github.com/users/puggen1/projects/1

there is all the diffrent tasks i have split the project into, and also some extra features i thought could be added if i had time later.
due to my not entirely perfect planning i added some tasks later, when i found out i needed these things..

## sources

### profile images

to make all profile images dynamic and round i found an solution on:
https://stackoverflow.com/questions/70662496/how-will-i-make-perfect-circle-image-using-card-in-bootstrap-5

and added some extra things that makes it the correct size and work on diffrent places
