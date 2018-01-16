/* eslint-disable */
import $ from 'jquery'
import './qrcode'
import './qrcode.lib.min'/* eslint-disable */
$(function () {
  Qrcode.init($('[node-type=qr-btn]'))
})
