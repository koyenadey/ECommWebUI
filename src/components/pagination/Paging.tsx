import { StyledPagination } from "../../styles/styles";

interface PagingProps {
  pageCount: number;
  pageNo: number;
  onPageChange: (value: number) => void;
}

const Paging = (props: PagingProps) => {
  const { pageCount, pageNo, onPageChange } = props;

  return (
    <StyledPagination
      sx={{ margin: "5% 25%" }}
      page={pageNo}
      count={pageCount}
      variant="outlined"
      shape="rounded"
      onChange={(event, page) => onPageChange(page)}
    />
  );
};

export default Paging;
