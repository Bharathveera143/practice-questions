import * as fs from "fs";
import * as path from 'path';

type Category = "images" | "music" | "documents" | "code" | "others";


const categories : Record<Category,string[]> = {

    images:[".jpg",".jpeg",".png",".gif"],
    music:[".mp3",".wav"],
    documents:[".pdf",".docx",".txt"],
    code:[".ts",".js",".json"],
    others:[]

} 

function getCategory(ext:string):Category{
    for(const[category,extensions] of Object.entries(categories)){
        if(extensions.includes(ext)){
            return category as Category;
        }
    }
    return "others";
}

function organizeFolder(folderPath:string):void{
    if(!fs.existsSync(folderPath)){
        console.log("⚠️ Folder does not exist!");
        return;
    }

    const files = fs.readdirSync(folderPath);

    for(const file of files){
        const filePath = path.join(folderPath,file);

        if(fs.statSync(filePath).isFile()){
            const ext = path.extname(file).toLowerCase();
            const category = getCategory(ext);
            const targetDir = path.join(folderPath,category);

            if(!fs.existsSync(targetDir)){
                fs.mkdirSync(targetDir)
            }
            const targetPath = path.join(targetDir,file);
            fs.renameSync(filePath,targetPath);
            console.log(`📂 Moved: ${file} → ${category}/`);
            
        }
    }
}

const folder = process.argv[2];

if(!folder){
    console.log("⚠️ Usage: node dist/index.js <folderPath>");
}
else{
    organizeFolder(folder);
}