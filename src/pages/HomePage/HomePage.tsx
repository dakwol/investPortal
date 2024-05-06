import React, { FC } from "react";
import Header from "../../components/Header/Header";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductList from "../../components/ProductList/ProductList";
import "./styles.scss";

const HomePage: FC = () => {
  return (
    <div className="container">
      <div className="containerHome">
        <FilterSidebar />
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
