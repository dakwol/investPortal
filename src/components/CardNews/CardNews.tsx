import React, { FC } from "react";
import { NewsArticle } from "../../models/INews";
import { formatDateIntlTimeDate } from "../UI/functions/functions";
import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../routes";
import "./styles.scss";

interface INewsItem {
  item: NewsArticle;
}

const CardNews: FC<INewsItem> = ({ item }) => {
  const navigation = useNavigate();
  return (
    <div
      key={item.id}
      className="newsCardContainer"
      onClick={() => navigation(`${RouteNames.NEWSINFO}/${item.slug}`)}
    >
      <img
        src={`${apiConfig.baseUrlMedia}${item.card_info.main_image}`}
        className="newsCardImg"
      ></img>

      <div className="newsInfoContainer">
        <p className="newsDate">
          {formatDateIntlTimeDate(item.card_info.date)}
        </p>
        <h2 className="newsTitle">{item.card_info.title}</h2>
        <h6 className="newsText">{item.card_info.description}</h6>
      </div>
    </div>
  );
};

export default CardNews;
