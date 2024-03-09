import React, { useState } from "react";
import { instance } from "./api/axios"; 

const App = () => {
  const [state, setState] = useState({
    title: "",
    url: ""
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      title: state.title,
      url: state.url
    };
    instance.post("/posts", userData)
      .then((response) => {
        console.log(response.status, response.data);
        setSubmittedData(userData); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card title</label>
          <input type="text" id="title" name="title" value={state.title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Card title" required />
        </div>

        <div className="mb-5">
          <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
          <input type="url" id="url" name="url" value={state.url} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Image url" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
      </form>

      {submittedData && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={submittedData.url} alt={submittedData.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{submittedData.title}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
