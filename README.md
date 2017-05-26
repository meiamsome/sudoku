### Sudoku Website

This is a website for playing sudoku. A live version is availaible at
[https://sudoku.meiamso.me/](https://sudoku.meiamso.me/)

To run, first install dependecies with npm:

    npm install .

You must also install a backend for Sequelize. For more info, see [here](http://docs.sequelizejs.com/manual/installation/getting-started.html)

By default, a sqlite3 database is used. This can be installed with

    npm install sqlite3

Then, the react code must be compiled with

    npm run build

and then the server can be launched with

    node server
