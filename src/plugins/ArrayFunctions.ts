import ArrayFunctions from "@/types/Plagin/ArrayFunctions";

export const sortArray = (data: ArrayFunctions) => {
  let sortedArray = [];
  if (data.options.prop === "id") {
    sortedArray = data.array.sort((a, b) => a.id - b.id);
  } else {
    sortedArray = data.array.sort((a, b) => {
      return a[data.options.prop].toLowerCase() >
        b[data.options.prop].toLowerCase()
        ? 1
        : a[data.options.prop].toLowerCase() <
          b[data.options.prop].toLowerCase()
        ? -1
        : 0;
    });
  }
  return data.options.to === "up" ? sortedArray : sortedArray.reverse();
};

export const sliceArray = (data: ArrayFunctions) => {
  const slicedArray = data.array.slice(
    (data.options.page - 1) * data.options.pageSize,
    data.options.page * data.options.pageSize
  );
  return slicedArray;
};
