import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { CREATE_USER } from '../utils/mutations';

function SignUp(props) {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, {error}] = useMutation(CREATE_USER);
  const [errorMessage, setErrorMessage] = useState('');


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState }
      });
      const token = data.createUser.token;
      Auth.login(token);
    } catch (error) {
      console.error(error);
      setErrorMessage('Oops! Username/email already in use');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="text-6xl text-purple-600 font-bold text-center">PeakPursuit</h1>  
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div className="mt-2">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username:</label>
          <input
            placeholder="Username"
            name="username"
            type="text"
            id="username"
            value={formState.username}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="pwd" className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            value={formState.password}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {error && (
          <div>
            <p className="error-text text-red-500">{errorMessage}</p>
          </div>
        )}
        <div className="flex-row flex-end">
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
        </div>
        <Link to="/" className="justify-center flex font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Click Here to Login!</Link>
      </form>
    </div>
  );
  
}

export default SignUp;