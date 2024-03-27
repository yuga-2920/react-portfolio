import { useRef } from 'react'
import { useTransform, useScroll, motion } from "framer-motion";

const NUM_SECTIONS = 25
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`

// 再帰関数でのsectionの生成
const generateSections = ( count, color, rotate) => {
  if (count === NUM_SECTIONS) {
    return <></>
  }
  const nextColor = color === "black" ? "white" : "black"

  return (
    <Section
      rotate={rotate}
      background={color}
    >
      {generateSections(count + 1, nextColor, rotate)}
    </Section>
  )
}

// 各セクションのレイアウト
const Section = ({ background, rotate, children }) => {
  return (
    <motion.div
      className='relative h-full w-full origin-center'
      style={{
        background,
        rotate,
        padding: PADDING
      }}
    >
      {children}
    </motion.div>
  )
}

// ボックス全体のレイアウト
const Trippy = ({ rotate }) => {
  return (
    <div className='absolute inset-0 overflow-hidden bg-black'>
      {generateSections(0, "black", rotate)}
    </div>
  )
}

export const ScrollEffect = () => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "90deg"])

  return (
    <>
      <h2 className='text-7xl font-normal text-center mt-20 mb-10'>
        FVのアニメーション
      </h2>
      <div ref={targetRef}>
        <div className='relative z-0 h-[800vh]'>
          <div className='sticky top-0 h-screen bg-red-500'>
            <Trippy rotate={rotate}/>
          </div>
        </div>
      </div>
    </>
  )
}