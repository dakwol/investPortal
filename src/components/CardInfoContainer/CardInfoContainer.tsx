import React, { FC } from "react";
import { IProduct } from "../../models/ICardInfo";
import { Galleria } from "primereact/galleria";
import apiConfig from "../../api/apiConfig";
import "./styles.scss";

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
      <h1>{dataCard?.card_info.name}</h1>
      <div className="cardInfoContainer">
        <div>
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
              <div dangerouslySetInnerHTML={{ __html: dataCard.description }} />
            )}
          </div>
        </div>
        <div>1</div>
      </div>
    </div>
  );
};

export default CardInfoContainer;
