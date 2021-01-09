declare module "image-filter-core" {
  const imageFilter: {
    convertImageDataToCanvasURL: (imageData: ImageData) => string;
  };

  export default imageFilter;
}
