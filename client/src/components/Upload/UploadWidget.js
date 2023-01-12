import React, { useCallback } from "react";
//////////////////////////Cloudinary//////////////////////////////
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useDispatch } from "react-redux";
import { selectAuthData } from "../../redux/selectors";
import { useCustomSelector } from "../../hooks/store";


import s from "./UploadWidget.module.scss";

export const UploadWidget = ({ color, getPublicId }) => {
  const dispath = useDispatch();
  const userAuth = useCustomSelector(selectAuthData);
  const cloudinaryRef = React.useRef();
  const widgetRef = React.useRef();
  const [avatar, setAvatar] = React.useState("");
  const [border, setBorder] = React.useState("");


  const userAvatar = React.useMemo(() => {
    return avatar;
  }, [avatar]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dnuwkgxym",
    },
  });
  
  const upload = useCallback(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnuwkgxym",
        uploadPreset: "qsce39om",
        sources: [
          "local",
          "camera",
          "google_drive",
          "url"
        ],
      }, 
      function (error, result) {
        try {
          console.log(result.info)
          const publicId = result.info.public_id;
          if (publicId) {
            setAvatar(publicId);
            getPublicId(publicId);
          }
        } catch (e) {
          console.log(error);
        }
      }
    )
    widgetRef.current.open()
  },[getPublicId])

  React.useEffect(() => {
    if (!avatar && userAuth?.data?.publicId) {
      setAvatar(userAuth?.data?.publicId);
    }
    setBorder(color);
  }, [
    dispath,
    userAuth?.data?.publicId,
    userAuth.data?.color,
    userAuth?.data?._id,
    avatar,
    border,
    userAuth,
    color,
    getPublicId,
  ]);

  const myImage = cld.image(userAvatar).format('auto').quality('auto');

  return avatar ? (  
    <>
      <AdvancedImage
        className={s.photo}
        onClick={() => upload()}
        style={{ borderColor: border }}
        cldImg={myImage} plugins={[placeholder({mode: 'vectorize'})]}
      />
    </>
  ) : (
    <>
      <button onClick={() => widgetRef.current.open()}>Добавить фото</button>
    </>
  );
};
