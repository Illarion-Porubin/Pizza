import React from "react";
//////////////////////////Cloudinary//////////////////////////////
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useDispatch } from "react-redux";
import { selectAuthData } from "../../redux/selectors";
import { useCustomSelector } from "../../hooks/store";
import s from "./UploadWidget.module.scss";

export const UploadWidget = ({ color, publickId }) => {
  const dispath = useDispatch();
  const userAuth = useCustomSelector(selectAuthData);
  const cloudinaryRef = React.useRef();
  const widgetRef = React.useRef();
  const [avatar, setAvatar] = React.useState("");
  const [border, setBorder] = React.useState("");

  console.log(avatar, 'avatar')

  const userAvatar = React.useMemo(() => {
    return avatar;
  }, [avatar]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dnuwkgxym",
    },
  });

  React.useEffect(() => {
    if (!avatar && userAuth?.data?.publicId) {
      setAvatar(userAuth?.data?.publicId);
    }
    setBorder(color);
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnuwkgxym",
        uploadPreset: "qsce39om",
      },
      function (error, result) {
        try {
          const publicId = result.info.public_id;
          console.log(result.info.public_id, 'result.info.public_id')
          if (result.info.public_id) {
            setAvatar(publicId);
            publickId(publicId);
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }, [
    dispath,
    userAuth?.data?.publicId,
    userAuth.data?.color,
    userAuth?.data?._id,
    avatar,
    border,
    userAuth,
    color,
    publickId,
  ]);

  const myImage = cld.image(userAvatar);

  return avatar ? (
    <>
      <AdvancedImage
        className={s.photo}
        cldImg={myImage}
        onClick={() => widgetRef.current.open()}
        style={{ borderColor: border }}
      />
    </>
  ) : (
    <>
      <button onClick={() => widgetRef.current.open()}>Добавить фото</button>
    </>
  );
};
