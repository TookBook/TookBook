import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)


  const getWeather = async () => {
    // const resp = await fetch("/api/weatherforecast")
    // const json = await resp.json()
    // console.log(json)
    // setWeather(json);
  }

  return (
    <div className="App">
      <p>Hello World?</p>
    </div>
  )
}

export default App
