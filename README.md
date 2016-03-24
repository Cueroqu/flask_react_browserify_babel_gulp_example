# flask_react_browserify_babel_gulp_example

This is an example to set up React with browserify, babel and gulp. Flask is used as the server.

## Step 1. Set up virtual environment.

This step is optional.

1. run '$ virtualenv venv' to initiate
2. run '$ source venv/bin/activate' to start

## Step 2. Set up Flask as server

1. run '$ pip install flask'
2. (optional) run '$ pip freeze > requirements.txt' to get the requirements file.
3. create file app.py and add codes

```
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def get():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

```

## Step 3. Create index.html

1. run '$ mkdir templates' and cd into it.
2. create file index.html and add codes

```
<!doctype html>
<html>
    <body>
        <div id="hello"></div>
        <div id="world"></div>
        <script type="text/javascript" src="../static/js/script.js"></script>
    </body>
</html>

```

The script.js will be created later.

## Step 4. Set up react and babel

1. go back to the root of the project and run '$ npm init', I always set the entry point to 'gulpfile.js', but I'm not sure whether it's necessary.
2. run '$ npm install react react-dom --save'
3. run '$ npm install --save babelify babel-preset-react'
4. run '$ npm install --save-dev babel-preset-es2015'
4. If gulp hasn't been installed globally in your environment, please run '$ npm install -g gulp' first.
5. install browserify if not installed
6. run '$ npm install --save-dev gulp'
7. run '$ npm install --save-dev vinyl-source-stream'
8. create file gulpfile.js and add code.

```
// include gulp
var gulp = require('gulp')
// include plugins
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var babel = require('babelify')

var paths = {
  jsxs: ['static/js/**/*.jsx']
}

gulp.task('browserify', function() {
  browserify('static/js/main.js')
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest('./static/js/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsxs, ['browserify']);
});

gulp.task('default', ['browserify']);
```

Some explanation: in the gulp, it looks for [root]/static/js/main.js and transform it to script.js by browserify, thus we need to create a main.js at [root]/static/js/(thus you need $ mkdir -p static/js) and add code

```
var hello = require('./hello.jsx');
var world = require('./world.jsx');
```

* This script.js is the file mentioned in index.html.
* The dir static is put to root because flask looks for static files in a dir named 'static' in the root defaultly.

## Step 5. Create es6 files

At the same directory with the main.js

```
// hello.jsx
import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
    render() {
        return (<h1>Hello</h1>);
    }
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));

```

```
import React from 'react';
import ReactDOM from 'react-dom';

class World extends React.Component {
    render() {
        return <h1>World</h1>
    }
}

ReactDOM.render(<World/>, document.getElementById('world'));
```

## Step 6. Run

1. $ gulp browserify
2. $ python app.py
3. open browser and 127.0.0.1:5000