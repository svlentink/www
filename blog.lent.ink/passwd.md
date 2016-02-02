# Passwords, can you remember them all?

As a logician, I like to order certain things in my life,
based on logic, instead of emotion.
Examples are file and directory structure,
clothes in closet and of course, passwords.


You probably all know the deal, of remembering various passwords,
which can be a nightmare.
And we all know that you should not use the same passwords
on multiple site, because some save them plain text,
and usually the sites that do, have poor security,
which means an easy breach.


But what makes this post worth reading?
I purpose an alternative to you, create your own algorithm!

## Personal Password algorithm

What do we need to get started?
First we see that various sites require at least 8 characters,
some require 2 special characters and others multiple numbers.
To get in a save margin, we can say, lets start with

+ At least 3 special characters (no spaces)
+ At least 2 regular letters (no accented or non-english alphabetic)
+ At least 2 regular uppercase letters
+ At least 3 numbers

Which brings us to at least 10 characters.
An example could be R_5t@11m@N.
This might work, but remembering that I used this freedom hero for website X,
and how I spelled his name can be difficult.
We need something better.

## Extracting data

Let's use something that the website or application provides us with.
Example: facebook.
Facebook provides us with various numbers, that we can use in our algorithm.

+ 8 letters
+ 4 vowels
+ 4 consonants
+ 2 syllables
+ 2 words (face, book)

or another example: myFavoriteWebForm.com

+ 17 letters
+ 6 vowels
+ 11 consonants
+ 6 syllables
+ 4 words

As we see, the first three are static,
everyone counts them the same.
However, syllables can be counted differently by a foreigner,
who does not master the languages he needs to make a password for.
The same applies with words; I cannot decipher a Russian URI.


But wait, there is more, to extract from the name!

Facebook:

+ amount letters is even
+ amount vowels is even
+ amount consonants is even

myFavoriteWebForm:

+ amount letters is uneven
+ amount vowels is even
+ amount consonants is uneven

## Converting data

Lets convert the data to a format, that programmers understand,
bear with me.

```javascript
facebook : {
  letters : 8,
  lettersIsEven : true,
  vowels : 4,
  vowelsIsEven: true,
  consonants : 4,
  consonantsIsEven: true
}
```

The syntax above; you should understand, the following; you should not.
It is the code that can do it for you.

```javascript
var testWebSite = 'facebook' // the website name we are going to use
function getCurrentWebsiteName () {
  var nameArr = window.location.hostname.split('.')
  // ditch all the sub domains
  return nameArr[nameArr.length - 2]
}
function isVowel (chr) {
  if (chr.length !== 1) throw new TypeError('We desire a char, not a string')
  return 'aeiou'.indexOf(chr) !== -1
}
function countVowels (str) {
  var count = 0;
  for (var i = 0; i < str.length; i++) count += isVowel(str[i])
  return count
}
function convertWebsiteName (name) {
  name = name || getCurrentWebsiteName()
  var l = name.length // letters
  var v = countVowels(name) // vowels
  var c = l-v // consonants
  return {
    letters : {
      count  : l,
      isEven : !(l%2),
      first : name[0],
      last : name[name.length-1]
    },
    vowels : {
      count  : v,
      isEven : !(v%2)
    },
    consonants : {
      count  : c,
      isEven : !(c%2)
    }
  }
}
convertWebsiteName(testWebSite)
```
Feel free to play with it.
You can paste the code in the console from chrome (google it).


## Being creative

We now have 3 numbers, 3 booleans, a first letter and a last letter,
and we want 2 uppercase letters, 2 normal, 3 digits and 3 special chars.

I'll skip the most difficult; special chars.
I'm not going to tell you
[which](http://ux.stackexchange.com/questions/72568/should-users-be-allowed-to-use-any-special-character-they-want-when-creating-a-p)
characters you can choose from, since that is a topic I do not want to write about.


First start with a secret token,
for example a passage from your favorite book; ["lorem ipsum dolor sit amet"](http://biblehub.com/john/17-3.htm).
An now use this token to create your own magic.
You could start counting from front, from back, using one of the three numbers,
But at this part, I stop supplying you with suggestions,
since people will likely copy my tips,
which makes it less secure.


Good luck on creating your own specific logic to calculate your passwords.
The will be more safe, and you will stop forgetting them!
And if you need to change a password, because it has been leaked,
you could just keep the logic the same, but have a second or a third secret sentence,
which you use for a second or third password on that same site/platform.
