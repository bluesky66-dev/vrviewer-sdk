import {
  enterFullScreen,
  exitFullScreen, isFunction, loadImage
} from '@/common/utils'
import CommonViewer from '@/common/common-viewer.js'
import aframeConstants from '@/aframeViewer/aframe-constants'

let _el
let _sceneEl
let _assetsEl
let _skyEl
let _cameraContainerEl
let _cameraEl
let _cameraAnimationEl
let _cameraStartRotation

class AframeViewer extends CommonViewer {
  constructor () {
    super(...arguments)
    this.checkAframe()
    this.cameraRotation = {}
  }

  generateAframe (config = { disableVR: false, autoRotate: {} }) {
    _sceneEl = document.createElement('a-scene')
    _skyEl = document.createElement('a-sky')
    _cameraContainerEl = document.createElement('a-entity')
    _cameraEl = document.createElement('a-camera')
    _cameraAnimationEl = document.createElement('a-animation')
    _assetsEl = document.createElement('a-assets')
    _el = this.getEl()
    _cameraStartRotation = this.getCurrentPanorama().panoramaRotation || {}

    // a-assets
    _assetsEl.setAttribute('timeout', '1000')
    _sceneEl.append(_assetsEl)
    this.getPanoramas().forEach(panorama => {
      const imgEl = document.createElement('img')
      imgEl.src = panorama.downloadLink
      imgEl.id = panorama.panoramaId
      _assetsEl.appendChild(imgEl)
    })

    // settings
    _sceneEl.setAttribute('embedded', '')
    _sceneEl.setAttribute('debug', '')

    // a-sky
    _skyEl.setAttribute('src', `#${this.getCurrentPanorama().panoramaId}`)
    _sceneEl.appendChild(_skyEl)
    _el.appendChild(_sceneEl)

    // a-camera
    _cameraContainerEl.id = 'camera-container'
    const cameraX = _cameraStartRotation.x || 0
    // const cameraY = cameraRotationOffset + (_cameraStartRotation.y || 0)
    const cameraY = _cameraStartRotation.y || 0
    const cameraZ = _cameraStartRotation.z || 0

    _cameraContainerEl.setAttribute(
      'rotation',
      `${cameraX} ${cameraY} ${cameraZ}`
    )

    // a-animation
    if (config.autoRotate.enabled) {
      _cameraAnimationEl.setAttribute('attribute', 'rotation')
      _cameraAnimationEl.setAttribute('fill', 'forwards')
      _cameraAnimationEl.setAttribute('easing', 'linear')
      _cameraAnimationEl.setAttribute('dur', `${config.autoRotate.duration}`)
      // _cameraAnimationEl.setAttribute('from', `0 ${0 + cameraRotationOffset} 0`)
      // _cameraAnimationEl.setAttribute('to', `0 ${360 + cameraRotationOffset} 0`)
      _cameraAnimationEl.setAttribute('from', `0 0 0`)
      _cameraAnimationEl.setAttribute('to', `0 360 0`)
      _cameraAnimationEl.setAttribute('repeat', 'indefinite')
      _cameraAnimationEl.setAttribute('startEvents', 'rotation-start')
      _cameraAnimationEl.setAttribute('pauseEvents', 'rotation-pause')

      // a-scene
      _cameraContainerEl.appendChild(_cameraEl)
      _cameraContainerEl.appendChild(_cameraAnimationEl)
      _sceneEl.appendChild(_cameraContainerEl)
    }

    // config
    if (config.disableVR) {
      _sceneEl.setAttribute('vr-mode-ui', 'enabled: false')
    }

    // events
    _sceneEl.addEventListener('click', () => {
      this.stopAutoRotate()
    })
  }

  changePanorama (panoramaId, callback) {
    this.selectPanorama(panoramaId)
    const _skyEl = aframeConstants.getSkyEl()
    const currentPanorama = this.getCurrentPanorama()
    loadImage(currentPanorama.downloadLink, () => {
      _skyEl.setAttribute('src', `#${this.getCurrentPanorama().panoramaId}`)
      if (isFunction(callback)) {
        callback()
      }
    })
  }

  toggleVRMode (boolean) {
    const _sceneEl = aframeConstants.getSceneEl()
    if (boolean) {
      if (isFunction(_sceneEl.enterVR)) {
        _sceneEl.enterVR()
      } else {
        throw new Error('Aframe can\'t execute enterVR')
      }
      enterFullScreen()
    } else {
      if (isFunction(_sceneEl.exitVR)) {
        _sceneEl.exitVR()
      } else {
        throw new Error('Aframe can\'t execute exitVR')
      }
      exitFullScreen()
    }
  }

  startAutoRotate () {
    const _cameraAnimationEl = document.getElementsByTagName('a-animation')[0]
    const { y } = this.cameraRotation
    _cameraAnimationEl.emit('play')
    _cameraAnimationEl.setAttribute('from', `0 ${y} 0`)
    _cameraAnimationEl.setAttribute('to', `0 360 0`)
  }

  stopAutoRotate () {
    const _cameraAnimationEl = document.getElementsByTagName('a-animation')[0]
    const _cameraContainerEl = document.getElementById('camera-container')
    const cameraRotation = _cameraContainerEl.getAttribute('rotation')
    console.log('STOPPED')
    this.cameraRotation = cameraRotation
    _cameraAnimationEl.emit('pause')
  }

  destroy () {
    const _sceneEl = aframeConstants.getSceneEl()
    _sceneEl.parentNode.removeChild(_sceneEl)
    aframeConstants.setSceneEl({})
    aframeConstants.setSkyEl({})
  }

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vrmaker.')
    }
  }
}

export default AframeViewer
