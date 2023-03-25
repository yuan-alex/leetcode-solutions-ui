module.exports = {
  tabWidth: 2,
  plugins: [require("@trivago/prettier-plugin-sort-imports")],
  importOrder: ["^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
