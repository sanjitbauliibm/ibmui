#!/usr/bin/env node --harmony
var program = require('commander');
var ProgressBar = require('progress');
var fs = require('fs-extra');
var path = require('path');
var inquirer = require('inquirer');
var sh = require("shelljs");
var generate = true;
process.argv.forEach((val, index) => {
  //console.log(`${index}: ${val}`);
  if(val === "--version" || val === "-v"){
  	generate = false;
  	var pjson = require('./package.json');
  	console.log(pjson.version); 
  }
});

if(!generate)
	process.exit()

var questions = [
	{
    type: 'input',
    name: 'projectname',
    message: 'Your Project Name',
    default: function () {
      return 'myapp';
    }
  },
  {
     type: 'confirm',
    name: 'isV18',
    message: 'Do you want to use Northstar(V18)?',
    default: true
  },
  {
	 type: "list",
     name: "jslib",
     message: "Please select javaScript library/framework you want to use?",
     choices: [{
	        name: "Vanilla JS",
	        value: "default"
	    }, {
	        name: "Angular 1",
	        value: "angular1"
	    }, {
	        name: "Angular 2",
	        value: "angular2"
	    }, {
	        name: "JQuery",
	        value: "default"
	    }, {
	        name: "React JS",
	        value: "reactjs"
	    }, {
	        name: "Ionic",
	        value: "ionic"
	    }],  
        default: "default"
  },
  {
    type: 'list',
    name: 'v18template',
    message: 'Please choose the v18 templates from #http://127.0.0.1:8080/',
    choices: [
	    	{
		        name: "Default",
		        value: "temp0"
		    }, {
		        name: "#TMP01",
		        value: "temp1"
		    }, {
		        name: "#TMP02",
		        value: "temp2"
		    }, {
		        name: "#TMP03",
		        value: "temp3"
		    }, {
		        name: "#TMP04",
		        value: "temp4"
		    }, {
		        name: "#TMP05",
		        value: "temp5"
		    }, {
		        name: "#TMP06",
		        value: "temp6"
		    }
	    ],
		default: 'temp0',
    filter: function (val) {
      return val.toLowerCase();
    }
  }
];

inquirer.prompt(questions).then(function (answers) {

	//const templatePath = (answers.isV18)? 'v18/'+answers.jslib:answers.jslib;
	const templatePath = answers.jslib;
	const absTemplatePath = __dirname+'/frameworks/'+ templatePath;
	const destinationPath = sh.pwd()+'/'+answers.projectname;
	console.log("Creating Scafold..");
	fs.copySync(absTemplatePath, destinationPath);
	sh.cd(answers.projectname);

	try {
			
			console.log("Please wait..");
			console.log("Installing dependecies...");
			sh.exec('npm install');
			//sh.exec('gulp serve');
		} 
		catch (err) {
			console.error(err);
	}
 });