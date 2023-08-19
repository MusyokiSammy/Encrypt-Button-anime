import React, { useState, useRef} from 'react'
import { motion } from 'framer-motion'

const TARGET_TEXT = 'Encrypt data'
const CYCLE_PER_LETTER = 2
const SHUFFLE_TIME = 50

const CHARS = '!@#$%^&*():{};|,.<>/?';

function App() {
  return (
    <div className="grid h-screen place-content-center bg-slate-900">
      <Encryptbutton/>
    </div>
  );
}

export default App;


const Encryptbutton = () => {
  const intervalRef = useRef(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble =() => {
    let pos = 0;
    
      intervalRef.current = setInterval(() => {
        const scrambled = TARGET_TEXT.split("").map((char, index) => {
          if (pos / CYCLE_PER_LETTER > index) {
            return char
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar
        }).join("")

        setText(scrambled)
        pos++;

        if (pos >= TARGET_TEXT.length * CYCLE_PER_LETTER) {
          stopScramble()
        }
      }, SHUFFLE_TIME)
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined)

    setText(TARGET_TEXT)
  }
  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="group relative border-[1px] px-4 py-2 font-mono font-medium uppercase text-slate-300 transition-colors hover:text-indigo-300 rounded-lg border-slate-500 overflow-hidden "
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
}