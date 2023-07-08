import { stat } from "fs";
import styles from "../styles/Home.module.css";
import { use, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(0);
  const[isupdate,setIsUpdate]=useState(false);
  const[isToDo,setIsToDo]=useState(0);
  const[isCompl,setIsCompl]=useState(0);
  const[isProg,setIsProg]=useState(0);


  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !status) {
      alert("please enter all information about task")
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status,
    };
    if(status=="To Do"){
      setIsToDo(isToDo+1);
    }
    else if(status=="Completed"){
      setIsCompl(isCompl+1);
    }
    else{
      setIsProg(isProg+1);
    }
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setStatus('');
    setShowForm(false);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));

    const taskToDelete = tasks.find(task => task.id === id);
    console.log(taskToDelete?.status);
  if (taskToDelete) {
    if (taskToDelete.status === 'To Do') {
      setIsToDo(isToDo - 1);
    } else if (taskToDelete.status === 'Completed') {
      setIsCompl(isCompl - 1);
    } else if (taskToDelete.status === 'In Progress') {
      setIsProg(isProg - 1);
    }
  }
  };


  const updateTask = () => {
    if (!editingTask || !title || !description || !status) return;

    const taskToEdited = tasks.find(task => task.id === editingTask);
  if (taskToEdited) {
    if (taskToEdited.status === 'To Do') {
      setIsToDo(isToDo - 1);
    } else if (taskToEdited.status === 'Completed') {
      setIsCompl(isCompl - 1);
    } else if (taskToEdited.status === 'In Progress') {
      setIsProg(isProg - 1);
    }
  }

    if(status=="To Do"){
      setIsToDo(isToDo+1);
    }
    else if(status=="Completed"){
      setIsCompl(isCompl+1);
    }
    else{
      setIsProg(isProg+1);
    }

  const updatedTasks = tasks.map(task => {
    
      if (task.id == editingTask) {
        return {
          ...task,
          title,
          description,
          status,
        };
      }
      return task;
    
  });
  setTasks(updatedTasks);
  
  setTitle('');
    setDescription('');
    setStatus('');
    setShowForm(false);
    setIsUpdate(false);

  };

  const editTask = (id:number,title:string,description:string,status:string) => {
    setEditingTask(id);
    setTitle(title);
    setDescription(description);
    setStatus(status);
    setIsUpdate(true);
    setShowForm(true);
    updateTask();
      
  };
  return (
    <div > 
         <div className="border-b-lime-500 py-4 px-4 border-4">      
        <h1 className="font-bold text-3xl text-center  italic">Task Management System</h1> 
        </div> 
        <div className="flex mt-4 pt-2">
          <div className="flex-1  px-3 justify-center">
            {isCompl==0&& isProg==0 && isToDo==0 && <h2 className="text-center mb-2 italic font-bold text-neutral-500">No task</h2>}

          {isToDo>0 && <h3 className="text-center mb-2 italic text-red-500">To Do Task</h3>}
          {tasks.filter(task => task.status === 'To Do').map(task => (
            <div key={task.id} className="p-2 border border-gray-100 rounded mb-4 w-[64%] shadow-xl ml-32">
            <h3 className="text-lg font-bold ml-8 text-center ">{task.title}</h3>
            <p className="mb-2 mt-2">{task.description}</p>
            <p className={`text-sm text-right ${task.status === "In Progress" ? "text-green-500" : task.status === "Completed" ? "text-gray-500" : "text-red-500"}`}>Status: {task.status}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white  px-2 rounded mt-2"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
            <button  className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mt-2 ml-2" 
              onClick={() => editTask(task.id,task.title,task.description,task.status)}
            >
              Edit
            </button>
          
            </div>
          ))}

          {isProg>0 && <h3 className="text-center mb-2 italic  text-lime-500">In Progress</h3>}
          {tasks.filter(task => task.status === 'In Progress').map(task => (
           <div key={task.id} className="p-2 border border-gray-100 rounded mb-4 w-[64%] shadow-xl ml-32">
            <h3 className="text-lg font-bold ml-8 text-center ">{task.title}</h3>
            <p className="mb-2 mt-2">{task.description}</p>
            <p className={`text-sm text-right ${task.status === "In Progress" ? "text-green-500" : task.status === "Completed" ? "text-gray-500" : "text-red-500"}`}>Status: {task.status}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white  px-2 rounded mt-2"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
            <button  className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mt-2 ml-2" 
              onClick={() => editTask(task.id,task.title,task.description,task.status)}
            >
              Edit
            </button>
          
            </div>
          ))}


          {isCompl>0 && <h3 className="text-center mb-2 italic  text-neutral-500">Completed</h3>}
          {tasks.filter(task => task.status === 'Completed').map(task => (
           <div key={task.id} className="p-2 border border-gray-100 rounded mb-4 w-[64%] shadow-xl ml-32">
            <h3 className="text-lg font-bold ml-8 text-center ">{task.title}</h3>
            <p className="mb-2 mt-2">{task.description}</p>
            <p className={`text-sm text-right ${task.status === "In Progress" ? "text-green-500" : task.status === "Completed" ? "text-gray-500" : "text-red-500"}`}>Status: {task.status}</p>
            <button
             className="bg-red-500 hover:bg-red-700 text-white  px-2 rounded mt-2"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
            <button  className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mt-2 ml-2" 
              onClick={() => editTask(task.id,task.title,task.description,task.status)}
            >
              Edit
            </button>
          
            </div>
          ))}

       
          

          </div>
          {/* here */}
          <div className="flex-1 pr-8 mt-2">
          <div className="mb-4 relative ">
        {!showForm ? (
          
          <button className="absolute top-0 right-0 bg-lime-400 hover:bg-lime-600 text-white font-semibold px-1 py-2 rounded " 
            onClick={() => setShowForm(true)}
          >
            Add Task
          </button>
        ) : (
          <div className="mb-4">
            <h1 className="text-2xl text-center font-bold mb-2">Add New Task</h1>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            ></textarea>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            
            <button
              type="button"
              className="bg-lime-400 hover:bg-lime-600 text-white font-semibold py-1 px-2 rounded mr-2"
              onClick={!isupdate?addTask:updateTask}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-2 rounded"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
          </div>
        </div>
    </div>
  );
}

