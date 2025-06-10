import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import VisitorChart from "../components/Chart";

const Dashboard = () => {
  return (
    <div>
      <nav>
        <Link to="/imageUpload">
            <button>Upload image</button>
        </Link>
        <Link to="/gallery">
          <button>Gallery</button>
        </Link>
        <VisitorChart />
        <UserButton />
      </nav>
    </div>
  );
};

export default Dashboard;
