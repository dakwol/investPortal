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
import { SearchActionCreators } from "../../store/reducers/searchPressItem/action-creator";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

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
      onClick: () => navigation(RouteNames.BRANDS),
    },
    {
      id: 2,
      ico: icons.building,
      text: "Бизнесу",
    },
    {
      id: 3,
      ico: icons.fileHeader,
      text: "Новости",
      onClick: () => navigation(RouteNames.NEWS),
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
        <div className="searchInputContainer">
          <div className="dropdownButton">
            <DropDownMenu
              options={[]}
              onChange={function (e: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <FormInput
            style={"searchInput"}
            value={undefined}
            onChange={(value) => {
              dispatch(SearchActionCreators.setDataPress("search", `${value}`));
            }}
            placeholder="Найти белгородское…"
            subInput={undefined}
            required={false}
            error={""}
            keyData={""}
          />
        </div>

        <nav className="navContainer">
          {navData.map((item) => {
            return (
              <div key={item.id} className="navItem" onClick={item.onClick}>
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
