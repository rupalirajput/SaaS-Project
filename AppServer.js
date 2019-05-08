"use strict";
exports.__esModule = true;
var App_1 = require("./App");
var server = new App_1.App().expressApp;
server.listen(1234, function () {
    console.log('Express server listening on port 1234');
});
