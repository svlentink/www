---
title: "Auto clicker"
date: "2017-05-04"
draft: false
tags: ["old"]
---

~~This tool has helped a colleague find his partner on a dating site.~~


This post is a little shady.

To get students excited for creating software,
i.e. a creative art,
we can give them creative assignments.

## Aim

This post show you how to automate the pressing of a button on a website.
Why? Tinder just announced they're going live with a web version.
By showing students a case where they can 'cheat',
may get them excited for more coding.

## How to: getting the outer element

For this tutorial, we'll use hotornot.com,
which is a Tinder alternative that has a similar like feature
(others options are: Tagged, Badoo, etc.).

+ Make sure you are using Chrome as Browser
+ Right mouse click on the button you want to start clicking
+ Select 'inspect' on the menu you got of the last action

The browser now shows you the developer options and highlights the button.

The code will be something like this:
```html
<div class="btn-game btn-game--hot js-profile-header-vote-yes tooltip-wrap">
  <i class="icon icon--lg">
    <svg class="icon-svg">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-heart"></use>
    </svg>
  </i>
  <div class="tooltip tooltip--delayed-show bc">
    <span class="tooltip-txt">
      Or press
      <span class="btn-game__shortcut">
        1
      </span>
      on keyboard
    </span>
  </div>
  <span class="b-link js-profile-header-vote" data-choice="yes"></span> 
</div>
```

All we have to do now is know which element listens to the click event.

We start with selecting the most outer element
(the most outer element of the button,
not the container that also contains other things)
```javascript
document.getElementsByClassName('btn-game btn-game--hot js-profile-header-vote-yes tooltip-wrap')
```
This returns an array with one element.
Which we select by appending `[0]`
```javascript
document.getElementsByClassName('btn-game btn-game--hot js-profile-header-vote-yes tooltip-wrap')[0]
```

If you have multiple elements in the array,
you should go through all of them, to find the right one
(0 was the first, 1 is the second).
If they have specified an `id` instead of, or next to a `class`,
you'll want to use `document.getElementById`,
which will return just the element (i.e. no need for `[0]`).

## How to: Looping through

We can go through all the HTML elements to see which listens for the click action.
But writing software is all about automation.
We instead see that everything is nested.

First we take our long statement and put it into a variable:
```javascript
var elem = document.getElementsByClassName('btn-game btn-game--hot js-profile-header-vote-yes tooltip-wrap')[0]
```
We can now use it by calling `elem`.

Instead of explaining the remaining part,
we'll just provide you with the code,
containing comments, which should explain everything:

```javascript
// function that uses recursion 
function clickOnEverything(inp) {
  // look if it contains a list of nested objects, and if its bigger than zero
  if (inp.children && inp.children.length)
    for(var i=0;i<inp.children.length;i++) // go through all nested HTML elements
      clickOnEverything(inp.children[i]) // perform this same action on all of them
  
  if(inp.click && typeof inp.click === 'function')
    inp.click()
  else
    console.log('Nothing to click:' + inp)
}
```

This code now should work, great!

You can call it with `clickOnEverything(elem)`

## How to: repetition

Instead of explain this last step,
we'll use comments again:

```javascript
// putting everything together now

function clickOnEverything(inp) {
  if (inp.children && inp.children.length)
    for(var i=0;i<inp.children.length;i++)
      clickOnEverything(inp.children[i])
  
  if(inp.click && typeof inp.click === 'function')
    inp.click()
}

function likeSomeone() {
  var elem = document.getElementsByClassName('btn-game btn-game--hot js-profile-header-vote-yes tooltip-wrap')[0]
  clickOnEverything(elem)
}

// time interval in mili sec.
timeInt = 800 // 0.8 sec

window.setInterval(likeSomeone,timeInt)

```

## Afterthought

Remember guys,
['with great power comes great responsibility'](https://youtu.be/IKmQW7JTb6s?t=5s).
