import * as fs from 'fs';
import * as path from 'path';


type Category = "food" | "travel" | "shopping" | "other";

type Expense = {
    amount:number;
    category:Category;
    date:string;
}

const logfile = path.join(__dirname,"../expenses.json")


function addExpense(amount:number,category:Category):void{
    const newExpense : Expense = {
        amount,
        category,
        date:new Date().toISOString(),
    }

    let expenses : Expense [] = [] ;

    if(fs.existsSync(logfile)){
        const data = fs.readFileSync(logfile,'utf-8');

        if(data){
            expenses = JSON.parse(data);
        }
    }

    expenses.push(newExpense);

    fs.writeFileSync(logfile,JSON.stringify(expenses,null,2));
    console.log("✅ Expense saved!");
    
}


function generateReport():void{
    if(!fs.existsSync(logfile)){
        console.log("⚠️ No expenses recorded yet!");
        return;
    }

    const data = fs.readFileSync(logfile,"utf-8").trim();
    if(!data){
        console.log("⚠️ No expenses recorded yet!");
        return;
    }

    const expenses:Expense[] = JSON.parse(data);

    const totals = expenses.reduce((acc,exp)=>{
        acc[exp.category] = (acc[exp.category]||0)+exp.amount;
        return acc;
    },{}as Record<Category,number>);

    console.log("📊 Expense Report:");
    for(const[category,total]of Object.entries(totals)){
        console.log(` - ${category}: ₹${total}`);
        
    }
}


const [command,...rest] = process.argv.slice(2);

if(command === "add"){
    const amount = Number(rest[0]);
    const category = rest[1] as Category;

    if(!amount || !category){
        console.log("⚠️ Usage: node dist/index.js add <amount> <category>");
        console.log("   Categories: food | travel | shopping | other");
        
    }else{
        addExpense(amount,category);
    }
}else if (command === "report"){
    generateReport();
}else{
    console.log('Usage:');
    console.log('  node dist/index.js add <amount> <category>');
    console.log('  node dist/index.js report')
}