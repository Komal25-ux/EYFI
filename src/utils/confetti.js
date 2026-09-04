import confetti from 'canvas-confetti';

/**
 * Triggers a rich burst of celebration confetti
 */
export function triggerConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#FF4522', '#FFB703', '#10B981']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#3B82F6', '#8B5CF6', '#EC4899']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#FF4522', '#FFD166', '#06D6A0']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#FF6B6B', '#48DBFB', '#1DD1A1']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
}

/**
 * Milestone unlock fireworks
 */
export function triggerMilestoneUnlockConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
