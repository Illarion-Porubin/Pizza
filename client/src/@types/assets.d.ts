// описываем типы для картинок

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: string | any;
  export default content;
}
