
let ejs = require('ejs');
import * as fs from 'fs';
import path from 'path';
import { constants } from './const';
import JavaProcessor from './processors/java/JavaProcessor';

const javaProcessor= new JavaProcessor();
javaProcessor.process();
// let app = {
//     name: "MonApp"
// }

// let fileString = fs.readFileSync(path.join(constants.java.templateDir, "BoilerplateApplication.java.ejs"), 'utf8')

// let a = ejs.render(fileString, {app: {name:app.name}})

// function ensureDirectoryExistence(filePath: string) {
//     var dirname = path.dirname(filePath);
//     if (fs.existsSync(dirname)) {
//       return true;
//     }
//     ensureDirectoryExistence(dirname);
//     fs.mkdirSync(dirname);
//   }
// ensureDirectoryExistence(path.join(constants.java.outputDir, app.name, `${app.name}Application.java`))
// fs.writeFileSync(path.join(constants.java.outputDir, app.name, `${app.name}Application.java`), a)