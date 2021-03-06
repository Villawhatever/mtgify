'use strict'

class TextParser {
  constructor(verifier, maxLength){
    this.verifier = verifier
    this.maxLength = maxLength
  }

  tryReplaceText(text){
    const result = this.verifier(text)
    if (result !== null) {
      return {
        ok: true,
        newText: result,
      }
    }
    return {
      ok: false,
    }
  }

  replaceFirst(text) {
    for (let i = 0; i < text.length; i++){
      const maxLength = Math.min(this.maxLength, text.length - i)
      let w = i + maxLength + 1
      let textWindow = ''
      let result = { ok: false }
      while(!result.ok && w > i){
        w -= 1
        textWindow = text.substring(i, w)
        result = this.tryReplaceText(textWindow)
      }
      if (result.ok) {
        return {
          changed: true,
          newHTML: result.newText,
          beforeText: text.substring(0, i),
          afterText: text.substring(w),
        }
      }
    }
    return {
      changed: false,
    }
  }
}

module.exports = TextParser
