precision highp float;
 
uniform float uTime;
uniform float uSpeed;
uniform float uScroll;
// uniform float uScale;
 
varying vec2 vUv;
 
void main() {
  vUv = uv;
 
  vec3 p = position;
  p.z = (sin(p.x + uTime) * .09 + cos(p.y + uTime) * .09);
  // (uv-.5)*uScale+.5
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}