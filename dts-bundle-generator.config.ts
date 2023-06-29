const config = {
  entries: [
    {
      filePath: "./src/index.ts",
      outFile: "./dist/index.d.ts",
      noCheck: false,
      output: {
        umdModuleName: "ReactHighlightMenu",
      },
    },
  ],
};

module.exports = config;
