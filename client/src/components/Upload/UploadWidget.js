import React from "react";
//////////////////////////Cloudinary//////////////////////////////
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
// Import required actions and qualifiers.
// import { thumbnail } from "@cloudinary/url-gen/actions/resize";
// import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
// import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
// import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { useDispatch } from "react-redux";
import { fetchAvatar } from "../../redux/slices/authSlice";
import { selectAuthData } from "../../redux/selectors";
import { useCustomSelector } from "../../hooks/store";
import s from "./UploadWidget.module.scss";

export const UploadWidget = ({color}) => {
  const dispath = useDispatch();
  const userAuth = useCustomSelector(selectAuthData);
  const cloudinaryRef = React.useRef();
  const widgetRef = React.useRef();
  const [avatar, setAvatar] = React.useState("");
  ////////////////////////////////Cloudinary//////////////////////////////////////
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dnuwkgxym",
    },
  });

  React.useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnuwkgxym",
        uploadPreset: "qsce39om",
      },
      function (error, result) {
        try {
          const publicId = result.info.public_id;
          if (result.info.public_id) {
            dispath(fetchAvatar({ id: userAuth?.data?._id, publicId }));
            setAvatar(publicId);
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
    if (userAuth?.data?.publicId) {
      setAvatar(userAuth?.data?.publicId);
    }
  }, [dispath, userAuth?.data?.publicId, userAuth?.data?._id, color]);

  const myImage = cld.image(avatar);

  return avatar ? (
    <>
      <AdvancedImage
        className={s.photo}
        cldImg={myImage}
        onClick={() => widgetRef.current.open()}
        style={{ borderColor: color }}
      />
    </>
  ) : (
    <>
      <button onClick={() => widgetRef.current.open()}>Добавить фото</button>
    </>
  );
};
