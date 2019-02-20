import { useState, useEffect } from 'react';
import debounce from 'debounce'

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', debounce(() => {
      setWidth(window.innerWidth);
    }, 500));
  }, [])

  return width;
}

export { useWindowWidth };
