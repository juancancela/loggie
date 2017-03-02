#! /usr/bin/env node
"use strict";

const scrap = require('./lib/scrap');
const ncp = require('copy-paste');

let url = process.argv[2];
if(!url){
    console.log('Required first parameter: REQUEST_ID (in example: node index.js <REQUEST_ID>)');
    process.exit();   
}

scrap(url, (err, body) => {
    console.log(body);
    ncp.copy(body, ()=>{});
});