import React, { FC, useEffect, useState } from "react";
import CardInfoContainer from "../../components/CardInfoContainer/CardInfoContainer";
import { useNavigate, useParams } from "react-router-dom";
import ContentApiRequest from "../../api/ContentApi/ContentApi";
import { IProduct } from "../../models/ICardInfo";
import Buttons from "../../components/Buttons/Buttons";
import icons from "../../assets/icons/icons";
import { RouteNames } from "../../routes";
import BrandApiRequest from "../../api/BrandApi/BrandApi";
import "./styles.scss";
import { NewsArticle } from "../../models/INews";
import CardNews from "../../components/CardNews/CardNews";
import Skeleton from "react-loading-skeleton";
import Pagination from "../../components/Pagination/Pagination";

const NewsPage: FC = () => {
  const navigate = useNavigate();
  const contentApi = new ContentApiRequest();
  const [dataNews, setDataNews] = useState<NewsArticle[]>([]);
  const [isNewsCount, setNewsCount] = useState<number>(0);

  useEffect(() => {
    contentApi.newsList("?fields=card_info&limit=9").then((resp) => {
      if (resp.success && resp.data) {
        setDataNews(resp.data.items as NewsArticle[]);
        setNewsCount(resp.data.meta.total_count);
      }
    });
  }, []);

  const handleUpdatePage = (number: string | number, showMore: boolean) => {
    contentApi
      .products(
        `?fields=card_info&limit=9&offset=${((number as number) - 1) * 9}`
      )
      .then((resp) => {
        if (resp.success) {
          resp.data &&
            (showMore
              ? setDataNews((prev) => [...prev, ...resp?.data?.items])
              : setDataNews(resp.data.items));
        }
      });
  };

  return (
    <div className="container">
      <Buttons
        ico={icons.ArrowLeft}
        text={"Вернуться в каталог"}
        onClick={() => navigate(RouteNames.HOMEPAGE)}
        className="backButton"
      />
      <h1 className="titlePage">Новости</h1>

      <div className="containerNews">
        {dataNews.length > 0
          ? dataNews.map((item) => {
              return <CardNews item={item} />;
            })
          : [...Array(9)].map((_, index) => (
              <Skeleton key={index} height={400} borderRadius={16} />
            ))}
      </div>

      <Pagination
        respData={Math.ceil(isNewsCount / 9)}
        handlePage={(number, showMore) => handleUpdatePage(number, showMore)}
        handleSearch={function (string: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default NewsPage;
