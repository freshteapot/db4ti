/*
 * Database

//Config should look like this.
var config = {
		"file" : "test_sql.sqlite",
		"name" : "testsqldb"
};
 */


var Database = function (config) {
	
	this.config = config;
	this.conn = null;
	
	this.open = function () {
    	this.conn = Ti.Database.install(this.config.file, this.config.name);
    };
    
    this.query = function () {
    	this.open();
    	var resultSet = Function.apply.call(this.conn.execute, this.conn, arguments);
    	this.close();
    	this.conn = null;
    };
    
    
    this.insert = function () {
    	
    	try {
    		//this.open();
    		this.conn = Ti.Database.install(this.config.file, this.config.name);
    		var resultSet = Function.apply.call(this.conn.execute, this.conn, arguments);
            var id = this.conn.lastInsertRowId;
            //this.close();
            this.conn.close();	
        	this.conn = null;
            return id;
    	} catch (e) {
    		Ti.API.info("DB:Insert Fail");
    		Ti.API.debug(e);
    		return false;
    	}
    };
    
    this.update = function () {
    	try {
    		this.open();
    		var resultSet = Function.apply.call(this.conn.execute, this.conn, arguments);
            var affected = this.conn.rowsAffected;
            this.close();
            return affected;
    	} catch (e) {
    		return false;
    	}
    };
    
    //getOne
    this.fetch = function () {
    	var result = null;
        var results = [];
        
        this.open();
        Ti.API.debug("Arguments");
        Ti.API.debug(arguments);
        var resultSet = Function.apply.call(this.conn.execute, this.conn, arguments);
//        Ti.API.debug(resultSet);
    	if (resultSet.rowCount == 1 ) {
    		
            while (resultSet.isValidRow()) {
                result = {};
                var fieldCount = resultSet.fieldCount();
                for (var i=0; i<fieldCount; i++) {
                    result[resultSet.fieldName(i)] = resultSet.field(i);
                }
                results.push(result);
                resultSet.next();
            }
            
            resultSet.close();
            resultSet = null;
            this.close();
    		return results[0];	
    	}
    	this.close();
    	return null;
    };
    
    //was getAll,getMany
    this.fetchAll = function (){
        var result = null;
        var results = [];
        
        this.open();
        var resultSet = Function.apply.call(this.conn.execute, this.conn, arguments);
        while (resultSet.isValidRow()) {
            result = {};
            var fieldCount = resultSet.fieldCount();
            for (var i=0; i<fieldCount; i++){
                result[resultSet.fieldName(i)] = resultSet.field(i);
            }
            results.push(result);
            resultSet.next();
        }
        resultSet.close();
        resultSet = null;
        this.close();
        return results;
    };
    
    
    this.close = function () {
    	this.conn.close();	
    	this.conn = null;
   };
   
   
   this.resultAsSingleColumn = function (results,field) {
	   var singleArray = [];
	   var size = results.length;
	   if (size < 1) {
		   return null;
	   }
	   
	   for (i=0;i<size;i++) {
	   	if (results[i][field]) {
	   		singleArray.push(results[i][field]);
	   	}
	   }
	   if (singleArray.length > 0 ) {
		   return singleArray;
	   }
	   return null;
   };
};
