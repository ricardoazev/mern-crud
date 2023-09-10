import { useEffect, useState } from 'react';
import './App.css';
//import { IoClose } from 'react-icons/io5'
import axios from "axios"
import Formtable from './components/Formtable';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
  })
  const [formDataEdit, setFormDataEdite] = useState({
    name: "",
    email: "",
    telefone: "",
    _id: ""
  })

  const [dataList, setDataList] = useState([])

  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormData((preve) => {
      return {
        ...preve, [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData)
    console.log(data)
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.msg)
      getFetchData()
      setFormData({
        name: "",
        email: "",
      })
    }
  }

  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }
  useEffect(() => {
    getFetchData()
  }, [])

  console.log(dataList)

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)

    if (data.data.success) {
      getFetchData()
      alert(data.data.msg)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/update/", formDataEdit)
    if (data.data.success) {
      getFetchData()
      alert(data.data.msg)
      setEditSection(false)
    }
  }
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target
    setFormDataEdite((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleEdit = (el) => {
    setFormDataEdite(el)
    setEditSection(true)
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>

        {
          addSection && (
            <Formtable
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleclose={() => setAddSection(false)}
              rest={formData}
            />
          )
        }
        {
          editSection && (
            <Formtable
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleclose={() => setEditSection(false)}
              rest={formDataEdit}
            />
          )
        }

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (

                dataList.map((el, index) => {
                  console.log(el)
                  return (
                    <tr key={index}>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.telefone}</td>
                      <td>
                        <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edite</button>
                        <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Deletar</button>
                      </td>
                    </tr>
                  )
                }))

                : (
                  
                  <p style={{textAlign: "center"}}>Sem dados</p>
                  
                )
              }
            </tbody>
          </table>
        </div>


      </div>
    </>
  );
}

export default App;
