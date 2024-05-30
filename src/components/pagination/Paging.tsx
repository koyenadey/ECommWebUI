import { StyledPagination } from "../../styles/styles";
import {Pagination} from "@mui/material";

interface PagingProps {
  pageCount: number;
  pageNo: number;
  onPageChange: (value: number) => void;
}

const Paging = (props: PagingProps) => {
  const { pageCount, pageNo, onPageChange } = props;

  return (
    <Pagination
      sx={{ display: "flex", justifyContent: "center" }}
      page={pageNo}
      count={pageCount}
      variant="outlined"
      shape="rounded"
      onChange={(_event, page) => onPageChange(page)}
    />
  );
};

export default Paging;
