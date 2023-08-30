export default function useDataFilter() {
  let filter = (dataList, filterText, field) => {
    return dataList.filter((item) => {
      return item[field].toLowerCase().search(filterText.toLowerCase()) > -1;
    });
  };

  return filter;
}
