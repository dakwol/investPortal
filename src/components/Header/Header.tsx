import React, { FC } from "react";
import InputSearch from "../InputSearch/InputSearch";
import icons from "../../assets/icons/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import Buttons from "../Buttons/Buttons";
import { RouteNames } from "../../routes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormInput from "../FormInput/FormInput";

const Header: FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("account") || "{}");

  const navData = [
    {
      id: 1,
      ico: icons.star,
      text: "Бренды",
    },
    {
      id: 2,
      ico: icons.building,
      text: "Бизнесу",
    },
    {
      id: 3,
      ico: icons.fileCopy,
      text: "Новости",
    },
  ];

  return (
    <div className="container">
      <header className="header">
        <Link to={RouteNames.HOMEPAGE}>
          <div className="logoContainer">
            <img src={icons.Logo} className="logoImg" />
            <h1 className="logoTitle">Сделано в Белгороде</h1>
          </div>
        </Link>
        <FormInput
          style={""}
          value={undefined}
          onChange={function (
            value: string,
            isChecked?: boolean | undefined
          ): void {
            throw new Error("Function not implemented.");
          }}
          subInput={undefined}
          required={false}
          error={""}
          keyData={""}
        />

        <nav className="navContainer">
          {navData.map((item) => {
            return (
              <div key={item.id} className="navItem">
                <img src={item.ico} className="navItemIco"></img>
                <p className="navItemName">{item.text}</p>
              </div>
            );
          })}
        </nav>
      </header>
    </div>
  );
};

export default Header;
