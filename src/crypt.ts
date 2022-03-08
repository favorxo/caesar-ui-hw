class Crypt {
  static encode(message: string, offsetInitial: number, alphabet: string) {
    let newAlpha = '';
    for (let i = 0; i < alphabet.length; i++) {
      let offset = (i + offsetInitial) % alphabet.length;
      newAlpha += alphabet[offset] || '';
    }
    let result = '';
    message = message.toLowerCase();
    for (let i = 0; i < message.length; i++) {
      let index = alphabet.indexOf(message[i]);
      result += newAlpha[index] || '';
    }
    return result;
  }
  static decode(message: string, offsetInitial: number, alphabet: string) {
    let newAlpha = '';
    for (let i = 0; i < alphabet.length; i++) {
      let offset = (i + offsetInitial) % alphabet.length;
      newAlpha += alphabet[offset] || '';
    }
    let result = '';
    message = message.toLowerCase();
    for (let i = 0; i < message.length; i++) {
      let index = newAlpha.indexOf(message[i]);
      result += alphabet[index] || '';
    }
    return result;
  }
}

export default Crypt;
