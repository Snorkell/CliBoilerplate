import glob from 'glob';
import ejs from 'ejs';
import * as fs from 'fs';
import path from 'path';
import { constants } from '../../const';

let app = {
    name: "MonApp"
}

interface PathDetails{
    fileName: string,
    fullSourceFilePath: string
    sourcedir: string,
    destDir: string,
    renderedFileName: string
}

export default class JavaProcessor{
    constructor(){

    }

    public process():void{
        glob("**/*.ejs", (er, files) => {
            files.forEach((el: string, index:number) => {          
                console.log(this.extractPath(el, app.name));
                
                const pathObj = this.extractPath(el, app.name);
                fs.mkdirSync(pathObj.destDir, {recursive: true})
                const fileContent = fs.readFileSync(pathObj.fullSourceFilePath, 'utf-8');
                const render = ejs.render(fileContent, {app: {name:app.name}});                
                fs.writeFileSync(path.join(pathObj.destDir, pathObj.renderedFileName), render)
            })
        })
        glob('**/*.(jar|.properties)', (err, files) => {
            files.forEach(el => {
                const pathObj = this.extractPath(el, app.name);
                fs.mkdirSync(pathObj.destDir, {recursive: true})
                fs.copyFileSync(pathObj.fullSourceFilePath, path.join(pathObj.destDir.replace(/mvn/, '.mvn'), pathObj.fileName))
            })
        })
    }
    public extractPath(pathString: any, appName: string = 'boilerplate'):PathDetails{
        let fileName = path.basename(pathString);
        const fullSourceFilePath =  path.resolve(pathString);
        pathString = pathString.replace(/boilerplate/, appName);
        if(fileName === "gitignore.ejs") fileName = `.${fileName}`;
        return {
            fileName,
            fullSourceFilePath,
            sourcedir: path.resolve(path.dirname(pathString)),
            destDir: path.resolve(path.dirname(pathString.replace(/templates/, 'output'))),
            renderedFileName: fileName.replace(/\.ejs/, "").replace(/Boilerplate/, appName)
        }
    }
}