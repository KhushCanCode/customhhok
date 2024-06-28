import { useState } from 'react'
import './App.css'
import useFetch from './assets/useFetch';

function App() {

  const {data, loading, error} = useFetch("https://jsonplaceholder.typicode.com/photos");

  if (error){
    return <div className="loading">Error: {error}</div>;
  } 
    
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className='container'>
      {data && data.map((post) => (

        <div key={post.id} className='card'>

            <img src={post.url} alt="..." />
            <h2>{post.title}</h2>

        </div>
      ))}
    </div>
  );
}

export default App
