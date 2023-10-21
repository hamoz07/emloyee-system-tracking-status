/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import AvatarDisplay   from "./AvatarDisplayer.jsx"
import StatusDisplay   from "./StatusDisplayer.jsx"
import PriorityDisplay from "./PriorityDisplayer.jsx"
import DeleteBlock     from "./DeleteBlock.jsx"
import ProgressDisplay from "./ProgressDisplayer.jsx"

const TicketCard = ({color,title,ticket}) => {  
  return (
    <div className="ticket-card">
      <Link
        to={`/ticket/${ticket.documentId}`}
        id="link"
      >
      <div className="ticket-color" style={{background:color}}></div>
        <h3>{title}</h3>
        <AvatarDisplay   ticket={ticket} />
        <StatusDisplay   ticket={ticket} />
        <PriorityDisplay ticket={ticket} />
        <ProgressDisplay ticket={ticket} color={color} />
      </Link>
      <DeleteBlock  documentId={ticket.documentId}/>
    </div>
  )
}

export default TicketCard
