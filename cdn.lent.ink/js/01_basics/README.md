

## Logger

The default of this lib is set to display messages on INFO level.
To change this to DEBUG level
```JavaScript
SVL.config.logLevel = 3 // 2=default
```
which will result in displaying ERROR (0), WARN (1), INFO (2) and DEBUG (3).
The higher the number, the more messages.

You start the scope (e.g. using IIFE patern) with something like
```JavaScript
var log = new SVL.log.Logger('util01_math.js')
```
which will print the statement inside every log,
making it more easy to trace where the code can be found.

### Best practice
When we have simple params, use
```JavaScript
/**
 * foo desc.
 * @param {String} string01 some description
 * @param {Number} number01 (optional) some desc.
 */
function foo (string01, number01) {
  log.enter('foo', arguments)
  number01 = number01 || 0
  //foo magic
}
```
but for more some params, we do not want to print them in the log files
```JavaScript
/**
 * bar desc.
 * @param {String} string01 some description
 * @param {Number} number01 (optional) some desc.
 */
function bar (string01, number01, callback) {
  log.enter('foo', {str : string01,nr : number01})
  number01 = number01 || 0
  //bar magic
}
```
and we specify all the arguments that can be useful in the log during debugging.

log.info('An important thing happened, that even sys admins want to know', {some: 'param', leet: 1337})
