import React, { FC, useState } from "react";
import { IProduct } from "../../models/IProduct";
import { Link } from "react-router-dom";
import { Galleria } from "primereact/galleria";
import apiConfig from "../../api/apiConfig";
import "./styles.scss";
import icons from "../../assets/icons/icons";
import { RouteNames } from "../../routes";

interface IProductProps {
  productItem: IProduct;
}

const ProductCard: FC<IProductProps> = ({ productItem }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const cardImage = (img: { image: string }) => {
    return (
      <div className="carousel-image">
        <img
          src={`${apiConfig.baseUrlMedia}${img.image}`}
          alt="product image"
        />
      </div>
    );
  };

  const numericIndicatorTemplate = (index: number) => {
    return <span className={`indicatorContainerItem`}></span>;
  };

  return (
    <Link to={`${RouteNames.CARDINFO}/${productItem.slug}`}>
      <div key={productItem.id} className="productCardContainer">
        {productItem.card_info.gallery_images.length === 0 ? (
          <img src={icons.nophoto} alt="product image" />
        ) : (
          <Galleria
            value={productItem.card_info.gallery_images}
            className="custom-indicator-galleria"
            showThumbnails={false}
            showIndicators
            changeItemOnIndicatorHover
            showIndicatorsOnItem
            indicatorsPosition="bottom"
            item={cardImage}
            indicator={numericIndicatorTemplate}
            activeIndex={activeIndex}
            onItemChange={(e) => setActiveIndex(e.index)}
          />
        )}
        <div className="image-indicators">
          {productItem.card_info.gallery_images.map((image, index) => (
            <div
              className={`image-indicator ${
                index === activeIndex ? "active" : ""
              }`}
              key={index}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <h5 className="productCardBrand">{productItem.card_info.brand}</h5>
        <h1 className="productCardTitle">{productItem.card_info.name}</h1>
        <b className="productCardPrice">{`${productItem.card_info.price} ₽`}</b>
      </div>
    </Link>
  );
};

export default ProductCard;
