import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper, Stars } from '@react-three/drei'
import { useRef } from 'react'
import { PointLightHelper } from 'three'

const Capsule = () => {
  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.z += 0.01
    mesh.current.rotation.y += 0.005
  })

  return (
    <mesh ref={mesh}>
      <capsuleGeometry attach="geometry" args={[1, 3, 30]} />
      <meshLambertMaterial wireframe attach="material" color='white' />
    </mesh>
  )
}

const Lighting = () => {
  const light = useRef()
  useHelper(light, PointLightHelper)

  return (
    <>
      <ambientLight
        intensity={0.01}
      />
      <pointLight
        ref={light}
        position={[0, -25, 10]}
      />
    </>
  )
}


const Scene = () => {

  return (
    <div className='sceneContainer'>
      <Canvas
        camera={{
          position: [0, 5, 5],
          fov: 75,
        }}
      >
        <gridHelper
          args={[20, 20, 'white', 'red']}
        />
        <Stars />
        <Lighting />
        <Capsule />
      </Canvas>
    </div>
  )
}

export default Scene