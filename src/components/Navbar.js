import { Navbar } from "responsive-navbar-react";
import "responsive-navbar-react/dist/index.css";

const Home = () => {
  const props = {
    items: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Browse Player",
        link: "/browsePlayer",
      },

      {
        text: "Browse Team",
        link: "/browseTeam",
      },
    ],
    logo: {
      text: "Cric App",
    },
    style: {
      barStyles: {
        background: "black",

        // background: "#d3af85",
      },

      sidebarStyles: {
        background: "#222",
        buttonColor: "white",
      },
    },
  };
  return (
    <div className="home">
      <Navbar {...props} />
    </div>
  );
};
export default Home;
