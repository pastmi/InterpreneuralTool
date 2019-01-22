export default {
    encode,
    decode
};

const keyStr =
    'ABCDEFGHIJKLMNOP' +
    'QRSTUVWXYZabcdef' +
    'ghijklmnopqrstuv' +
    'wxyz0123456789+/' +
    '=';

function encode(input) {
    let output = '';
    let i = 0;

    do {
        let chr1 = input.charCodeAt(i++);
        let chr2 = input.charCodeAt(i++);
        let chr3 = input.charCodeAt(i++);

        let enc1 = chr1 >> 2;
        let enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        let enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
    } while (i < input.length);

    return output;
}

function decode(input) {
    let output = '';
    let i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    const base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        console.warn('There were invalid base64 characters in the input text.\n' +
            'Valid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\n' +
            'Expect errors in decoding.');
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    do {
        let enc1 = keyStr.indexOf(input.charAt(i++));
        let enc2 = keyStr.indexOf(input.charAt(i++));
        let enc3 = keyStr.indexOf(input.charAt(i++));
        let enc4 = keyStr.indexOf(input.charAt(i++));

        let chr1 = (enc1 << 2) | (enc2 >> 4);
        let chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        let chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 !== 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
            output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = 0;

    } while (i < input.length);

    return output;
}