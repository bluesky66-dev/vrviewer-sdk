<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(11.5 11.419)">
        <path :fill="color" d="M8.143.562v1.68a.527.527 0 0 1-.525.529H6.425a.527.527 0 0 1-.525-.53V.563a.527.527
          0 0 0-.525-.529H.572a.527.527 0 0 0-.525.529v8.747c0 .292.235.53.525.53h.525c.29 0
          .525-.238.525-.53V3.721c0-.293.236-.53.526-.53H3.34c.29 0 .525.237.525.53V5.4c0
          .292.235.53.525.53h4.802c.29 0 .525-.238.525-.53V.562a.527.527 0 0 0-.525-.529h-.525a.527.527
          0 0 0-.525.529">
        </path>
      </g>
      <path :fill="color" d="M2.1 8.213h5.527c.29 0 .526-.236.526-.529V2.116a.527.527 0 0 0-.526-.529H2.1a.527.527
        0 0 0-.525.53v5.567c0 .293.235.53.525.53M9.203 9.8H.525A.527.527 0 0 1 0 9.271V.53C0 .237.235 0
        .525 0h8.678c.29 0 .525.237.525.529v8.742a.527.527 0 0 1-.525.53">
      </path>
      <path :fill="color" d="M5.494 5.694h-1.26a.158.158 0 0 1-.158-.159v-1.27c0-.087.07-.158.158-.158h1.26c.087 0
        .158.07.158.158v1.27c0 .088-.071.159-.158.159M2.1 19.671h5.527c.29 0 .526-.236.526-.529v-5.568a.527.527
        0 0 0-.526-.529H2.1a.527.527 0 0 0-.525.529v5.568c0 .293.235.53.525.53m7.103 1.586H.525A.527.527 0
        0 1 0 20.73v-8.742c0-.292.235-.53.525-.53h8.678c.29 0 .525.238.525.53v8.742a.527.527 0 0 1-.525.53">
      </path>
      <path :fill="color" d="M5.494 17.152h-1.26a.158.158 0 0 1-.158-.159v-1.27c0-.087.07-.158.158-.158h1.26c.087
        0 .158.07.158.158v1.27c0 .088-.071.159-.158.159M16.783 21.257h-1.26a.158.158 0 0
        1-.157-.159v-1.27c0-.087.07-.158.157-.158h1.26c.087 0 .158.07.158.159v1.27c0
        .087-.07.158-.158.158">
      </path>
      <g transform="translate(19.639 19.618)">
        <path :fill="color" d="M1.422 1.638H.162a.158.158 0 0 1-.158-.158V.21c0-.088.07-.159.158-.159h1.26c.087
          0 .157.071.157.16V1.48c0 .087-.07.158-.157.158">
        </path>
      </g>
      <path :fill="color" d="M13.557 8.213h5.527c.29 0 .525-.236.525-.529V2.116a.527.527 0 0
        0-.525-.529h-5.527a.527.527 0 0 0-.525.53v5.567c0 .293.235.53.525.53M20.66 9.8h-8.677a.527.527
        0 0 1-.525-.529V.53c0-.292.235-.529.525-.529h8.677c.29 0 .526.237.526.529v8.742a.527.527 0 0 1-.526.53">
      </path>
      <path :fill="color" d="M16.95 5.694h-1.26a.158.158 0 0 1-.157-.159v-1.27c0-.087.07-.158.158-.158h1.26c.087
        0 .157.07.157.158v1.27c0 .088-.07.159-.157.159">
      </path>
      <path d="M0 0h21.621v21.621H0z"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgQrcode',
  props: {
    color: {
      type: String,
      default () {
        return '#fff'
      }
    }
  }
}
</script>
