import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Import Components
import Card from './components/Card';
import Input from './components/Input';

function App() {
  // useState
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  // checking title type String with not undefined, "", null
  const [searchSuccess, setSearchSuccess] = useState(true)
  // get 0 Data
  const [searchNull, setSearchNull] = useState(false)

  // Function getData From API
  async function getData() {
    try {
      const data = await axios.get('http://localhost:8000/api/list');
      setTotal(data.data.length)
      setList(data.data)
      // finish Loading
      setLoading(false)
      setSearchNull(false)
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  // Function postData From API
  async function postData(title) {

    // Checking title is a number ?
    if (!isNaN(title)) {
      title = parseInt(title)
    }
    else {
      // Checking if title = "null" => change to null
      if (title.toUpperCase() === "NULL") {
        title = null
      }
    }


    // set Search Null
    setSearchNull(false)
    // new Loading
    setLoading(true)
    var json = {
      "filter": {
        "title": title
      }
    }

    try {
      const data = await axios.post('http://localhost:8000/api/list', json);
      if (data.data.length === 0) {
        setSearchNull(true)
        setTotal(0)
        setList([])
      }
      else {
        setList(data.data)
        setTotal(data.data.length)
      }

      // reset search success
      setSearchSuccess(true)
    } catch (error) {
      console.error(error.message);

      //  search with not true type of title
      setSearchSuccess(false)
    }
    // finish Loading
    setLoading(false)
  }

  // Create List of Card into listItems
  const listItems = list.map(item => {
    return <Card key={item.id} title={item.title} description={item.description} datetime={item.datetime} image={item.image} />
  });

  return (
    <div className="container min-vh-100">
      {/* Container width 100% */}
      <div className="container-fluid">
        {/* Header */}
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <h1 className="mt-2 mb-5 fw-bold">React EASYRICE</h1>
          </div>
        </div>
      </div>

      {/* Container width 50% */}
      <div className="container-fluid w-50">
        <div className="row">
          <Input title="SEARCH" functionSendDataBack={(data) => { postData(data) }} />
          {loading ?
            <div>
              {/* Loading */}
              <div className="col-12 d-flex justify-content-center align-items-center">
                <h1 className="my-2">Loading</h1>
              </div>
            </div> :
            <div>
              {/* Tell USER, how to use Search */}
              {searchSuccess ?
                <div></div> :
                <div>
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <h5 className="my-3 text-danger fw-bold text-center">title นั้นต้องเป็น string และไม่เป็นค่าว่าง (undefined, null, “”)</h5>
                  </div>
                </div>}
              {/* Total */}
              <div className="col-12 d-flex justify-content-center align-items-center">
                <h5 className="my-3">Total : {total}</h5>
              </div>
              {searchNull ? <div>
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <h5 className="my-3 text-danger fw-bold text-center">ไม่พบข้อมูล</h5>
                  <button type="button" className="btn btn-success ms-1" onClick={() => { getData() }}>RESET</button>
                </div>
              </div>
                : listItems}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
