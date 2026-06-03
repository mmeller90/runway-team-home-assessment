import { Link } from "react-router-dom";
import "./AppCard.css";

interface Props {
  name: string;
  id: string;
}

const AppCard: React.FC<Props> = ({ name, id }) => {
  return (
    <div>
      <Link to={`reviews/${id}`}>{name}</Link>
    </div>
  );
};

export default AppCard;
