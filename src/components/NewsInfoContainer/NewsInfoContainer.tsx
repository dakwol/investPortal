import React, { FC } from "react";
import { NewsArticle } from "../../models/INews";
import apiConfig from "../../api/apiConfig";
import ContentSlider from "../ContentSlider/ContentSlider";
import {
  formatDateIntlTimeDate,
  getFormat,
  getSize,
} from "../UI/functions/functions";
import "./styles.scss";
import icons from "../../assets/icons/icons";

interface IProps {
  dataCard: NewsArticle | undefined;
}

const NewsInfoContainer: FC<IProps> = ({ dataCard }) => {
  return (
    <div className="newsContainer">
      <h1 className="titlePage">{dataCard?.card_info.title}</h1>
      {dataCard?.card_info.date && (
        <h5 className="datePage">
          {formatDateIntlTimeDate(dataCard?.card_info.date)}
        </h5>
      )}
      {dataCard?.content.map((item, index) => {
        switch (item.type) {
          case "heading":
            return (
              <h1 key={index} className="headingTitle">
                {item.value}
              </h1>
            );
          case "paragraph":
            return (
              <p
                key={index}
                className="paragraph"
                dangerouslySetInnerHTML={{ __html: item.value }}
              />
            );
          case "quote":
            return (
              <div className="containerQuote">
                <p key={index} className="textQuote">
                  {
                    //@ts-ignore
                    item.value.text
                  }
                </p>
                <p key={index} className="quote">
                  {
                    //@ts-ignore
                    item.value.quote
                  }
                </p>
              </div>
            );
          case "documents":
            return (
              <div className="containerDocuments">
                {
                  //@ts-ignore
                  item.value.map((doc) => {
                    return (
                      <a
                        href={`${apiConfig.baseUrlMedia}${doc.url}`}
                        download={doc.title ? doc.title : "download"}
                        target="_blank"
                        className="docContainer"
                      >
                        <img src={icons.file} className="iconFile"></img>
                        <div className="docInfo">
                          <h6 className="docTitle">{doc.title}</h6>
                          <div className="docFooter">
                            <h6 className="docSize">{getSize(doc.size)}</h6>
                            <h6 className="docType">{getFormat(doc.url)}</h6>
                          </div>
                        </div>
                      </a>
                    );
                  })
                }
              </div>
            );
          case "imageblock":
            if (item.value.length > 1) {
              //@ts-ignore
              return <ContentSlider key={index} value={item.value} />;
            } else {
              return (
                <div>
                  <img
                    className="imageBlock"
                    //@ts-ignore
                    src={`${apiConfig.baseUrlMedia}${item.value[0].image.url}`}
                  ></img>
                  <p key={index} className="quote">
                    {
                      //@ts-ignore
                      item.value[0].quote
                    }
                  </p>
                </div>
              );
            }

          default:
            return null;
        }
      })}
    </div>
  );
};

export default NewsInfoContainer;
