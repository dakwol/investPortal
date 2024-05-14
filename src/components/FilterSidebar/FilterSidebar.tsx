import React, { FC, useEffect, useState } from "react";
import Buttons from "../Buttons/Buttons";
import "./styles.scss";
import icons from "../../assets/icons/icons";
import ContentApiRequest from "../../api/ContentApi/ContentApi";
import Skeleton from "react-loading-skeleton";
import CategoriesApiRequest from "../../api/ProductApi/ProductApi";
import { useDispatch } from "react-redux";
import { SearchActionCreators } from "../../store/reducers/searchPressItem/action-creator";

interface Category {
  id: number;
  name: string;
  children: Category[];
}

const FilterSidebar: FC = () => {
  const dispatch = useDispatch();
  const contentApi = new CategoriesApiRequest();
  const [arrayFilter, setArrayFilter] = useState<Category[]>([]);
  const [openCategory, setOpenCategory] = useState<number | null>(2); // Track the currently open category
  const [openChildCategory, setOpenChildCategory] = useState<number | null>(
    null
  ); // Track the currently open child category
  const [openProduct, setOpenProduct] = useState<number | null>(null); // Track the currently open product

  useEffect(() => {
    contentApi.productCategories().then((resp) => {
      if (resp.success) {
        resp.data && setArrayFilter(resp.data as Category[]);
      }
    });
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setOpenCategory((prev) => (prev === categoryId ? null : categoryId));
    setOpenChildCategory(null); // Close child category when parent category is clicked
    setOpenProduct(null); // Close product when category is clicked
  };

  const handleChildCategoryClick = (childCategoryId: number) => {
    setOpenChildCategory((prev) =>
      prev === childCategoryId ? null : childCategoryId
    );
    setOpenProduct(null); // Close product when child category is clicked
  };

  const handleProductClick = (productId: number) => {
    setOpenProduct((prev) => (prev === productId ? null : productId));
  };

  const handleClick = (id?: number) => {
    dispatch(SearchActionCreators.setDataPress("category", `${id}`));
  };

  useEffect(() => {
    dispatch(SearchActionCreators.clearDataPress());
  }, [openProduct, openChildCategory]);

  const renderCategory = (category: Category) => (
    <ul>
      {category.children.map((child) => (
        <li key={child.id}>
          <p
            onClick={() => handleChildCategoryClick(child.id)}
            className={`childCategoryName ${
              openChildCategory === child.id ? "active" : ""
            }`}
          >
            {openChildCategory === child.id && <img src={icons.chevronLeft} />}
            {child.name}
          </p>
          {openChildCategory === child.id && (
            <ul>
              {child.children.map((product) => (
                <li key={product.id}>
                  <p
                    className={`productName ${
                      openProduct === product.id && "active"
                    }`}
                    onClick={() => handleProductClick(product.id)}
                  >
                    {openProduct === product.id && (
                      <img src={icons.chevronLeft} />
                    )}
                    {product.name}
                  </p>
                  {openProduct === product.id && (
                    <ul>
                      {product.children.map((productItem) => (
                        <li key={productItem.id}>
                          <p
                            className="productChildName"
                            onClick={() => handleClick(productItem.id)}
                          >
                            {productItem.name}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="filterContainer">
      <div className="filterTab">
        <Buttons
          ico={icons.packageBox}
          text={"Товары"}
          onClick={() => handleCategoryClick(2)}
          className={`tubButton ${openCategory === 2 ? "active" : ""}`}
        />
        <div className="border"></div>
        <Buttons
          ico={icons.tool}
          text={"Услуги"}
          onClick={() => handleCategoryClick(1)}
          className={`tubButton ${openCategory === 1 ? "active" : ""}`}
        />
      </div>
      <div>
        {arrayFilter.length > 0
          ? arrayFilter.map((category) => (
              <div key={category.id}>
                {openCategory === category.id && renderCategory(category)}
              </div>
            ))
          : [...Array(Math.floor(Math.random() * 31) + 20)].map((_, index) => (
              <Skeleton
                key={index}
                width={`${Math.random() * 50 + 50}%`}
                height={20}
                borderRadius={16}
                count={1}
                enableAnimation={true}
              />
            ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
