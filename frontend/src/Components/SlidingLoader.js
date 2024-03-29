import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import "./SlidingLoader.css";


export default function SlidingLoader({length}) { 
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    
      <LinearProgress 
      className="progress"
      style={{
          position:"absolute", 
          top:"41px", 
          width: `${length === undefined ? '552' : length}px`,
          zIndex:"1500", 
       }} variant="determinate" value={progress} />

  );
}