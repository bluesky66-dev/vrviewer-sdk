import KrpanoViewer from '@/KrpanoViewer'
import krpanoConstants from '@/krpanoViewer/krpano-constants'
import krpanoHelpers from '@/krpanoViewer/krpano-helpers'

describe('krpano/index.js', () => {
  window.krpanoJS = 'something'
  window.embedpano = (config) => {
    config.onready({
      call: () => {}
    })
  }
  window.removepano = () => {}
  let krpanoViewer
  beforeEach(() => {
    krpanoViewer = new KrpanoViewer()
  })

  it('generateKrpano should call setKrpanoId, setConfig, initKrpanoVRModeItems, generateXml and embedPano', () => {
    krpanoConstants.setKrpanoId = jest.fn()
    krpanoHelpers.setConfig = jest.fn()
    krpanoConstants.initKrpanoVRModeItems = jest.fn()
    krpanoHelpers.generateXml = jest.fn()
    krpanoHelpers.embedPano = jest.fn()

    krpanoViewer.generateKrpano({})
    expect(krpanoConstants.setKrpanoId).toBeCalled()
    expect(krpanoHelpers.setConfig).toBeCalled()
    expect(krpanoConstants.initKrpanoVRModeItems).toBeCalled()
    expect(krpanoHelpers.generateXml).toBeCalled()
    expect(krpanoHelpers.embedPano).toBeCalled()
  })
})
