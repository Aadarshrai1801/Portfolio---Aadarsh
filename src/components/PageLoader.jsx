import React from 'react';
import { useTransition } from '../context/TransitionContext';

export default function PageLoader() {
  const {
    isLoaderVisible,
    loaderClipPath,
    isWelcomeSequence,
    currentGreeting,
    activeWord
  } = useTransition();

  if (!isLoaderVisible) return null;

  const displayWord = isWelcomeSequence ? currentGreeting : activeWord;

  return (
    <div className={`page-loader-container ${isLoaderVisible ? 'active' : ''}`}>
      <div
        className="page-loader-screen"
        style={{
          clipPath: loaderClipPath,
          WebkitClipPath: loaderClipPath
        }}
      >
        <div className="page-loader-words">
          {displayWord && (
            <div className="page-loader-word visible">
              <span>{displayWord}</span>
              <span className="dot"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
