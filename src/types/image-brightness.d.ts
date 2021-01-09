declare module "image-brightness" {
  const imageBrightness: (options: {
    data: ImageData;
    adjustment: number;
  }) => Promise<ImageData>;

  export default imageBrightness;
}
