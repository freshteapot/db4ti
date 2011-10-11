#db4ti
Database wrapper for sqlite to be used with Titanium

You are more than welcome to use the class outside of Titanium.

##Example
```
Ti.include("database.js");
var config = {
		"file" : "example.sqlite",
		"name" : "exampledb_1"
}; 

var db = new Database(config);

var sql = "SELECT * from test_table;";
var items = db.fetchAll(sql);


var sql = "SELECT * from test_table WHERE id=?;";
var id = 42;
var item = db.fetch(sql,id);
```
