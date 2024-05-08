import React, { FC } from "react";
import { IProduct } from "../../models/ICardInfo";
import { Galleria } from "primereact/galleria";
import apiConfig from "../../api/apiConfig";
import "./styles.scss";
import ProductCard from "../ProductCard/ProductCard";
import { CardInfo } from "../../models/IProduct";
import Buttons from "../Buttons/Buttons";
import icons from "../../assets/icons/icons";

interface IProps {
  dataCard: IProduct | undefined;
}

const CardInfoContainer: FC<IProps> = ({ dataCard }) => {
  console.log(dataCard);

  const itemTemplate = (img: { image: string }) => {
    console.log(img);

    return (
      <img
        src={`${apiConfig.baseUrlMedia}${img.image}`}
        className="activeImage"
      ></img>
    );
  };
  const thumbnailTemplate = (item: { image: string }) => {
    return (
      <div className="imageThumbContainer">
        <img
          src={`${apiConfig.baseUrlMedia}${item.image}`}
          className="imageThumb"
        />
      </div>
    );
  };

  return (
    <div>
      <h1 className="cardInfoTitle">{dataCard?.card_info.name}</h1>
      <div className="cardInfoContainer">
        <div className="cardInfoBlock">
          <Galleria
            className="galeryInfo"
            //@ts-ignore
            value={dataCard?.gallery_images?.gallery_images}
            numVisible={5}
            item={itemTemplate}
            thumbnailsPosition={"left"}
            thumbnail={thumbnailTemplate}
          />
          <div>
            <h3>Описание</h3>
            {dataCard?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: dataCard.description }}
                className="desctiptionText"
              />
            )}
          </div>
        </div>
        <div className="cardInfoBlock">
          <div className="haracterLinkContainer">
            <div className="haracterContainer">
              <h3>Характеристики</h3>
              {dataCard?.characteristics.map((item) => {
                return (
                  <div className="haracterItem">
                    <h5>{item.name}</h5>
                    <p>{item.value}</p>
                  </div>
                );
              })}
            </div>
            <div className="linkInfoContianer">
              {dataCard?.brand && (
                <h2 className="linkInfoBrand">{dataCard?.brand?.name}</h2>
              )}
              {dataCard?.price && (
                <h2 className="linkInfoPrice">
                  {`от `} <b>{`${dataCard.price} ₽`}</b>
                </h2>
              )}
              <h5 className="subTitle">Где приобрести:</h5>
              {[
                {
                  text: "Сайт бренда",
                  link: dataCard?.brand_website_link,
                  style: "linkWebsite",
                },
                {
                  text: "МегаМаркет",
                  icon: icons.Megamarket,
                  link: dataCard?.megamarket_link,
                  rightIco: icons.arrowUpRight,
                },
                {
                  text: "Ozon",
                  icon: icons.Ozon,
                  link: dataCard?.ozon_link,
                  rightIco: icons.arrowUpRight,
                },
                {
                  text: "Яндекс.Маркет",
                  icon: icons.Market,
                  link: dataCard?.yandex_market_link,
                  rightIco: icons.arrowUpRight,
                },
                {
                  text: "Wildberries",
                  icon: icons.Wb,
                  link: dataCard?.wildberries_link,
                  rightIco: icons.arrowUpRight,
                },
              ].map(
                (button, index) =>
                  button.link && (
                    <Buttons
                      key={index}
                      ico={button.icon}
                      rightIco={button.rightIco}
                      stileRightIco={"rightIco"}
                      text={button.text}
                      className={`buttonLink ${button.style}`}
                      onClick={() => window.open(button.link, "_blank")}
                    />
                  )
              )}
              <p className="subText">
                Правила доставки и возврата по условиям платформы, через которую
                вы оформляете заказ.
              </p>
            </div>
          </div>
          <div>
            <h3>Еще от бренда</h3>
            <div className="listCardInfo">
              {dataCard?.other_products &&
                dataCard.other_products.map((item, index) => {
                  return (
                    <ProductCard
                      //@ts-ignore
                      productItem={{ card_info: item, slug: item.slug }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfoContainer;
