import React, { FC } from "react";
import Buttons from "../Buttons/Buttons";
import "./styles.scss";
import icons from "../../assets/icons/icons";

const FilterSidebar: FC = () => {
  return (
    <div className="filterContainer">
      <div className="filterTab">
        <Buttons
          ico={icons.packageBox}
          text={"Товары"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          className={`tubButton ${"active"}`}
        />
        <div className="border"></div>
        <Buttons
          ico={icons.tool}
          text={"Услуги"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          className="tubButton"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
