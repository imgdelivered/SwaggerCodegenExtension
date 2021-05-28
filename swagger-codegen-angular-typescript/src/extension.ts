import { APISpecification, Guid } from './apispec';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SyncRequestClient } from 'ts-sync-request';
import { TextEncoder } from 'util';
import * as fs from 'fs';
import * as os from 'os';
import * as Path from 'path';

let workspace: string;
let fileSystemPath: string;
let myuuid :string;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const resolvePath = (filepath: string): string =>
    {
        if (filepath[0] === '~')
        {
            const hoveVar = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
			var basePath : any = process.env[hoveVar];
            return Path.join(basePath, filepath.slice(1));
        }
        else
        {
            return Path.resolve(filepath);
        }
    };
	myuuid = Guid.newGuid();
	const tempdir = resolvePath(os.tmpdir());

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "swagger-codegen-angular-typescript" is now active!');
	
	if(vscode.workspace.workspaceFolders !== undefined) {
		workspace = vscode.workspace.workspaceFolders[0].uri.path ;
		fileSystemPath = vscode.workspace.workspaceFolders[0].uri.fsPath ; 
	}
	console.log("WS: "+ workspace);
	console.log("FS: " + fileSystemPath);
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposablegenClient = vscode.commands.registerCommand('swagger-codegen-angular-typescript.genclient', () => {
		// The code you place here will be executed every time your command is executed
		var input = vscode.window.showInputBox({prompt: "Enter URI", placeHolder: "http://example.com/swagger/v1/swagger.json"}).then(value => {
			if (value === undefined) {
				throw new Error('cancelled');
			}
			// download the json
			/*
			var https = require('https');
			var result = https.get(value)
				.map((response: any) => response.json())
				.map((json: any) => new APISpecification(json.apispec));
			var output: APISpecification;
			
			output = result.subscribe();
			console.log(result);
			*/
			var output = new SyncRequestClient().get<any>(value);
			const content = JSON.stringify(output);
			var enc = new TextEncoder();
			
			
			
			fs.writeFileSync( tempdir + '\\temp' + myuuid + '.json', enc.encode(content) );
			//fs.writeFileSync(vscode.workspace.asRelativePath('test.json'), content);
			// handle valid values
			vscode.window.showInformationMessage('Swagger Codegen Angular Typescript Rendering ' + value);
			vscode.window.showInformationMessage('Swagger Codegen Angular Typescript  ' + content);
			processFile(tempdir + '\\temp' + myuuid + '.json', vscode.workspace.asRelativePath(workspace + '/test'));
		});
		// Display a message box to the user
	});

	let disposablegenSpec = vscode.commands.registerCommand('swagger-codegen-angular-typescript.genspec', () => {
		// The code you place here will be executed every time your command is executed

		var input = vscode.window.showOpenDialog({ title: "Select spec file", canSelectMany: false, canSelectFolders: false,  filters: {"Json":["json"]} }).then(value => {
			var actualFile;
			if (value && value[0]) {
				actualFile = value[0].fsPath;
			}else {
				throw new Error('cancelled');
			}
			
			var fs = require('fs');

			var json = fs.readFileSync(actualFile);
			var entries = new APISpecification(JSON.parse(json).apispec);
			console.log('Read File');
			var enc = new TextEncoder();
			entries.apispec.forEach(function(entry) {
				// download file
				try {
					var output = new SyncRequestClient().get<any>(entry.uri);
					if(output !== null) {
						var fs = require('fs');
						const content = JSON.stringify(output);
						fs.writeFileSync( tempdir + '\\temp' + myuuid + '.json', enc.encode(content));
						processFile(tempdir + '\\temp' + myuuid + '.json', vscode.workspace.asRelativePath(workspace + '/' + entry.path));
						
					}
						
				} catch (error) {
						
				}
			
			});

			

			vscode.window.showInformationMessage('Swagger Codegen Angular Typescript Rendering ' + actualFile);	
		});
		// Display a message box to the user
		
	});


	context.subscriptions.push(disposablegenClient, disposablegenSpec);
}

// this method is called when your extension is deactivated
export function deactivate() {}


function processFile(fileName: string, path: string) {
console.log('processing file ' + fileName + ' to path ' + path);
} 

function uuidv4() {
	throw new Error('Function not implemented.');
}

