import { Pagination as PaginationMUI, PaginationItem } from '@mui/material'
import Link from 'next/link'
import React, { FC } from 'react'

type PaginationProps = {
  page: number;
  total: number;
  path: string;
}

const Pagination: FC<PaginationProps> = ({ page, total, path }) => {
  return (
    <PaginationMUI
      page={page}
      count={Math.ceil(total / 4)}
      shape="rounded"
      color="primary"
      sx={{ my: 3 }}
      renderItem={(item: any) => (
        <PaginationItem
          component={Link}
          href={`${path}${item.page === 0 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  )
}

export default Pagination