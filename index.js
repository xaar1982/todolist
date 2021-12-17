const {pool} = require("./utils/db");
const {TodoRecord} = require("./records/todo.record");
const { app } = require("./utils/express");

app.listen(3000, 'localhost');


/*(async() => {

    const ludzik = await TodoRecord.find('dc63dd2f-8247-41e3-83ef-11d5771b6c65');
    ludzik.title = 'Działa metoda update'
    await ludzik.update();
    await pool.end();
})(); */