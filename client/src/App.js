import { useEffect } from "react"
import { useRoutes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { routes } from "./routes"


function App() {
  const element = useRoutes(routes)


  // with out appollo client request
  // useEffect(() => {
  //   fetch('http://localhost:4000/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       query: `
  //       query getQuotesById($by:ID!){
  //         quote(by:$by){
  //           name
  //           by
  //         }
  //       }
  //       `,
  //       variables:{
  //         by:"62f3530c06c587eef5f050e9"
  //       }
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, [])


  return (
    <>
      <Navbar />

      {/* routes */}
      {element}
    </>
  );
}

export default App;
