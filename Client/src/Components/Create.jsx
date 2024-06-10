import React,{ useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Create = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');

const navigate=useNavigate()

  const submit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/newuser",{name, email})
    .then(result => console.log(result))
    .catch(err=> console.log(err))
  }
  return (
    <div>
 <h1>create</h1>
    <form onSubmit={submit}>
        <div>
        <label>Name</label>
        <input value={name}type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} />
        </div>
        <div>
        <label htmlFor="">Email</label>
        <input value={email} type="text" placeholder='Enter your email'onChange={(e)=>setEmail(e.target.value)}  />
        </div>
        <button type='submit'>Submit</button>
    </form>
    </div>
  );
}

export default Create;