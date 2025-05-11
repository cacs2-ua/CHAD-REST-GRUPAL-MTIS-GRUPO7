module.exports.getHeaderFromRaw = function getHeaderFromRaw(rawHeaders, headerName) {
    for (let i = 0; i < rawHeaders.length; i += 2) {
        if (rawHeaders[i].toLowerCase() === headerName.toLowerCase()) {
          return rawHeaders[i + 1];
        }
      }
      return null;
}