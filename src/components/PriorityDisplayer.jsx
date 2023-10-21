/* eslint-disable react/prop-types */
const PriorityDisplay = ({ticket}) => {
    return (
      <div className="priority-container">
        <div className="star" style={{color: ticket.priority >=1 ? `rgb(253,253,150)`: ""}}>&#9733;</div>
        <div className="star" style={{color: ticket.priority >=2 ? `rgb(253,253,150)`: ""}}>&#9733;</div>
        <div className="star" style={{color: ticket.priority >=3 ? `rgb(253,253,150)`: ""}}>&#9733;</div>
        <div className="star" style={{color: ticket.priority >=4 ? `rgb(253,253,150)`: ""}}>&#9733;</div>
        <div className="star" style={{color: ticket.priority >=5 ? `rgb(253,253,150)`: ""}}>&#9733;</div>
      </div>
    );
  };
  
  export default PriorityDisplay;
  