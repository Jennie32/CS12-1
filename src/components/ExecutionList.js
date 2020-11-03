import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Layout } from "./Layout";
import Button from "@material-ui/core/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router";
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce, useFilters } from "react-table";
import { Link } from "react-router-dom";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import FormControl from '@material-ui/core/FormControl';

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <TextField 
      value={filterValue || ''} 
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }} 
      label="Filter"
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <FormControl style={{minWidth: 120, marginTop: '16px'}}>
      <Select
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        native
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      <TextField
        value={value || ''} 
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        fullWidth
        style={{
          fontSize: '1.1rem'
        }}
        label="Global Search"
        placeholder={`Search ${count} records...`}
      />
    </span>
  )
}

export default function ExecutionList() {
  const [executionList, setexecutionList] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();
  const mountedRef = useRef(true)

  async function getTitle(item) {
    let title = "not found";
    if (item !== null) {
      if (item.hasOwnProperty("claim_title")) {
        title = item.claim_title;
      }
    }
    return title;
  }

  async function getAmount(parsedDataInput) {
    let amount = 0;
    if (parsedDataInput !== null) {
      if (parsedDataInput.hasOwnProperty("data")) {
        if (parsedDataInput.data.hasOwnProperty("amount")) {
          amount = parsedDataInput.data.amount;
        }
      }
    }
    return amount;
  }

  async function getStateName(events) {
    for (const event of events) {
      if ("stateEnteredEventDetails" in event && "name" in event.stateEnteredEventDetails) {
        return event.stateEnteredEventDetails.name;
      }
    }
    return "empty";
  }

  const viewDetail = (params) => {
    // use react-router Link component - will stop weird rendering issues
    history.push({
      pathname: "/workflows/payment-claim/6732167",
      state: {
        ...params,
      },
    });
  };
  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'States',
        accessor: 'state',
      }
    ],
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    prepareRow,
  } = useTable({ columns, data: executionList, defaultColumn }, useGlobalFilter, useFilters, useSortBy)


  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    async function getDetails(executionArns) {
      const asyncDescriptions = await Promise.all(
        executionArns.map(async (arn) => {
          const tempDescription = await axios.post(
            "https://wid4bo7v0k.execute-api.eu-central-1.amazonaws.com/alpha/describeexecution",
            {
              executionArn: arn.toString(),
            },
            headers
          );

          const executionHistories = await axios.post(
            "https://prf7e0psi7.execute-api.eu-central-1.amazonaws.com/beta/execution",
            {
              executionArn: arn.toString(),
              includeExecutionData: true,
              maxResults: 10,
              reverseOrder: true,
            },
            headers
          );
            
          const stateName = await getStateName(executionHistories.data.events);
          const parsedDataInput = JSON.parse(tempDescription.data.input);
          const amount = await getAmount(parsedDataInput);
          return [await getTitle(parsedDataInput), tempDescription.data.status, stateName, amount];
        })
      );
      return asyncDescriptions;
    }

    async function getARNs() {
      let result = await axios.post(
        "https://oys6sr3oo2.execute-api.eu-central-1.amazonaws.com/dev/execution",
        {
          maxResults: 20,
          stateMachineArn: "arn:aws:states:eu-central-1:638900115631:stateMachine:BasicWorkflow",
        },
        headers
      );
      var Arnresults = result.data.executions.map((execution) => execution.executionArn);
      return Arnresults;
    }

    const fetchExecutions = async () => {
      const executionArns = await getARNs();
      const details = await getDetails(executionArns);
      let executions = details.map((detail) => {
        let title, status, state, amount;
        [title, status, state, amount] = detail;
        return { "title": title, "status": status, "state": state, "amount": amount };
      });
      setexecutionList(executions);
    };
    (async () => {
      if (!mountedRef.current) return null
      await fetchExecutions();
      setloading(false);
    })();

    return () => { 
      mountedRef.current = false
    }
  }, [getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    prepareRow]);

  return (
    <>
      <Layout>
        <div className="create-btn-wrapper">
          <Link to="/workflows/new-payment-claim">
            <Button className="align-left" variant="contained" color="primary">Start a new payment claim</Button>
          </Link>
        </div>
        {loading ? (
          <ClipLoader size={150} color={"#123abc"} loading={loading} />
        ) : (
          <TableContainer component={Paper}>
            <Table {...getTableProps()}>
                <TableHead>
                  {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <TableCell {...column.getHeaderProps()}>
                          <TableSortLabel
                            active={column.isSorted}
                            direction={column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : "desc"}
                            onClick={() => {
                              const isDesc = column.isSorted && column.isSortedDesc;
                              column.toggleSortBy(!isDesc, false);
                            }}
                          >
                            {column.render('Header')}
                          </TableSortLabel>
                          <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </TableCell>
                      ))}
                      <TableCell>Action</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumns.length + 1}
                      style={{
                        textAlign: 'left',
                      }}
                    >
                      <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                  {
                    rows.map(row => {
                    
                      prepareRow(row)
                      return (
                      
                        <TableRow {...row.getRowProps()}>
                          {
                            row.cells.map(cell => {
                            
                              return (
                                <TableCell {...cell.getCellProps()}>
                                  {
                                    cell.render('Cell')}
                                </TableCell>
                              )
                            })}
                          <TableCell>
                            <div className="btn-container">
                              <Link to={{ pathname: '/workflows/payment-claim/6732167', data:  row.original }} >
                                <Button className="align-left" variant="contained" color="primary">View</Button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Layout>
    </>
  );
}
