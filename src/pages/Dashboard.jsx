import { useState, useEffect, useContext } from "react";
import TicketCard from "../components/TicketCard";
import axios from "axios";
import CatContext from "../context/context";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
export const catArr = [];

const Dashboard = () => {
  const [tickets, setTickets] = useState(null);
  const [loading, setLoading] = useState(true);
  let { categories, setCategories } = useContext(CatContext);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:8000/tickets");
      setLoading(false);
      const dataObj = response.data.data;
      const arrOfKeys = Object.keys(dataObj);
      let arrOfEachObjectData = Object.keys(dataObj).map((key) => dataObj[key]);
      let formatData = [];

      arrOfEachObjectData.map((item) => {
        formatData.push(item.formData);
      });

      const finalArr = [];

      arrOfKeys.forEach((key, i) => {
        const formatedObj = { ...formatData[i] };
        formatedObj["documentId"] = key;
        finalArr.push(formatedObj);
      });

      setTickets(finalArr);
    }
    getData();
  }, []);

  useEffect(() => {
    setCategories([...new Set(tickets?.map(({ category }) => category))]);
  }, []);

  const uniqueCategory = [...new Set(tickets?.map(({ category }) => category))];
  // setUniqueCategory(Cat)
  catArr.push(uniqueCategory);

  const colors = [
    `rgb(255,179,186)`,
    `rgb(255,223,186)`,
    `rgb(255,255,186)`,
    `rgb(186,255,201)`,
    `rgb(186,255,201)`,
    `rgb(186,255,255)`,
  ];

  return (
    <>
      <Nav isHome={true} />
      <div className="dashboard">
        <h1>My Projects</h1>
        <div className="ticket-container">
          {/* {!loading && tickets.length > 0 ? (
            uniqueCategory?.map((uniqueCate, i) => (
              <div key={i} style={{ marginTop: "20px" }}>
                <h3>{uniqueCate || "main project"}</h3>
                {tickets
                  .filter((ticket) => ticket.category === uniqueCate)
                  .map((filteredTicker, _index) => {
                    return (
                      <TicketCard
                        key={_index}
                        color={colors[i]}
                        title={filteredTicker?.title}
                        ticket={filteredTicker}
                      />
                    );
                  })}
              </div>
            ))
          ) : !loading ? (<h1>loading...</h1>) : (
            <>
            <h3>
              no tickets found 
            </h3>
              <Link to={"/ticket"} className="goticketspage">create a new one</Link>
            </>
          )} */}

          {loading ? (
            <h3>loading...</h3>
          ) : !loading && tickets.length > 0 ? (
            uniqueCategory?.map((uniqueCate, i) => (
              <div key={i} style={{ marginTop: "20px" }}>
                <h3>{uniqueCate}</h3>
                {tickets
                  .filter((ticket) => ticket.category === uniqueCate)
                  .map((filteredTicker, _index) => {
                    return (
                      <TicketCard
                        key={_index}
                        color={colors[i]}
                        title={filteredTicker?.title}
                        ticket={filteredTicker}
                      />
                    );
                  })}
              </div>
            ))
          ) : (
            <>
              <h3>no tickets found</h3>
              <Link to={"/ticket"} className="goticketspage">
                create a new one
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
