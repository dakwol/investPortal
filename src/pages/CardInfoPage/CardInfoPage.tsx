import React, { FC, useEffect, useState } from "react";
import CardInfoContainer from "../../components/CardInfoContainer/CardInfoContainer";
import { useParams } from "react-router-dom";
import ContentApiRequest from "../../api/ContentApi/ContentApi";
import { IProduct } from "../../models/ICardInfo";

const CardInfoPage: FC = () => {
  const { slug } = useParams();
  const contentApi = new ContentApiRequest();

  const [dataCard, setDataCard] = useState<IProduct>();

  useEffect(() => {
    contentApi.products(slug).then((resp) => {
      if (resp.success) {
        resp.data && setDataCard(resp.data as IProduct);
      }
    });
  }, []);

  return (
    <div className="container">
      <CardInfoContainer dataCard={dataCard} />
    </div>
  );
};

export default CardInfoPage;
