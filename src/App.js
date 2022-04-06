import { useRef, useLayoutEffect } from 'react'
import './App.css';
import Scene from './components/Scene.js'
import Text from './components/Text.js'

function App() {

  return (
    <>
      <Scene />
      <Text />
    </>
  );
}

export default App;

/**
 *  checks if DOM is ready to prevent bugs and support SSR
 */
const isBrowser = typeof window !== 'undefined'

/**
 *  gets the current scroll position 
 */
const getScrollPosition = ({ element, useWindow }) => {

  // check if running in browser else return {x: 0, y: 0} default values 
  if (!isBrowser) return { x: 0, y: 0 }

  /**
   * checks if user requested scroll position from window or element
   */
  const target = element ? element.current : document.body


  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

const useScrollPosition = (effect, deps, element, useWindow, wait) => {
  const position = useRef(getScrollPosition({ useWindow }))

  let throttleTimeout = null

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow })
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout = null
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}
