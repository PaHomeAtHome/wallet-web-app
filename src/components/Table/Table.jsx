import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import {
  useGetTransactionsQuery,
  useGetTransactionsStatisticsQuery,
  useGetTransactionsFullStatisticQuery,
} from '../../redux/transactions/transactionApi';

import {
  TableContainer,
  TableHead,
  TableHeadItem,
  TableContent,
  TableContentItem,
  ShortTableItem,
  ShortTableCell,
  TableSpan,
  ShortTableContainer,
} from './Table.styled';

import { ReactPaginateContainer } from './ReactPaginateContainer.styled';
import { TableData } from './TableData';
const colors = { income: '#24CCA7', expense: '#FF6596' };

function defType(type) {
  var typeSign = '';
  if (type === 'income') {
    typeSign = '+';
  } else {
    typeSign = '-';
  }
  return typeSign;
}

function defColor(type) {
  var color = '';
  if (type === 'income') {
    color = colors.income;
  } else {
    color = colors.expense;
  }
  return color;
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function Table() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  console.log('window', windowSize.innerWidth);

  var res = [
    {
      date: 'today',
      type: '+-',
      category: 'other',
      comment: 'earn money',
      sum: '100500',
      _id: 0,
    },
  ];
  var currBalance = '';

  const statData = useGetTransactionsStatisticsQuery('', '');
  const { data } = useGetTransactionsQuery(page);
  const { data: fullStatistic } = useGetTransactionsFullStatisticQuery();

  console.log('data=', data);
  const pageSize = 10;

  useEffect(() => {
    if (fullStatistic) {
      const pageCount = Math.ceil(fullStatistic.alllist.length / pageSize);
      setPageCount(pageCount);
    }
  }, [fullStatistic]);

  const handlePageClick = page => {
    setPage(page.selected + 1);
  };

  if (statData.data) {
    currBalance = statData.data.currBalance;
  }
  if (data) {
    res = data.data;
  }

  return (
    <div>
      {windowSize.innerWidth > `${767.5}` ? (
        <div>
          <TableHead>
            {TableData.map(({ label, id, width, textAlign }) => (
              <TableHeadItem
                key={id}
                style={{ width: `${width}`, textAlign: `${textAlign}` }}
              >
                {label}
              </TableHeadItem>
            ))}
          </TableHead>
          {res.map(({ date, type, category, comment, sum, _id }) => (
            <TableContent key={_id}>
              <TableContentItem style={{ width: '15%', textAlign: 'left' }}>
                {date}
              </TableContentItem>
              <TableContentItem style={{ width: '10%', textAlign: 'center' }}>
                {defType(type)}
              </TableContentItem>
              <TableContentItem style={{ width: '20%', textAlign: 'left' }}>
                {category}
              </TableContentItem>
              <TableContentItem style={{ width: '25%', textAlign: 'left' }}>
                {comment}
              </TableContentItem>
              <TableContentItem
                style={{
                  width: '15%',
                  textAlign: 'right',
                  color: `${defColor(type)}`,
                }}
              >
                {sum}
              </TableContentItem>
              <TableContentItem style={{ width: '15%', textAlign: 'right' }}>
                {currBalance}
              </TableContentItem>
            </TableContent>
          ))}
        </div>
      ) : (
        <ShortTableContainer>
          {res.map(({ date, type, category, comment, sum, _id }) => (
            <ShortTableCell
              key={_id}
              style={{ borderLeft: `solid 5px ${defColor(type)}` }}
            >
              <ShortTableItem>
                <TableSpan>Date</TableSpan>
                <span>{date}</span>
              </ShortTableItem>
              <ShortTableItem>
                <TableSpan>Type</TableSpan>
                <span>{defType(type)}</span>
              </ShortTableItem>
              <ShortTableItem>
                <TableSpan>Category</TableSpan>
                <span>{category}</span>
              </ShortTableItem>
              <ShortTableItem>
                <TableSpan>Comment</TableSpan>
                <span>{comment}</span>
              </ShortTableItem>
              <ShortTableItem>
                <TableSpan>Sum</TableSpan>
                <span>{sum}</span>
              </ShortTableItem>
            </ShortTableCell>
          ))}
        </ShortTableContainer>
      )}

      {pageCount && (
        <ReactPaginateContainer>
          <ReactPaginate
            activeClassName={'item active '}
            breakClassName={'item break-me '}
            containerClassName={'pagination'}
            disabledClassName={'disabled-page'}
            nextClassName={'item next '}
            pageClassName={'item pagination-page '}
            previousClassName={'item previous'}
            marginPagesDisplayed={2}
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
          />
        </ReactPaginateContainer>
      )}
    </div>
  );
}

export default Table;
