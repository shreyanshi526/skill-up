'use client'
import React, { FC, ReactNode } from "react"
import Marquee from "react-fast-marquee"

export enum DirectionEnum { 
  Left = 'left',
  Right = 'right'
}

interface MarqueeProps {
  direction: DirectionEnum
  speed: number
  loop?: number
  delay?: number
  gradient?: boolean
  gradientColor?: string,
  gradientWidth: number,
  icons: ReactNode[]
}

const MarqueeComponent: FC<MarqueeProps> = ({
  direction,
  speed,
  loop,
  delay,
  gradient,
  gradientColor,
  gradientWidth,
  icons
}) => {
  return (
    <Marquee
      direction={direction}
      speed={speed}
      loop={loop}
      delay={delay}
      gradient={gradient}
      gradientColor={gradientColor}
      gradientWidth = {gradientWidth}
    >
      {icons.map((icon, index) => (
        <div key={index} className="mx-4">{icon}</div>
      ))}
    </Marquee>
  )
}

export default MarqueeComponent;
