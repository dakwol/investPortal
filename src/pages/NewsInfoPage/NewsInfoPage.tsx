import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentApiRequest from "../../api/ContentApi/ContentApi";
import { NewsArticle } from "../../models/INews";
import NewsInfoContainer from "../../components/NewsInfoContainer/NewsInfoContainer";

const NewsInfoPage: FC = () => {
  const { slug } = useParams();
  const contentApi = new ContentApiRequest();

  const [dataCard, setDataCard] = useState<NewsArticle>();

  useEffect(() => {
    contentApi.newsList(slug).then((resp) => {
      if (resp.success) {
        resp.data && setDataCard(resp.data as NewsArticle);
        window.scrollTo(0, 0);
      }
    });
  }, [slug]);

  return (
    <div className="container">
      <NewsInfoContainer dataCard={dataCard} />
    </div>
  );
};

export default NewsInfoPage;
