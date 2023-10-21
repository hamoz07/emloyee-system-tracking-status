import axios from "axios";

const DeleteBlock = ({documentId}) => {

  const deleteTicket = async () => {
    console.log(documentId);
    const gotItem = await axios.delete(`http://localhost:8000/tickets/${documentId}`)
    const res = gotItem.status == 200
    if(res){
      window.location.reload()
    }
  }

  return (
    <div className="delete-block" onClick={deleteTicket}>
      <div className="delete-icon">&#120;</div>
    </div>
  );
};

export default DeleteBlock;
