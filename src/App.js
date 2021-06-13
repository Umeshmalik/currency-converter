import { useEffect, useState } from 'react';
import './App.css';
import ReactLoading from 'react-loading';

function App() {
  const [data, setData] = useState();
  const [inputOne, setInputOne] = useState(0);
  const [result , setResult] = useState('Result')
  const [selectOne, setSelectOne] = useState('temp');
  const [selectTwo, setSelectTwo] = useState('temp');
  
  const fetchData = async()=>{
    await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json')
    .then(response => response.json())
    .then(result => setData(result))
    .catch(err => console.error(err))
  }
  useEffect(()=>{
    fetchData()
  },[])

  const changeOne =(event)=>{
    setInputOne(event.target.value)
    // console.log(event.target.value);
  }


  const selectOneFunc =(event)=>{
    setSelectOne(event.target.value)
    // console.log(event.target.value);
  }

  const selectTwoFunc =(event)=>{
    // console.log(event.target.value);
    setSelectTwo(event.target.value)
  }

  const calculate = async ()=>{
      result === 'Result' && (
        <ReactLoading type='bars'  />
      )

    var temp = ''
    if(selectOne === 'temp' || selectTwo === 'temp')
      alert("Please choose correct Currency")
    else{
      await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selectOne}/${selectTwo}.json`)
      .then(response => response.json())
      .then(res => {
         Object.keys(res).map(ele=>{
          if(ele===selectTwo){
            temp = res[ele]
          }
          return ''
        });
        setResult(temp*inputOne)
        })
      .catch(err => console.error(err))
    }
  }
  return (
    <div className="App">
      <h2>Welcome to Currency Converter</h2>
      <div>
        <select onChange={(e)=>selectOneFunc(e)}>
          <option key="nothing" value="temp">Choose any Currency</option>
          {
            data &&(
              Object.keys(data).map(ele=>{
                return(
                  <option key={ele} value={ele}>{data[ele]}</option>
                )
              })
            )
          }
        </select>
        <input type='number' placeholder="Enter any number" onChange={(e)=>changeOne(e)}/>
      </div>
      <div>
        <select onChange={(e)=>selectTwoFunc(e)}>
          <option key="nothing" value="temp">Choose any Currency</option>
          {
            data &&(
              Object.keys(data).map(ele=>{
                return(
                  <option key={ele} value={ele}>{data[ele]}</option>
                )
              })
            )
          }
        </select>
        <input type='number' placeholder={result} onChange={()=>{setResult('')
      console.log(result)}} disabled/>
      </div>
      <button onClick={()=>calculate()}>Calculate</button>
    </div>
  );
}

export default App;
