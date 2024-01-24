
import { useState, useCallback, useEffect, useRef } from 'react'
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+-=[]{}|;:"
    

    for(let i = 1; i <= length; i++){
      let charInd = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(charInd);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(()=> {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-center text-xl py-4 text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden bg-white mb-4'>
          <input 
            type="text" 
            value={password} 
            placeholder='Password'
            readOnly
            ref={passwordRef}
            className='outline-none w-full py-1 px-3' />
            <button onClick={copyPasswordToClipboard} 
            className='px-4 py-2 bg-blue-600 text-white'>Copy</button>
        </div>
        <div className='pb-5 flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=> {setLength(e.target.value)}}
            />
            <label className='text-white'>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked = {numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label className='text-white' htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked = {charAllowed}
            id='charInput'
            onChange={()=>{
              setCharAllowed((prev) => !prev)
            }}
            />
            <label className='text-white' htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default App
