const writeFileHelper = (data) => {
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: data
      }));
}

module.exports = writeFileHelper;