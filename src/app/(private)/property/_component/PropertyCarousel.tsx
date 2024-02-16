import { Carousel } from "antd";
import Image from "next/image";

const PropertyCarousel = ({ images }: { images: string[] }) => (
  <Carousel>
    {images.map((image, index) => (
      <div key={index} className="relative w-full h-96 lg:h-[450px]">
        <Image
          src={image}
          alt="property-image"
          fill
          style={{ objectFit: "cover" }}
          sizes="80%"
          placeholder="blur"
          blurDataURL={
            images.length > 0 ? images[0] : "https://via.placeholder.com/300"
          }
          className="rounded"
        />
      </div>
    ))}
  </Carousel>
);

export default PropertyCarousel;
