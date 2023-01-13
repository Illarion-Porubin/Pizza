import React, { useCallback } from "react";
//////////////////////////Cloudinary//////////////////////////////
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { selectAuthData } from "../../redux/selectors";
import { useCustomSelector, useCustomDispatch } from "../../hooks/store";
import { fetchDeleteAvatar, fetchUpdate } from "../../redux/slices/authSlice";
import s from "./UploadWidget.module.scss";


export const UploadWidget = ({ color }) => {
  const dispatch = useCustomDispatch();
  const userAuth = useCustomSelector(selectAuthData);
  const cloudinaryRef = React.useRef();
  const widgetRef = React.useRef();
  const [avatar, setAvatar] = React.useState("");

  // const userAvatar = React.useMemo(() => {
  //   return avatar;
  // }, [avatar]);
 

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
          const publicId = result.info.public_id;
          if (publicId) {
            setAvatar(publicId);
            dispatch(fetchDeleteAvatar(userAuth.data?.publicId))
            setTimeout(() => {
              dispatch(fetchUpdate({email: userAuth?.data?.email, publicId})); 
            }, 1000)
          }
        } catch (e) {
          console.log(error);
        }
      }
    )
    widgetRef.current.open()
  },[dispatch, userAuth?.data?.email, userAuth.data?.publicId])

  React.useEffect(() => {
    if (!avatar && userAuth?.data?.publicId) {
      setAvatar(userAuth?.data?.publicId);
    }
  }, [
    dispatch,
    userAuth?.data?.publicId,
    avatar,
    userAuth,
  ]);

  const myImage = cld.image(avatar).format('auto').quality('auto');

  return avatar ? (  
    <>
      <AdvancedImage
        className={s.photo}
        onClick={() => upload()}
        style={{color}}
        cldImg={myImage} plugins={[placeholder({mode: 'vectorize'})]}
      />
    </>
  ) : (
    <>
      <button onClick={() => widgetRef.current.open()}>Добавить фото</button>
    </>
  );
};
