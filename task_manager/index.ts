import { log } from "console";
import { create } from "domain";
import * as fs from "fs";
import * as path from "path";
import { title } from "process";

import * as readline from "readline";
import { json } from "stream/consumers";


// step 1 : read JSON file path


const filePath = path.join(__dirname, "db", "task.json");



// fs.readFile(filePath, 'utf-8', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   try{
//     const tasks = JSON.parse(data);
//     console.table(tasks)
//   }
//   catch(parseErr){
//     console.error("Error parsing JSON:",parseErr);
//   }
// })


//step 2 : write a new data in to JSON

//step 2.1: JSON structure  Use Interface for Task Json create 
/*
{
    "id": 1,
    "title": "Buy milk",
    "completed": false,
    "createdAt": "2025-08-21T10:30:00.000Z"
  },


*/

interface Task {
  id: number;
  title: string;
  discription: string;
  task_done:boolean;
  task_completedAt?:string;
  createdAt: string
}

// const userData:Task[] = [
//   {
//     "id": 1,
//     "title": "Buy milk",
//     "discription": false,
//     "createdAt": "2025-08-21T10:30:00.000Z"
//   },
//   {
//     "id": 2,
//     "title": "Go to the gym",
//     "discription": false,
//     "createdAt": "2025-08-21T10:35:00.000Z"
//   },
//   {
//     "id": 3,
//     "title": "Complete homework",
//     "discription": false,
//     "createdAt": "2025-08-21T10:45:00.000Z"
//   }
// ]

// const jsonData = JSON.stringify(userData,null,1);
// fs.writeFile(filePath,jsonData,"utf-8",(err)=>{
//     if(err){
//         console.error(err);
//     }
//     console.log("Data Written Successfully");

// })



// step 2.2:  store data using via terminal in JSON ., must data get from user




// Save tasks.json in current working directory (works for CJS/ESM)

// One readline instance for the whole app
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Keep an in-memory cache we update after each change
let tasks: Task[] = [];

// ---------------- I/O helpers ----------------

function loadTasks(): Task[] {
  // If file is missing, start with empty list
  if (!fs.existsSync(filePath)) return [];
  const fileData = fs.readFileSync(filePath, "utf-8");

  try {
    const parsed = JSON.parse(fileData);
    // Only accept an array; otherwise start fresh
    return Array.isArray(parsed) ? parsed as Task[] : [];
  } catch {
    // If JSON is corrupted, don't crash—start fresh
    return [];
  }
}

function saveTasks(data: Task[]) {
  // Pretty-print with 2 spaces
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ---------------- UI: Menu loop ----------------

function showMenu() {
  console.log("\n--- Task Manager ---");
  console.log("1. Create Task(s)");
  console.log("2. List Tasks");
  console.log("3. Complete Task");
  console.log("4. Delete All Tasks");
  console.log("5. Exit\n");
  rl.question("Choose an option: ", handleMenuChoice);
}

function handleMenuChoice(choice: string) {
  switch (choice.trim()) {
    case "1":
      askForTask(); // enter tasks until 'done', then ask follow-ups
      break;
    case "2":
      listTasks();
      break;
    case "3":
      completeTask();
      break;
    case "4":
      deleteAllTasks();
      break;
    case "5":
      console.log("👋 Goodbye!");
      rl.close();
      break;
    default:
      console.log("❌ Invalid option. Try again.");
      showMenu();
  }
}

// ---------------- Actions ----------------

// 1) Create tasks until user types 'done'.
//    After user types 'done', ask if all tasks are completed, then
//    optionally ask to delete them (your original flow).
function askForTask() {
  rl.question("Enter a title (or type 'done'): ", (title: string) => {
    const t = title.trim();

    // User finished adding
    if (t.toLowerCase() === "done") {
      rl.question("Have you completed all tasks? (yes/no): ", (completed: string) => {
        if (completed.trim().toLowerCase() === "yes") {
          rl.question("Do you want to delete all tasks? (yes/no): ", (del: string) => {
            if (del.trim().toLowerCase() === "yes") {
              tasks = [];
              saveTasks(tasks);
              console.log("✅ All tasks deleted.");
            } else {
              console.log("✅ Tasks kept. Nothing deleted.");
            }
            // back to menu
            showMenu();
          });
        } else {
          console.log("⏳ Okay, keep going then!");
          // back to menu
          showMenu();
        }
      });
      return; // stop here, we’re done with creation loop
    }

    // Create a new task  
    const newTask: Task = {
      id: (tasks[tasks.length - 1]?.id ?? 0) + 1,
      title: t,
      discription: "Created successfully",
      task_done: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log("✅ Task saved.");

    // Continue the create loop
    askForTask();
  });
}

// 2) List tasks from disk (fresh read), show a small table.
function listTasks() {
  tasks = loadTasks(); // refresh from disk
  if (tasks.length === 0) {
    console.log("ℹ️  No tasks yet.");
    return showMenu();
  }

  // Show selected fields in a simple table
  console.table(
    tasks.map(t => ({
      id: t.id,
      title: t.title,
      task_done: t.task_done,
      createdAt: t.createdAt,
      task_completedAt: t.task_completedAt ?? "-"
    }))
  );
  showMenu();
}

// 3) Mark a task as complete by id.
function completeTask() {
  if (tasks.length === 0) {
    console.log("ℹ️  No tasks to complete.");
    return showMenu();
  }

  rl.question("Enter task id to mark complete: ", (idStr) => {
    const id = Number(idStr.trim());
    if (!Number.isInteger(id)) {
      console.log("❌ Please enter a valid numeric id.");
      return showMenu();
    }

    const t = tasks.find(task => task.id === id);
    if (!t) {
      console.log("❌ Task id not found.");
      return showMenu();
    }

    if (t.task_done) {
      console.log(`ℹ️ Task ${id} was already completed on ${t.task_completedAt ?? "unknown date"}.`);
      return showMenu();
    }

    // Mark task as completed
    const now = new Date();
    t.task_done = true;
    t.task_completedAt = now.toISOString(); // save in JSON

    saveTasks(tasks);
    console.log(`✅ Task ${id} marked complete at ${t.task_completedAt}`);
    showMenu();
  });
}


// 4) Delete all tasks after confirmation (also offered after 'done' in create).
function deleteAllTasks() {
  rl.question("Are you sure you want to delete ALL tasks? (yes/no): ", (ans) => {
    if (ans.trim().toLowerCase() === "yes") {
      tasks = [];
      saveTasks(tasks);
      console.log("🗑️  All tasks deleted.");
    } else {
      console.log("✅ Kept your tasks.");
    }
    showMenu();
  });
}

// ---------------- Boot ----------------

tasks = loadTasks();
showMenu();














//step 3: read JSON Task ALL Data with table format it posoible




//step 4: Complete use Id for particular Task





//step 5: Delete a task mujst before task compelete?



//Init

//user access  list =>  
/*
1. Task Create?
2. Task list?
3. Task Complete
4. Task Delete

User choose any 1,  for example i choose 1 , 
title: 
descreption:

//automatic : id, createdAt: 



*/





