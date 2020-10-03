const path = require('path');

module.exports = {
  getSymbolId: (filePath, fileContent, fileHash) => {
    console.log(filePath)
    return path.basename(filePath, '.svg');
  },
};
