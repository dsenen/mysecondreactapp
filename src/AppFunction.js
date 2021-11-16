import React, { useState } from "react";
import NewTask from "./Tasks/NewTask";
import TasksList from "./Tasks/TasksList";
import QuizNavBar from "./QuizNavBar/QuizNavBar";
import { questions } from "./QuizNavBar/dataModel";
import ItemList from "./GroceryCart/ItemList";
import { produce, pantryItems } from "./GroceryCart/storeItems";

const colorNames = ['Aquamarine', 'BlueViolet', 'Chartreuse', 'CornflowerBlue', 'Thistle', 'SpringGreen', 'SaddleBrown', 'PapayaWhip', 'MistyRose'];

// regex to match numbers between 1 and 10 digits long
const validPhoneNumber = /^\d{1,10}$/;

export default function AppFunction() {

  //Tasks
  const [newTask, setNewTask] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewTask((prev) => ({ ...prev, id: Date.now(), [name]: value }));
  };

  const [allTasks, setAllTasks] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.title) return;
    setAllTasks((prev) => [newTask, ...prev]);
    setNewTask({});
  };
  const handleDelete = (taskIdToRemove) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== taskIdToRemove));
  };

  const [colorA, setColorA] = useState("Aquamarine");

  const divStyleA = {backgroundColor: colorA};

// Update Function Component State

  const [color, setColor] = useState('Tomato');

  const divStyle = {backgroundColor: color};

// Initialize State

  const [phone, setPhone] = useState('');
  
   const handleChangeA = ({ target })=> {
     const newPhone = target.value;
     const isValid = validPhoneNumber.test(newPhone);
     if (isValid) {
       setPhone(newPhone);
     }
     // just ignore the event, when new value is invalid
    };

// Grocery Cart

  // declare and initialize state

  const [cart, setCart] = useState([]);

  const addItem = (item) => { setCart((prev) => {
    return [item, ...prev];
    });
  };

  const removeItem = (targetIndex) => {
    setCart((prev) => {
      return prev.filter((item, index) => index !== targetIndex);
    });
  };

// Objects in state
  const [profile, setProfile] = useState({});

  const handleChangeB = ({ target }) => {
    const { name, value } = target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
      })
    );
  };

  const handleSubmitB = (event) => {
    event.preventDefault();
    alert(JSON.stringify(profile, '', 2));
  };

  
  return (
    <div>
      <h1>
        <a
          href="https://docs.google.com/document/d/1kqZiEtoYSGyVm3XCpCd0OyPBEGXZy5jslrwxGZlUJhs/edit?usp=sharing"
          target="_blank"
          rel="noreferrer noopener"
        >
          THE STATE HOOK
        </a>
      </h1>
      <h2 className="sections-titles">Why Use Hooks?</h2>
      <div className="sections">
        <h3>Tasks</h3>
        <NewTask
          newTask={newTask}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <TasksList allTasks={allTasks} handleDelete={handleDelete} />
      </div>

      <h2 className="sections-titles">Update Function Component State</h2>

      <div className="sections" style={divStyleA}>
        <p>The color is {colorA}</p>
        <button onClick={() => setColorA("Aquamarine")}>
          Aquamarine
        </button>
        <button onClick={() => setColorA("BlueViolet")}>
          BlueViolet
        </button>
        <button onClick={() => setColorA("Chartreuse")}>
          Chartreuse
        </button>
        <button onClick={() => setColorA("CornflowerBlue")}>
          CornflowerBlue
        </button>
      </div>

      <h2 className="sections-titles">Initialize State</h2>
      <div className="sections" style={divStyle}>
        <p>Selected color: {color}</p>
        {colorNames.map((colorName)=>(
          <button 
            onClick={() => setColor(colorName)} 
            key={colorName}>
               {colorName}
          </button>
        ))}
      </div>
      <h2 className="sections-titles">Use State Setter Outside of JSX</h2>

      <div className="sections">
        <div className='phone'>
          <label for='phone-input'>Phone: </label>
          <input value={phone} onChange={handleChangeA} id='phone-input' />
        </div>
      </div>

      <h2 className="sections-titles">Set From Previous State</h2>
      <div className="sections">
        <QuizNavBar questions={questions} />
      </div>
      <h2 className="sections-titles">Arrays in State</h2>

      <div className="sections">
        <h3>Grocery Cart</h3>
        <h4>Produce</h4>
        <ItemList items={produce} onItemClick={addItem} />
        <h2>Pantry Items</h2>
        <ItemList items={pantryItems} onItemClick={addItem} />
        <ul>
          {cart.map((item, index) => (
            <li onClick={() => removeItem(index)} key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <h2 className="sections-titles">Objects in State</h2>

      <div className="sections">      
        <form onSubmit={handleSubmitB}>
          <input
            value={profile.firstName || ''}
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={handleChangeB}
          />
          <input
            value={profile.lastName || ''}
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChangeB}
          />
          <input
            value={profile.bday || ''}
            type="date"
            name="bday"
            onChange={handleChangeB}
          />
          <input
            value={profile.password || ''}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChangeB}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <h1>
        <a
          href="https://docs.google.com/document/d/1F_O-7XUpJXWJo-hdTz9OEjDnQpjgsVln2dasDFWkm1Q/edit?usp=sharing"
          target="_blank"
          rel="noreferrer noopener"
        >
          THE EFFECT HOOK
        </a>
      </h1>
    </div>
  );
}
