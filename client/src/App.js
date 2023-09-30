import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [total] = useState(0);
  // function fetch data
  async function fetchData() {
    try {
      const list = await (await axios.get('http://localhost:8000/api/list')).data.data
      console.log(list);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container min-vh-100">
      {/* Container width 100% */}
      <div className="container-fluid">
        {/* Header */}
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <h1 className="my-2">React EASYRICE</h1>
          </div>
        </div>
      </div>
      {/* Container width 50% */}
      <div className="container-fluid w-50">
        <div className="row">
          {/* Input  */}
          <div className="col-12 d-flex justify-content-center align-items-center">
            <input type="text" className="form-control me-1" />
            <button type="button" className="btn btn-success ms-1">SEARCH</button>
          </div>
          {/* Total */}
          <div className="col-12 d-flex justify-content-center align-items-center">
            <h5 className="my-2">Total : {total}</h5>
          </div>
          {/* Cards */}
          <div className="col-12 d-flex justify-content-center align-items-center mb-3">
            <div className="card">
              <img src="https://picsum.photos/400/300" className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text text-success">1/10/2566</p>
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
