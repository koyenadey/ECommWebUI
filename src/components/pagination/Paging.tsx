import { Pagination } from "@mui/material";

interface PagingProps {
  pageCount: number;
  pageNo: number;
  onPageChange: (value: number) => void;
}

const Paging = (props: PagingProps) => {
  const { pageCount, pageNo, onPageChange } = props;

  return (
    <Pagination
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
