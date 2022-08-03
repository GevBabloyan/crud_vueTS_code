interface ButtonsNextPrev {
  dataActive: string;
  grey: boolean;
  disabled: boolean;
}

interface PaginationButtons {
  [key: string]: ButtonsNextPrev;
}

export default PaginationButtons;
