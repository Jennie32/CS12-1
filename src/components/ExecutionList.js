import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from "./Layout"

export default function ExecutionList()
{
    const [executionList, setexecutionList] = useState([]);
    async function getTitle(item) {
        if(item.hasOwnProperty('data')){
            if(item.data.hasOwnProperty('claim_title')){
                return item.data.claim_title;
            }
        }
        return "not found"
    }
    useEffect(() => {
        (async () => {
            await fetchExecutions();
        })()
    }, [])

    const fetchExecutions = async event => {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };
        let result = await axios.post('https://oys6sr3oo2.execute-api.eu-central-1.amazonaws.com/dev/execution', {
            "maxResults": 20,
            "stateMachineArn": "arn:aws:states:eu-central-1:638900115631:stateMachine:BasicWorkflow"
         }, headers);

        var executionArns = result.data.executions.map(execution => execution.executionArn);
        const asyncDescriptions = await Promise.all(executionArns.map(async (arn) => {
           return await axios.post('https://wid4bo7v0k.execute-api.eu-central-1.amazonaws.com/alpha/describeexecution', { "executionArn": arn.toString() }, headers);
        }));
        var titles = await Promise.all(asyncDescriptions.map(description => getTitle(JSON.parse(description.data.input))));
        var status = await Promise.all(asyncDescriptions.map(description => description.data.status));
        var executions = titles.map(function(e, i) {
            return [e, status[i]];
        });
        setexecutionList(executions);
    }
    return (
        <div>
            <Layout>
                <ul>
                {executionList.map((item, index) => (
                    <li key={index}>Claim Title: {(item[0])} Claim Status: {(item[1])}</li>
                ))}
                </ul>
            </Layout>
        </div>
    )
}