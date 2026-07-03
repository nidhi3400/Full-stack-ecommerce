import React, { useState } from 'react'
import "./ImageSliderStyles.css"
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid"

const ImageSlider = ({ imageList }) => {

  /* State variable to store index of image currently being displayed in view */
  const [activeIndex, setActiveIndex] = useState(0);

  /* Function to set active index to next image in the list in cyclic manner */
  const loadNextImage = () => {
    setActiveIndex(activeIndex => (activeIndex + 1) % imageList?.length)
  }

  /* Function to set active index to previous image in the list in cyclic manner */
  const loadPrevImage = () => {
    setActiveIndex(activeIndex => (activeIndex - 1) < 0 ? imageList?.length - 1 : activeIndex - 1)
  }

  return (
    <div className='imgContainer'>
      {imageList.length > 1 && activeIndex !== 0 && (
        <div style={{ marginRight: '10%', marginTop: 50 }} >
          <ArrowLeftCircleIcon
            className='icon'
            onClick={() => loadPrevImage()}
          />
        </div>
      )}
      <img src={imageList[activeIndex]} alt="" />
      {imageList.length > 1 && activeIndex !== imageList.length - 1 && (
        <div style={{ marginLeft: '10%', marginTop: 50 }}>
          <ArrowRightCircleIcon
            className='icon'
            onClick={() => loadNextImage()}
          />
        </div>
      )}
    </div>
  )
}

export default ImageSlider
