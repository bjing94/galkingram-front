export default function getImageSize(
  url: string,
  callback: (width: number, height: number) => void
) {
  var img = new Image();
  img.addEventListener("load", function () {
    callback(this.naturalWidth, this.naturalHeight);
  });
  img.src = url;
}
