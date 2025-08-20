/**
 * Problem 2: Particle Chamber Animation
 * @param initialPosition - String representing initial particle positions (R=right, L=left, .=empty)
 * @param speed - Number of positions each particle moves per step
 * @returns Array of strings representing each animation step
 */
export function animate(initialPosition: string, speed: number): string[] {
  const result: string[] = [];
  const length = initialPosition.length;

  // Parse initial particles with their positions and directions
  const particles: { position: number; direction: 'L' | 'R' }[] = [];

  for (let i = 0; i < initialPosition.length; i++) {
    if (initialPosition[i] === 'L') {
      particles.push({ position: i, direction: 'L' });
    } else if (initialPosition[i] === 'R') {
      particles.push({ position: i, direction: 'R' });
    }
  }

  // Simulate animation steps
  let currentParticles = [...particles];

  while (currentParticles.length > 0) {
    // Create chamber representation for current step
    const chamber = new Array(length).fill('.');

    // Count particles at each position (for when multiple particles pass through same position)
    const positionCount = new Map<number, number>();

    for (const particle of currentParticles) {
      if (particle.position >= 0 && particle.position < length) {
        positionCount.set(particle.position, (positionCount.get(particle.position) || 0) + 1);
      }
    }

    // Mark positions with particles as 'X'
    for (const [position, count] of positionCount) {
      if (count > 0) {
        chamber[position] = 'X';
      }
    }

    result.push(chamber.join(''));

    // Move particles for next step
    currentParticles = currentParticles
      .map(particle => ({
        ...particle,
        position: particle.direction === 'R'
          ? particle.position + speed
          : particle.position - speed
      }))
      .filter(particle => particle.position >= 0 && particle.position < length);
  }

  // Add final empty chamber state
  result.push('.'.repeat(length));

  return result;
}
