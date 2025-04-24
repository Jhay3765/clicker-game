import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface MoneyParticle {
  id: string
  amount: number
  x: number
  y: number
  targetX: number
  targetY: number
  opacity: number
  scale: number
}

interface MoneyAnimationProps {
  particles: MoneyParticle[]
  removeParticle: (id: string) => void
}

const MoneyAnimation = ({ particles, removeParticle }: MoneyAnimationProps) => {
  return createPortal(
    <>
      {particles.map((particle) => (
        <MoneyParticle 
          key={particle.id} 
          particle={particle} 
          onComplete={() => removeParticle(particle.id)} 
        />
      ))}
    </>,
    document.body
  )
}

interface MoneyParticleProps {
  particle: MoneyParticle
  onComplete: () => void
}

const MoneyParticle = ({ particle, onComplete }: MoneyParticleProps) => {
  const [position, setPosition] = useState({
    x: particle.x,
    y: particle.y,
    opacity: 1,
    scale: 1
  })

  useEffect(() => {
    // Initial small random movement
    const initialTimer = setTimeout(() => {
      setPosition({
        x: particle.x + (Math.random() * 40 - 20),
        y: particle.y - 20 - Math.random() * 30,
        opacity: 1,
        scale: 1.2
      })
    }, 50)

    // Move to target position
    const timer = setTimeout(() => {
      setPosition({
        x: particle.targetX,
        y: particle.targetY,
        opacity: 0,
        scale: 0.8
      })
      
      // Remove particle after animation completes
      setTimeout(onComplete, 500)
    }, 500)

    return () => {
      clearTimeout(timer)
      clearTimeout(initialTimer)
    }
  }, [particle, onComplete])

  return (
    <div
      className="fixed pointer-events-none z-50 font-bold text-yellow-400 drop-shadow-lg"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${position.scale})`,
        opacity: position.opacity,
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      +${particle.amount}
    </div>
  )
}

export default MoneyAnimation
