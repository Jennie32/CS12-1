import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "./Layout";
import Button from "@material-ui/core/Button";
import ClipLoader from "react-spinners/ClipLoader";

export default function ExecutionList() {
  const [executionList, setexecutionList] = useState([]);
  const [loading, setloading] = useState(true);

  async function getTitle(item) {
    if (item.hasOwnProperty("data")) {
      if (item.data.hasOwnProperty("claim_title")) {
        return item.data.claim_title;
      }
    }
    return "not found";
  }
  useEffect(() => {
    const fetchExecutions = async (event) => {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      let result = await axios.post(
        "https://oys6sr3oo2.execute-api.eu-central-1.amazonaws.com/dev/execution",
        {
          maxResults: 20,
          stateMachineArn:
            "arn:aws:states:eu-central-1:638900115631:stateMachine:BasicWorkflow",
        },
        headers
      );

      var executionArns = result.data.executions.map(
        (execution) => execution.executionArn
      );

      const asyncDescriptions = await Promise.all(
        executionArns.map(async (arn) => {
          return await axios.post(
            "https://wid4bo7v0k.execute-api.eu-central-1.amazonaws.com/alpha/describeexecution",
            { executionArn: arn.toString() },
            headers
          );
        })
      );
      var titles = await Promise.all(
        asyncDescriptions.map((description) =>
          getTitle(JSON.parse(description.data.input))
        )
      );
      var status = await Promise.all(
        asyncDescriptions.map((description) => description.data.status)
      );

      const events = (await Promise.all(
        executionArns.map(async (arn) => {
          return await axios.post(
            "https://prf7e0psi7.execute-api.eu-central-1.amazonaws.com/beta/execution",
            { executionArn: arn.toString(),includeExecutionData: true, maxResults: 10, reverseOrder: true },
            headers
          );
        })
      )).map(res => res.data.events);

      const names = events.map(events => {
        for (const event of events) {
          if ("stateEnteredEventDetails" in event && 'name' in event.stateEnteredEventDetails) {
            return event.stateEnteredEventDetails.name;
          }
        }
        return 'not found';
      })

      var executions = titles.map(function (e, i) {
        return [e, status[i], names[i]];
      });
      setexecutionList(executions);
    };
    (async () => {
      await fetchExecutions();
      setloading(false);
    })();
  }, []);

  const viewDetail = (event) => {
    alert("clicked!");
  };

  return (
    <>
      <Layout>
        {loading ? (
          <ClipLoader size={150} color={"#123abc"} loading={loading} />
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>States</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {executionList.map((item, index) => (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>
                    <div className="btn-container">
                      <Button variant="text" onClick={() => viewDetail()}>
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Layout>
    </>
  );
}
