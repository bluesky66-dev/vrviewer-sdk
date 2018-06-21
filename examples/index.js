// Make sure you have already using vrviewer-sdk js first.

// New and init vrviewer with the element you give and the data(panoramas) which come from vrmaker backend service.

var fetchPanoCollectionPromise = new Promise((resolve, reject) => {
  const url = 'https://evs-dev-api.istaging.com.cn'
  const collectionId = 'pc_8db3528f-c375-4733-81b1-d410b7cd4631'
  window.axios({
    method: 'get',
    url: `${url}/api/v1/openlink/${collectionId}`
  }).then(function (response) {
    if (response.status === 200) {
      var panoCollection = response.data
      resolve(panoCollection)
      console.log('panoCollection', panoCollection)
    }
  }).catch(function (error) {
    reject(error)
  })
})

Promise.all([fetchPanoCollectionPromise]).then((resp) => {
  var panoCollection = resp[0]
  VRViewer.init({
    el: '#vrviewer-sdk',
    lang: 'zh-cn',
    panoCollection: panoCollection,
    setting: {
      autoRotateSetting: {
        active: true,
        revert: false,
        rotateDuration: 200000,
        restartTime: 20000
      },
      gyroSetting: {
        active: false
      },
      krpanoSetting: {
        mwheel: true,
        focus: false
      },
      tripodSetting: {
        image: 'https://www.istaging.com/sdk/logo-tripod.png',
        size: 60
      }
    }
  })
})

var customPopupSection = document.querySelector('.custom-popup-section');
customPopupSection.classList.add('hide');
var customPopupContentSection = document.querySelector('.custom-popup-content-section');
customPopupContentSection.classList.add('hide');

VRViewer.onMarkerClick = (marker) => {
  console.log('onMarkerClick callback: ', marker)

  // handle your custom tag in marker click callback function
  if (marker.type ==='custom') {
    switch (marker.customTagInfo.type) {
      case 'CashGift':
        var CashGiftSection = document.querySelector('.cash-gift-section');
        CashGiftSection.classList.remove('hide')
        break
      default:
        break
    }
    customPopupSection.classList.remove('hide')
    VRViewer.togglePanoramasList()
  }
}

var customPopupClose = document.querySelector('.custom-popup-section-close');
customPopupClose.addEventListener('click', function() {
  customPopupSection.classList.add('hide');
  VRViewer.togglePanoramasList()
});
