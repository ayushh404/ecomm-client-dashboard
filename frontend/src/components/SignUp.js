import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [showModal, setShowModal] = useState(true); // State to control modal visibility
  const Navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      Navigate("/");
    }
  }, [Navigate]);

  const collectData = async () => {
    
    if(key != "admin@1234"){
        alert('Please enter a valid key');
        Navigate("/");
    }
    else{
        let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
            "Content-Type": "application/json",
            },
        });

        result = await result.json();
        console.warn(result);

        localStorage.setItem("user", JSON.stringify(result));

        if (result) {
          Navigate("/");
        }
        }

    
    };

  const action = ()=>{
    setShowModal(false);
    Navigate("/home");
  }

  return (

    <div>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
          CLIENT-SECTION/DASHBOARD
        </h1>
      </div>
    </div>
      {/* <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Open Signup Modal
      </button> */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg shadow-lg">
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900"
              onClick={() => action()}
            >
              X
            </button>
            <h2 className="text-2xl font-extrabold text-gray-900">Sign Up</h2>
            <div className="mt-4">
              <input
                className="rounded-md shadow-sm w-full p-2"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
            </div>
            <div className="mt-4">
              <input
                className="rounded-md shadow-sm w-full p-2"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>
            <div className="mt-4">
              <input
                className="rounded-md shadow-sm w-full p-2"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
            <div className="mt-4">
              <input
                className="rounded-md shadow-sm w-full p-2"
                type="password"
                onChange={(e) => setKey(e.target.value)}
                placeholder="Key(Default:admin@1234)"
              />
            </div>
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full"
                onClick={() => {
                  collectData();
                  setShowModal(false);
                }}
                type="button"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
