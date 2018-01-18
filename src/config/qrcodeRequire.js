/* eslint-disable */
import $ from 'jquery'
import './qrcode'
import './qrcode.lib.min'/* eslint-disable */

export function initBtn () {
  Qrcode.init($('[node-type=qr-btn]'))
}
