
## jQuery

@@include('../components/form/form.jquery.coffee')

# @ @include('../components/popup/popup.jquery.coffee')

`
@@include('../components/light-gallery/lightgallery.js')
@@include('../components/light-gallery/lg-hash.js')
@@include('../components/light-gallery/lg-pager.js')
@@include('../components/light-gallery/lg-thumbnail.js')

// @ @include('../components/light-gallery/lg-video.js')
// @ @include('../components/light-gallery/lg-fullscreen.js')
// @ @include('../components/light-gallery/lg-zoom.js')
// @ @include('../components/light-gallery/lg-autoplay.js')
`
$('body').lightGallery
    selector: '.js-light-gallery'


# $(document).ready ->

# $('*').on 'click', ->
