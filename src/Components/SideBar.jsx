import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import sidebar from "./SideBar.module.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/agrupaciones",
      name: "Agrupaciones",
    },
    {
      path: "/categorias",
      name: "Categorías",
    },
  ];
  return (
    <div className={sidebar.All}>
      <div className={sidebar.container}>
        <div
          style={{ width: isOpen ? "200px" : "50px" }}
          className={sidebar.sidebar}
        >
          <div className={sidebar.top_section}>
            <div
              style={{ cursor: "pointer", marginLeft: isOpen ? "50px" : "0px" }}
              className={sidebar.bars}
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className={sidebar.link}>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className={sidebar.link_text}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
