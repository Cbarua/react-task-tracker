import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

function Header({ title, onAdd, showAdd }) {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {pathname === "/" && (
        <Button
          text={showAdd ? "Close" : "Add"}
          color={showAdd ? "red" : "green"}
          onClick={onAdd}
        />
      )}
    </header>
  );
}

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string,
};

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header;
