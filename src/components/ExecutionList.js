import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "./Layout";
import Button from "@material-ui/core/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router";
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce, useFilters } from "react-table";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
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
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
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
      Global Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

export default function ExecutionList() {
  const [executionList, setexecutionList] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();

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
    return "not found";
  }

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
      console.log("executions list: ",executions);
      setexecutionList(executions);
    };
    (async () => {
      await fetchExecutions();
      setloading(false);
    })();
  }, []);

  const viewDetail = (params) => {
    history.push({
      pathname: "/execution-detail/",
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

  return (
    <>
      <Layout>
        {loading ? (
          <ClipLoader size={150} color={"#123abc"} loading={loading} />
        ) : (
          <table className="table table-striped" {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                        <span {...column.getSortByToggleProps()}>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ' 🟦'}
                        </span>
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>
                ))}
                <tr>
                  <th
                    colSpan={visibleColumns.length}
                    style={{
                      textAlign: 'left',
                    }}
                  >
                    <GlobalFilter
                      preGlobalFilteredRows={preGlobalFilteredRows}
                      globalFilter={state.globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </th>
                </tr>
              </thead>
              <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                  rows.map(row => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                      // Apply the row props
                      <tr {...row.getRowProps()}>
                        {// Loop over the rows cells
                          row.cells.map(cell => {
                            // Apply the cell props
                            return (
                              <td {...cell.getCellProps()}>
                                {// Render the cell contents
                                  cell.render('Cell')}
                              </td>
                            )
                          })}
                        <td>
                          <div className="btn-container">
                            <Button variant="text" onClick={() => viewDetail(row.values)}>
                              View
                              </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        )}
      </Layout>
    </>
  );
}
