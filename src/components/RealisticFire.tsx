import React from 'react';
// @ts-ignore (in case TS complains about mp4, we already have vite-env.d.ts but just in case)
import campfireVideo from '../assets/campfire_video.mp4';

export default function RealisticFire() {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex justify-center items-center pointer-events-none">
      {/* Base Ambient Glow for extra immersion */}
      <div 
        className="absolute w-56 h-56 bg-[#FF5722] rounded-full blur-[80px] mix-blend-screen opacity-50" 
      />
      
      {/* 
        Hardware Accelerated Video Fire 
        - mix-blend-screen removes pure black
        - object-cover forcibly crops the left and right sides of the 16:9 video
        - mask-image feathers the edges so any compression artifacts don't form a harsh rectangle 
      */}
      <video 
        src={campfireVideo} 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute w-full h-full object-cover mix-blend-screen"
        style={{
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
        }}
      />
    </div>
  );
}
