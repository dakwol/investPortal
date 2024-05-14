import React, { FC, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { IProduct } from "../../models/IProduct";
import UploadImageApiRequest from "../../api/UploadImage/UploadImage";
import ContentApiRequest from "../../api/ContentApi/ContentApi";
import "./styles.scss";
import Buttons from "../Buttons/Buttons";
import Pagination from "../Pagination/Pagination";
import Skeleton from "react-loading-skeleton";
import icons from "../../assets/icons/icons";
import { useSelector } from "react-redux";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { SearchActionCreators } from "../../store/reducers/searchPressItem/action-creator";
import { useDispatch } from "react-redux";

const ProductList: FC = () => {
  const contentApi = new ContentApiRequest();
  const filterPress = useSelector(
    (state: any) => state.SearchReducer.dataPress
  );

  console.log("filterPress", filterPress);

  const dispatch = useDispatch();

  const [isProduct, setProduct] = useState<IProduct[]>([]);
  const [isProductCount, setProductCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNumber, setIsLoadingNumber] = useState(12);

  const dataOption = [
    {
      id: 1,
      text: "По новизне",
      slug: "",
      ico: "",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    const queryString = Object.entries(filterPress)

      .map(([key, value]) =>
        //@ts-ignore
        value ? `${key}=${encodeURIComponent(value)}` : ""
      )
      .filter((str) => str !== "")
      .join("&");
    contentApi
      .products(`?fields=card_info&limit=12&${queryString}`)
      .then((resp) => {
        if (resp.success) {
          resp.data && setProduct(resp.data.items);
          resp.data && setProductCount(resp.data.meta.total_count);
          setIsLoading(false);
        }
      });
  }, [filterPress]);

  const handleUpdatePage = (number: string | number, showMore: boolean) => {
    setIsLoading(true);
    setIsLoadingNumber((number as number) * 12);
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

          setIsLoading(false);
        }
      });
  };

  return (
    <div>
      <div className="listTitleContainer">
        <h1 className="listTitle">
          Все товары <span>{isProductCount}</span>
        </h1>
        <DropDownMenu
          options={dataOption}
          onChange={(e) =>
            dispatch(SearchActionCreators.setDataPress("order", `${e}`))
          }
        />
      </div>
      <div className="listCard">
        {isLoading ? (
          [...Array(isLoadingNumber)].map((_, index) => (
            <Skeleton key={index} height={300} borderRadius={16} />
          ))
        ) : isProduct?.length === 0 ? (
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
