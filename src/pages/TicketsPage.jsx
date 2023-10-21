import axios from "axios";
import { useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import CatContext from "../context/context"
import { useContext } from "react";
import { useEffect } from "react";
import { catArr } from "./Dashboard";
import Nav from "../components/Nav";
const TicketsPage = ({editMode}) => {
  const [formData, setFormData] = useState({
    status: "not started",
    range: 0,
    timestamp: new Date().toISOString(),
    avatar:"",
  });
  const {categories,setCategories} = useContext(CatContext)
  const navigate = useNavigate();
  const { id } = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) {
      const response = await axios.post("http://localhost:8000/tickets", {
        formData,
      });
      if (response.status === 200) {
        navigate("/");
      }

    }

    if (editMode) {
      const existingData = await axios.get(`http://localhost:8000/tickets/${id}`);
      
      // Merge the existing formData with the updated data
      const updatedData = {
        ...existingData.data.data, // Keep existing formData
        formData: {
          ...existingData.data.data.formData, // Keep existing formData properties
          ...formData, // Merge with the updated formData
        },
      };

      const response = await axios.put(`http://localhost:8000/tickets/${id}`, {
        data: updatedData, // Send the merged formData
      });

      // Handle the response as needed
      if (response.status === 200) {
        navigate("/");
      }

    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const fetchData = async ()=>{
    const res = await axios.get(`http://localhost:8000/tickets/${id}`)
    setFormData(res.data.data.formData)
  }


  useEffect(()=>{
    if(editMode){
      fetchData()
    }
  },[editMode])

let oneVal = catArr
const flattenedArray = oneVal.flat();
const uniqueOnes = [...new Set(flattenedArray)]

console.log(uniqueOnes);

  return (
    <>
    <Nav isHome={false} />
    <div className="ticket">
      <h1>{editMode ? "update your Ticket" : "create a ticket"}</h1>
      <div className="ticket-container">
        <form onSubmit={handleSubmit}>
          <section>
            {/* title  */}
            <label htmlFor={"title"}>title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleInput}
              required={true}
              value={formData.title}
            />

            {/* description  */}
            <label htmlFor={"desc"}>desc</label>
            <input
              type="text"
              id="desc"
              name="desc"
              onChange={handleInput}
              required={true}
              value={formData.desc}
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInput}
              
            >
              <option value="" disabled title="select a category or create a new one" selected>select a category or create a new one</option>
              {uniqueOnes.length !== 0 && uniqueOnes.map((cat, i) => (
                <option value={cat} 
                key={i}
                >
                  {cat}
                </option>
              ))}
            </select>

            {/* newCategory  */}
            <label htmlFor={"newCategory"}>New Category</label>
            <input
              type="text"
              id="newCategory"
              name="category"
              onChange={handleInput}

              value={formData.category}
            />

            <div className="multiple-inputs">
              <input
                type="radio"
                id="priority-1"
                name="priority"
                onChange={handleInput}
                value={1}
                checked={formData.priority == 1}
              />
              <label htmlFor="priority-1">1</label>
              <input
                type="radio"
                id="priority-2"
                name="priority"
                onChange={handleInput}
                value={2}
                checked={formData.priority == 2}
              />
              <label htmlFor="priority-2">2</label>
              <input
                type="radio"
                id="priority-3"
                name="priority"
                onChange={handleInput}
                value={3}
                checked={formData.priority == 3}
              />
              <label htmlFor="priority-3">3</label>
              <input
                type="radio"
                id="priority-4"
                name="priority"
                onChange={handleInput}
                value={4}
                checked={formData.priority == 4}
              />
              <label htmlFor="priority-4">4</label>
              <input
                type="radio"
                id="priority-5"
                name="priority"
                onChange={handleInput}
                value={5}
                checked={formData.priority == 5}
              />
              <label htmlFor="priority-5">5</label>
            </div>
     
            <label htmlFor="range">Progress</label>
                <input
                  type="range"
                  id="range"
                  name="range"
                  value={(formData.range)}
                  onChange={handleInput}
                  min={0}
                  max={100}
                />
                <label htmlFor="status">status</label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleInput}
                >
                  <option
                    
                    value="working on it"
                  >
                    working on it
                  </option>
                  <option  value="done">
                    done
                  </option>
                  <option  value="stuck">
                    stuck
                  </option>
                  <option  value="not started">
                    not started
                  </option>
                </select>

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="owner">owner</label>
            <input
              type="text"
              required={true}
              name="owner"
              value={formData.owner}
              onChange={handleInput}
              id="owner"
            />
            <label htmlFor="avatar">avatar</label>
            <input
              type="url"
              
              name="avatar"
              value={formData.avatar}
              onChange={handleInput}
              id="avatar"
            />

            <div className="img-preview">
              {formData.avatar ? (
                <img src={formData.avatar} />
              ): <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />}
            </div>
          </section>
        </form>
      </div>
    </div>
    </>
  );
};

export default TicketsPage;
