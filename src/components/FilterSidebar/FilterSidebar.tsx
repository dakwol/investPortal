import React, { FC, useEffect, useState } from "react";
import Buttons from "../Buttons/Buttons";
import "./styles.scss";
import icons from "../../assets/icons/icons";
import ContentApiRequest from "../../api/ContentApi/ContentApi";
import Skeleton from "react-loading-skeleton";
import CategoriesApiRequest from "../../api/ProductApi/ProductApi";

interface Category {
  id: number;
  name: string;
  children: Category[];
}

const FilterSidebar: FC = () => {
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
            {child.name}
          </p>
          {openChildCategory === child.id && (
            <ul>
              {child.children.map((product) => (
                <li key={product.id}>
                  <p
                    className="productName"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.name}
                  </p>
                  {openProduct === product.id && (
                    <ul>
                      {product.children.map((productItem) => (
                        <li key={productItem.id}>
                          <p className="productName">{productItem.name}</p>
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
        {arrayFilter.length > 0 ? (
          arrayFilter.map((category) => (
            <div key={category.id}>
              {openCategory === category.id && renderCategory(category)}
            </div>
          ))
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
