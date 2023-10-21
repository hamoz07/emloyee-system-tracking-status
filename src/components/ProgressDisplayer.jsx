/* eslint-disable react/prop-types */
const ProgressDisplay = ({ticket,color}) => {
    return (
    <div className="progress-display">
      <div className="progress-bar">
        <div style={{width:`${ticket.range}%`,background:`${color}`}}></div>
      </div>
    </div>
    )
  };
  
  export default ProgressDisplay;
  