export const x = (selector,context=document) => context.querySelectorAll(selector)

export const x0 = (selector,context=document) => context.querySelector(selector)

export const isTouch = (() =>  (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)))()
