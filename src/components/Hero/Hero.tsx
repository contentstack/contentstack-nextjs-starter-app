import React from 'react'

import Image from 'next/image'

export interface HeroProps {
  title: string
  description: string
  url: string
  cta_text: string
}

export default function Hero(props: HeroProps): JSX.Element {
  console.log('hero props', props)
  const { title, description, url, cta_text } = props

  return (
    <div className="relative w-full h-full pb-10">
      <div className="relative px-4 xl:px-0 container mx-auto md:flex items-center gap-8">
        <div className="text-color w-full md:w-1/3 pt-16 lg:pt-36">
          <h1 className="text-7xl w-1/2 xl:w-full xl:text-9xl font-black f-f-l">
            {title}
          </h1>
          <div className="f-f-r text-xl lg:text-3xl pb-20 sm:pb-0 pt-10 xl:pt-20">
            <h2>{description}</h2>
          </div>
          <a href={url} target="_blank" rel="noreferrer">
            <button className="hover:opacity-90 text-xl w-full xl:text-3xl xl:w-11/12 mt-4 xl:mt-11 f-f-r py-6 bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">
              {cta_text}
            </button>
          </a>
        </div>
        <Image
          src="https://i.ibb.co/9GMTkW3/desktop.png"
          className="w-full mt-8 md:mt-0 object-fill md:w-2/3 md:-ml-4 lg:-ml-4 xl:ml-0"
          alt="sample page"
          role="img"
          height="674"
          width="901"
        />
      </div>
    </div>
  )
}
