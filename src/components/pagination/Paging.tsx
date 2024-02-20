import { Pagination } from "@mui/material";

import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

interface PagingProps {
  pageSize: number;
  pageNo: number;
  onPageChange: (value: number) => void;
}

const Paging = (props: PagingProps) => {
  const { pageSize, pageNo, onPageChange } = props;

  const totalItems = useSelector(
    (state: AppState) => state.productReducer.productCount
  );

  const pageCount = Math.ceil(totalItems / pageSize);

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
