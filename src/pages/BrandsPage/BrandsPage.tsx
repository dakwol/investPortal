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

interface IBrands {
  id: number | string;
  name: string;
}

const BrandsPage: FC = () => {
  const brandsApi = new BrandApiRequest();
  const navigate = useNavigate();

  const [sortedBrands, setSortedBrands] = useState<{
    [key: string]: IBrands[];
  }>({});

  useEffect(() => {
    brandsApi.list().then((resp) => {
      if (resp.success && resp.data) {
        const sortedData = resp.data.results.sort(
          (a: { name: string }, b: { name: any }) =>
            a.name.localeCompare(b.name)
        );
        const brandsByLetter: { [key: string]: IBrands[] } = {};
        sortedData.forEach((brand: IBrands) => {
          const firstLetter = brand.name.charAt(0).toUpperCase();
          brandsByLetter[firstLetter] = brandsByLetter[firstLetter] || [];
          brandsByLetter[firstLetter].push(brand);
        });
        setSortedBrands(brandsByLetter);
      }
    });
  }, []);

  return (
    <div className="container">
      <Buttons
        ico={icons.ArrowLeft}
        text={"Вернуться в каталог"}
        onClick={() => navigate(RouteNames.HOMEPAGE)}
        className="backButton"
      />

      <h1 className="titlePage">Белгородские бренды</h1>

      <div className="containerBrands">
        {Object.entries(sortedBrands)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([letter, brands]) => (
            <div key={letter} className="brandsItem">
              <h6 className="titleBrands">{letter}</h6>
              {brands.map((brand) => (
                <p key={brand.id} className="nameBrands">
                  {brand.name}
                </p>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BrandsPage;
