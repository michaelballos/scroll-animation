import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

const Shape = () => {
  const mesh = useRef()

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.z += 0.01
    mesh.current.rotation.y += 0.005
  })


  return (
    <mesh ref={mesh}>
      <capsuleGeometry attach="geometry" args={[1, 1, 32]} />
      <meshLambertMaterial wireframe attach="material" color="red" />
    </mesh>
  )
}

const Scene = () => {
  return (
    <Canvas>
      <OrbitControls />
      <Shape />
    </Canvas>
  )
}

export default Scene