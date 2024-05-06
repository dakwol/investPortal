import React, { FC, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { IProduct } from "../../models/IProduct";
import UploadImageApiRequest from "../../api/UploadImage/UploadImage";
import ContentApiRequest from "../../api/ContentApi/ContentApi";
import "./styles.scss";
import Buttons from "../Buttons/Buttons";
import Pagination from "../Pagination/Pagination";

const ProductList: FC = () => {
  const contentApi = new ContentApiRequest();

  const [isProduct, setProduct] = useState<IProduct[]>([]);
  const [isProductCount, setProductCount] = useState<number>(0);

  useEffect(() => {
    contentApi.products("?fields=card_info&limit=12").then((resp) => {
      if (resp.success) {
        resp.data && setProduct(resp.data.items);
        resp.data && setProductCount(resp.data.meta.total_count);
      }
    });
  }, []);

  const handleUpdatePage = (number: string | number, showMore: boolean) => {
    contentApi
      .products(
        `?fields=card_info&limit=12&offset=${((number as number) - 1) * 12}`
      )
      .then((resp) => {
        if (resp.success) {
          resp.data &&
            (showMore
              ? setProduct((prev) => [...prev, ...resp?.data?.items])
              : setProduct(resp.data.items));
        }
      });
  };

  console.log("isProduct", isProduct);

  return (
    <div>
      <div className="listTitleContainer">
        <h1 className="listTitle">
          Все товары <span>{isProductCount}</span>
        </h1>
        <Buttons
          text={"По новизне"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className="listCard">
        {isProduct?.length === 0 ? (
          <h4>Ничего не найдено</h4>
        ) : (
          isProduct?.map((item) => {
            return <ProductCard productItem={item} />;
          })
        )}
      </div>
      <Pagination
        respData={Math.ceil(isProductCount / 12)}
        handlePage={(number, showMore) => handleUpdatePage(number, showMore)}
        handleSearch={function (string: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default ProductList;
