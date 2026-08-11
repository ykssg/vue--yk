import CarouselComponent from './src/Carousel.vue'
import ImageComponent from './src/Image.vue'
import { withInstall } from '../../../utils/withInstall'

const YkCarousel = withInstall(CarouselComponent)
const YkImage = withInstall(ImageComponent)

export {
  YkCarousel,
  YkImage
}

export default YkCarousel
