# My fav. IDE

We all start with something like notepad++ until we start for something more useful.


Various editors exist, Xcode with block scope highlighting (which is CPU intensive)
to something like vim, which is ideal for quick editing of config files over SSH.


## My first real IDE
My first language was Java,
which was taught in BlueJ at my university
(if your uni still does this, burn the books! programming is never learned from books,
since half of the content is deprecated from the moment they are printed).


My first IDE were Netbeans and Eclipse, since I was programming Java.
I switched to the one who supported the best dark theme
(that was before I found system wide color inversion,
which is available on Windows, OSx and Linux).


## Visual Studio
My uni was really into proprietary software and Windows,
which made me use Visual Studio.


My experience with ASP.net and Visual Studio is horrible.
I used Ubuntu, and needed to run them in VM,
since there was no proper alternative to run VS.

## Javascript IDE
When doing js for a class at uni, the recommended Aptana Studio as a Eclipse plugin.
This worked, but was just and overkill, why use such a heavy IDE?


My main focus the last year has been Bash, LaTeX and js.
For which I searched for a good IDE and tried various.
Some people recommended Sublime,
but it just wasn't my thing.
I used LightTable for some time,
but it had too many flaws which made me search again.


### Atom
Currently I use Atom, which I really love!
Of course there are some things that I would like
[to see updated](https://github.com/atom/atom/issues/9411).
But with the following packages:
+ language-docker
+ language-latex
+ linter
+ linter-js-standard
+ red-wavy-underline
+ standard-formatter
+ tabs-to-spaces
it is an amazing IDE.


If you want spell-check to work, you need to do some modifications.
See the type of block/scope you want to be checked,
place the blinking cursor on it, and press
[CTRL + SHIFT + ALT + P](https://discuss.atom.io/t/how-to-enable-spell-checking-for-another-language/4895/11).
Now copy the scope and paste it in the grammar array in config.cson.
Which is accessible through:
Menu bar (visible by pressing ALT) > Edit > Open Your Config,
or by
```bash
$ f=$USER/.atom/config.cson && vim $f || xdg-open $f
```
and the most easy is to just paste it in:
Menu bar > Preferences > Packages > type 'spell-check', ENTER >
Settings (of that package) > Grammars.


My current entry in this box:
```
source.asciidoc,
source.gfm,
text.git-commit,
text.plain,
text.plain.null-,
text.tex.latex,
text.html.basic,
string.quoted.single.js,
comment.line.double-slash.js,
comment.block.js,
comment.block.documentation.js,
comment.line.number-sign.shell
```
