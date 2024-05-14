import React, { FC, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RouteNames } from "../../routes";
import icons from "../../assets/icons/icons";
import Buttons from "../Buttons/Buttons";
import "./styles.scss";
import Modal from "../Modal/Modal";
import BrandApiRequest from "../../api/BrandApi/BrandApi";
import { fieldToArray } from "../UI/functions/functions";
import FormInput from "../FormInput/FormInput";

interface RegisterData {
  name: string;
  registration_address: string;
  inn: string;
  fio_applicant: string;
  phone: string;
  email: string;
}

interface IOptionRegister {
  register: RegisterData;
}

const Footer: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDataOptionRegister, setDataOptionRegister] =
    useState<IOptionRegister>();
  const [isContentOverflowing, setContentOverflowing] = useState(false);
  const brandApi = new BrandApiRequest();

  console.log("isContentOverflowing", isContentOverflowing);

  useEffect(() => {
    if (isOpenModal) {
      brandApi.options().then((resp) => {
        if (resp.success) {
          resp.data &&
            setDataOptionRegister(
              resp?.data?.actions?.register as IOptionRegister
            );
        }
      });
    }
  }, [isOpenModal]);

  return (
    <Fragment>
      <Modal
        content={
          <div className="modalContainer">
            <h1>Заявка для размещения на платформе</h1>
            {isDataOptionRegister &&
              fieldToArray(isDataOptionRegister).map((item) => {
                return (
                  <FormInput
                    style={""}
                    key={item.key}
                    value={undefined}
                    onChange={function (
                      value: string,
                      isChecked?: boolean | undefined
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                    subInput={item.value.label}
                    required={item.value.required}
                    error={""}
                    type={item.value.type}
                    keyData={""}
                  />
                );
              })}
            <Buttons
              text={"Отправить"}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <span>
              Нажимая «Отправить» вы соглашаетесь с политикой обработки
              персональных данных
            </span>
          </div>
        }
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
      <footer
        className={`footer ${!isContentOverflowing ? "footerFixed" : ""}`}
      >
        <div className="container">
          <div className="footerContainer">
            <div>
              <Link to={RouteNames.HOMEPAGE}>
                <div className="logoContainer">
                  <img src={icons.Logo} className="logoImg" />
                  <h1 className="logoTitle">
                    Департамент экономики администрации города Белгорода
                  </h1>
                </div>
              </Link>
              <p>Белгород, Гражданский проспект, 38</p>
            </div>
            <h5 className="buttonFooter">Бренды</h5>
            <h5 className="buttonFooter">Бизнесу</h5>
            <h5 className="buttonFooter">Новости</h5>
            <div className="lastColumn">
              <p>По вопросам работы портала</p>
              <a href="tel:+7 (4722) 27-72-06" className="footerPhone">
                +7 (4722) 27-72-06
              </a>
              <Buttons
                text={"Заявка на размещение"}
                onClick={() => setIsOpenModal(true)}
                className="buttonApplicantPlatform"
              />
            </div>
          </div>
          <div className="footerBottomContainer">
            <text className="logoIndicator">
              2024 <img src={icons.indicator}></img> <b>Индикатор</b>
            </text>
            <a href="">Политика конфеденциальности</a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
