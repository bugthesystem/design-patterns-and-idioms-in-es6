# design-patterns-in-atscript
Design pattern implementations in AtScript

**Boilerplate forked from  [angular/atscript-playground](https://github.com/angular/atscript-playground)**

### Initial setup

```bash
# Clone the repo...
git clone https://github.com/ziyasal/design-patterns-in-atscript.git
cd design-patterns-in-atscript

# Then, you need to install all the dependencies...
npm install

# If you want to be able to use global commands `karma` and `gulp`...
npm install -g karma-cli gulp
```

```bash
# Do initial build, start a webserver and re-build on every file change...
gulp build serve watch
```
Open a browser and look in the console log to see the result.

### What are all the pieces involved?

#### [Traceur]
Transpiles AtScript code into regular ES5 (today's JavaScript) so that it can be run in a current browser.

#### [RequireJS]
Traceur is configured to transpile AtScript modules into AMD syntax and we use RequireJS to load the code in the browser.

#### [Assert] library
When `typeAssertions: true` option is used, Traceur generates run-time type assertions such as `assert.type(x, Object)`. The assert library does the actual run-time check. Of course, you can use your own assert library.

The idea with type assertions is that you only use them during the development/testing and when deploying, you use `typeAssertions: false`.

#### [Karma]
Test runner that runs the tests in specified browsers, every time that you change a file.

#### [Gulp]
Task runner to make defining and running the tasks simpler.


[AtScript]: http://atscript.org
[Traceur]: https://github.com/google/traceur-compiler
[RequireJS]: http://requirejs.org
[Assert]: https://github.com/angular/assert
[Karma]: http://karma-runner.github.io/
[Gulp]: http://gulpjs.com
