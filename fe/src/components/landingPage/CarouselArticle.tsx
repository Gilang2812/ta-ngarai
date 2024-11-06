'use client'

import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { NextButton, PrevButton } from '@/components/landingPage/CarouselButtons'
 
const images = [{
  src: '/images/carousel-1.jpg',
  alt: 'First slide',
},{
  src: '/images/carousel-2.jpg',
  alt: 'Second slide',
},{
  src: '/images/carousel-2.jpg',
  alt: 'Third slide',
}]

const CarouselArticle = () => {
  const sliderRef = useRef<Slider | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const next = () => {
    sliderRef.current?.slickNext()
  }

  const previous = () => {
    sliderRef.current?.slickPrev()
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex)
    },
    appendDots: (dots:React.ReactNode) => (
      <div
        style={{
          backgroundColor: 'transparent',
          borderRadius: '10px',
          padding: '25px'
        }}
      >
        <ul style={{ margin: '20px ' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className={`${i === currentSlide ?'bg-primary border-primary' :'border-white'} p-1 border `}>
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "100%",
          border: "2px solid inset  transparent",
          backgroundColor: i === currentSlide ? "white" : "white",
          transition: "background-color 0.3s ease",
        }}
      />
      </div>

    ),
  }

  return (
    <div className='bg-blue-500 relative col-span-1'>
      <div className='z-10 mt-20 bottom-0 text-white absolute left-1/2 transform translate-x-[-50%] translate-y-[-50%] space-x-40'>
        <PrevButton onClick={previous} />
        <NextButton onClick={next} />
      </div>
      <div className='relative z-0'>
        <Slider
          ref={slider => {
            sliderRef.current = slider
          }}
          {...settings}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              className='h-full'
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default CarouselArticle
