import { container, title } from "/styles/jss/nextjs-material-kit.js";

const dashboard = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container,
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    minHeight: "32px",
    color: "#FFFFFF",
    marginTop: "-16px",
    textDecoration: "none",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  map: {
    border: "none",
    width: "100%",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  contactItem: {
    display: "flex",
    fontWeight: "400",
    marginBottom: "10px",
  },
  Icon: {
    transition: "all 0.2s",
    "&:hover": {
      color: "#00cfff",
    },
  },
};

export default dashboard;
