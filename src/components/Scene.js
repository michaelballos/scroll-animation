import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper, Stars } from '@react-three/drei'
import { useRef } from 'react'
import { PointLightHelper } from 'three'

const Capsule = () => {
  const mesh = useRef()

  useFrame(() => {
    const t = document.body.getBoundingClientRect().top
    mesh.current.rotation.x = Math.sin(t * 0.1)
  })
  return (
    <>
      <mesh ref={mesh}>
        <capsuleGeometry attach='geometry' args={[1, 3, 30]} />
        <meshLambertMaterial wireframe attach='material' color='white' />
      </mesh>
    </>
  )
}
const Lighting = () => {
  const light = useRef()
  useHelper(light, PointLightHelper)

  return (
    <>
      <ambientLight intensity={0.01} />
      <pointLight ref={light} position={[0, -25, 10]} />
    </>
  )
}

const Scene = () => {
  return (
    <Canvas>
      <gridHelper args={[20, 20, 'white', 'red']} />
      <Stars />
      <Lighting />
      <Capsule />
    </Canvas>
  )
}

export default Scene
