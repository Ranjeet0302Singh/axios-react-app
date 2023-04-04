import { useEffect, useState } from "react";
import "./App.css";
import axios from "./axios";

function App() {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  // By using Promise
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((Response) => setMyData(Response.data))
  //     .catch((Error) => setIsError(Error.message));
  // }, []);

  // by using async await
  const getApiData = async () => {
    try {
      const Response = await axios.get("/posts");
      setMyData(Response.data);
    } catch (Error) {
      setIsError(Error.message);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="App">
      <h1>Axios Practice</h1>
      {isError !== "" && <h2>{isError}</h2>}

      <div className="grid">
        {myData.map((post) => {
          const { id, title, body } = post;
          return (
            <div className="card" key={id}>
              <h2>{title.slice(0, 40).toUpperCase()}</h2>
              <p>{body.slice(0, 100)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
