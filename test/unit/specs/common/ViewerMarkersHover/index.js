import Vue from 'vue'
import ViewerMarkersHover from '../../../../../src/common/ViewerMarkersHover/index.vue'
import store from '../../../../../src/store'
import { isEqual, isMobile } from '../../../../../src/api/utils'

const Constructor = Vue.extend(ViewerMarkersHover)
const panoramas = [{
  id: '1',
  customCategory: 'test'
}, {
  id: '2',
  category: 'livingroom'
}]
const marker = {
  nextPanoId: '2',
  type: 'point'
}
describe('common/ViewerMarkersHover/index.vue', () => {
  let vm = new Constructor({
    store
  }).$mount()

  it('應該要有 className vrsdk-viewer-markers-hover', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-viewer-markers-hover')
  })

  it('應該要有 className vrsdk-viewer-markers-hover', () => {
    store.commit('SET_PANORAMAS', panoramas)
    store.commit('SET_MARKER', marker)
    vm._watcher.run()
    expect(vm.$el.textContent)
      .toEqual(vm.nextCategory)
  })

  it('markerInfoPosition 擺放至對應位置', () => {
    vm = new Constructor({
      store,
      propsData: {
        markerPositionX: 90,
        markerPositionY: 120
      }
    }).$mount()
    if (isMobile()) {
      expect(vm.markerInfoPosition.left)
        .toEqual(vm.markerPositionX)
      expect(vm.markerInfoPosition.top)
        .toEqual(vm.markerPositionY)
    } else {
      expect(isEqual(vm.markerInfoPosition, {}))
        .toBe(true)
    }
  })

  it('shouldShowMarkerInfo 在桌電裝置及 marker 為站點時等於 true', () => {
    let shouldShowMarkerInfo = !isMobile() && vm.currentMarker.type === 'point'
    expect(vm.shouldShowMarkerInfo)
      .toEqual(shouldShowMarkerInfo)

    shouldShowMarkerInfo = !isMobile() && vm.currentMarker.type === 'memo'
    expect(vm.shouldShowMarkerInfo)
      .not.toEqual(shouldShowMarkerInfo)

    shouldShowMarkerInfo = isMobile() && vm.currentMarker.type === 'point'
    expect(vm.shouldShowMarkerInfo)
      .not.toEqual(shouldShowMarkerInfo)
  })

  it('nextPanorama 的 id 應該要等於站點的 nextPanoId', () => {
    const nextPanorama = vm.panoramas.find(panorama => panorama.id === vm.currentMarker.nextPanoId)
    expect(vm.nextPanorama)
      .toEqual(nextPanorama)
  })

  it('nextThumbnailPosition 只在 point 時有值', () => {
    const nextRotation = {
      x: 0,
      y: 45,
      z: 0
    }
    const baseRotation = 0.833
    const positionOffset = 90
    store.commit('SET_MARKER', {
      type: 'point',
      nextRotation
    })
    const calcPosition = (nextRotation * baseRotation) - positionOffset
    expect(vm.nextThumbnailPosition)
      .toEqual(nextPanorama)
  })
})
