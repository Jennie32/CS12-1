import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "./Layout";

const ExecutionDetail = () => {
  return (
    <>
      <Layout>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
          <g id="Page-1" fill="none" fillRule="evenodd">
            <g id="Course-Template">
              <g id="arrows" transform="translate(163 98)">
                <g id="arrows/arrow-1.2" transform="rotate(90 69.5 70)">
                  <g id="arrow-1.2">
                    <path
                      id="Line"
                      stroke="#89969F"
                      strokeLinecap="square"
                      d="M.336 2.5h38.46"
                    />
                    <polygon
                      id="Triangle"
                      fill="#89969F"
                      points="37 5 37 0 40 2.5"
                    />
                  </g>
                </g>
                <g id="arrows/arrow-1.2-copy" transform="rotate(90 27.5 112)">
                  <g id="arrow-1.2">
                    <path
                      id="Line"
                      stroke="#89969F"
                      strokeLinecap="square"
                      d="M.336 2.5h38.46"
                    />
                    <polygon
                      id="Triangle"
                      fill="#89969F"
                      points="37 5 37 0 40 2.5"
                    />
                  </g>
                </g>
                <g id="arrows/arrow-4" transform="rotate(90 53 220.5)">
                  <g id="arrow-4">
                    <path
                      id="Path-4"
                      stroke="#89969F"
                      d="M87 3H38.009C32.48 3 28 7.48 28 13v247c0 5.523 4.483 10 10.009 10H87"
                    />
                    <path id="Path-5" stroke="#89969F" d="M28.5 137H.996" />
                    <polygon
                      id="Triangle-2-Copy-2"
                      fill="#89969F"
                      points="87 6 87 0 90 3"
                    />
                    <polygon
                      id="Triangle-2-Copy-4"
                      fill="#89969F"
                      points="87 273 87 267 90 270"
                    />
                  </g>
                </g>
                <g id="arrow-2" transform="translate(3 335)">
                  <path
                    id="Path-2"
                    stroke="#89969F"
                    d="M0 0v73.009C0 78.527 4.485 83 9.992 83H70"
                  />
                  <polygon
                    id="Triangle-2"
                    fill="#89969F"
                    points="70 86 70 80 73 83"
                  />
                </g>
                <g id="arrow-2-copy" transform="matrix(-1 0 0 1 271 335)">
                  <path
                    id="Path-2"
                    stroke="#89969F"
                    d="M0 0v73.009C0 78.527 4.485 83 9.992 83H70"
                  />
                  <polygon
                    id="Triangle-2"
                    fill="#89969F"
                    points="70 86 70 80 73 83"
                  />
                </g>
              </g>
              <g
                id="ep-content"
                className="ep-svg-block"
                transform="translate(259 56)"
              >
                <rect
                  id="Rectangle"
                  width="81"
                  height="40"
                  fill="#FFEC35"
                  rx="20"
                />
                <text
                  id="Content"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="23" y="25">
                    Start
                  </tspan>
                </text>
              </g>
              <g
                id="ep-form"
                className="ep-svg-block"
                transform="translate(174 140)"
              >
                <rect
                  id="Rectangle"
                  width="270"
                  height="40"
                  fill="#8BE5AD"
                  rx="20"
                />
                <text
                  id="Content"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="29.964" y="25">
                    Contractor claim payment
                  </tspan>
                </text>
              </g>
              <g
                id="ep-media"
                className="ep-svg-block"
                transform="translate(184 224)"
              >
                <rect
                  id="Rectangle"
                  width="239"
                  height="40"
                  fill="#8BE5AD"
                  rx="20"
                />
                <text
                  id="Content"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="25" y="25">
                    Superintendent confirm
                  </tspan>
                </text>
              </g>
              <g
                id="ep-unity"
                className="ep-svg-block"
                transform="translate(240 496)"
              >
                <rect
                  id="Rectangle"
                  width="120"
                  height="60"
                  fill="#8BE5AD"
                  rx="20"
                />
                <text
                  id="Content"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="8" y="25">
                    Get Payment
                  </tspan>
                  <tspan x="18" y="49">
                    Certificate
                  </tspan>
                </text>
              </g>
              <g
                id="ep-elements"
                className="ep-svg-block"
                transform="translate(86 360)"
              >
                <rect
                  id="Rectangle"
                  width="155"
                  height="64"
                  fill="#8BE5AD"
                  rx="37"
                />
                <text
                  id="Elements-of-Design"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="17" y="28">
                    Superintrndent
                  </tspan>
                  <tspan x="38" y="50">
                    confirmed
                  </tspan>
                </text>
              </g>
              <g
                id="ep-principles"
                className="ep-svg-block"
                transform="translate(355 360)"
              >
                <rect
                  id="Rectangle"
                  dashed="true"
                  width="155"
                  height="64"
                  fill="#F5FFE8"
                  rx="37"
                />
                <text
                  id="Principles-of-Organi"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="35" y="28">
                    Reject and
                  </tspan>
                  <tspan x="16" y="50">
                    no action taken
                  </tspan>
                </text>
              </g>

              <g id="arrows" transform="translate(163 643)">
                <g id="arrows/arrow-1.2" transform="rotate(90 69.5 70)">
                  <g id="arrow-1.2">
                    <path
                      id="Line"
                      stroke="#89969F"
                      strokeLinecap="square"
                      d="M.336 2.5h38.46"
                    />
                    <polygon
                      id="Triangle"
                      fill="#89969F"
                      points="37 5 37 0 40 2.5"
                    />
                  </g>
                </g>

                <g id="arrows/arrow-1.2-copy2" transform="rotate(90 112 27)">
                  <g id="arrow-1.2">
                    <path
                      id="Line"
                      stroke="#89969F"
                      strokeLinecap="square"
                      d="M.336 2.5h38.46"
                    />
                    <polygon
                      id="Triangle"
                      fill="#89969F"
                      points="37 5 37 0 40 2.5"
                    />
                  </g>
                </g>

                <g id="arrows/arrow-1.2-copy" transform="rotate(90 27.5 112)">
                  <g id="arrow-1.2">
                    <path
                      id="Line"
                      stroke="#89969F"
                      strokeLinecap="square"
                      d="M.336 2.5h38.46"
                    />
                    <polygon
                      id="Triangle"
                      fill="#89969F"
                      points="37 5 37 0 40 2.5"
                    />
                  </g>
                </g>
                <g id="arrows/arrow-4" transform="rotate(90 53 220.5)">
                  <g id="arrow-4">
                    <path
                      id="Path-4"
                      stroke="#89969F"
                      d="M87 3H38.009C32.48 3 28 7.48 28 13v247c0 5.523 4.483 10 10.009 10H87"
                    />
                    <path id="Path-5" stroke="#89969F" d="M28.5 137H.996" />
                    <polygon
                      id="Triangle-2-Copy-2"
                      fill="#89969F"
                      points="87 6 87 0 90 3"
                    />
                    <polygon
                      id="Triangle-2-Copy-4"
                      fill="#89969F"
                      points="87 273 87 267 90 270"
                    />
                  </g>
                </g>

                <g id="arrows/arrow-1.2-copy5" transform="rotate(90 -25 300)">
                  <g id="arrow-1.2">
                    <path
                      id="Line"
                      stroke="#89969F"
                      strokeLinecap="square"
                      d="M.336 2.5h38.46"
                    />
                    <polygon
                      id="Triangle"
                      fill="#89969F"
                      points="37 5 37 0 40 2.5"
                    />
                  </g>
                </g>
                <g id="arrows/arrow-1.2-copy6" transform="rotate(90 -159 166)">
                  <g id="arrow-1.2">
                    <path
                      id="Line"
                      stroke="#89969F"
                      strokeLinecap="square"
                      d="M.336 2.5h38.46"
                    />
                    <polygon
                      id="Triangle"
                      fill="#89969F"
                      points="37 5 37 0 40 2.5"
                    />
                  </g>
                </g>

                <g id="arrow-2" transform="translate(3 435)">
                  <path
                    id="Path-2"
                    stroke="#89969F"
                    d="M0 0v73.009C0 78.527 4.485 83 9.992 83H70"
                  />
                  <polygon
                    id="Triangle-2"
                    fill="#89969F"
                    points="70 86 70 80 73 83"
                  />
                </g>
                <g id="arrow-2-copy" transform="matrix(-1 0 0 1 271 435)">
                  <path
                    id="Path-2"
                    stroke="#89969F"
                    d="M0 0v73.009C0 78.527 4.485 83 9.992 83H70"
                  />
                  <polygon
                    id="Triangle-2"
                    fill="#89969F"
                    points="70 86 70 80 73 83"
                  />
                </g>
              </g>
              <g
                id="ep-content"
                className="ep-svg-block"
                transform="translate(60 600)"
              >
                <rect
                  id="Rectangle"
                  width="500"
                  height="40"
                  fill="#8BE5AD"
                  rx="20"
                />
                <text
                  id="Content"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="40" y="25">
                    Payment Claim and Certificate Issued to Principal
                  </tspan>
                </text>
              </g>
              <g
                id="ep-form"
                className="ep-svg-block"
                transform="translate(130 684)"
              >
                <rect
                  id="Rectangle"
                  width="360"
                  height="40"
                  fill="#8BE5AD"
                  rx="20"
                />
                <text
                  id="Content"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="29.964" y="25">
                    Save Payment Certificate state in DB
                  </tspan>
                </text>
              </g>
              <g
                id="ep-media"
                className="ep-svg-block"
                transform="translate(225 768)"
              >
                <rect
                  id="Rectangle"
                  width="155"
                  height="40"
                  fill="#8BE5AD"
                  rx="20"
                />
                <text
                  id="Content"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="15" y="25">
                    Payment choice
                  </tspan>
                </text>
              </g>
              <g
                id="ep-unity"
                className="ep-svg-block"
                transform="translate(250 1145)"
              >
                <rect
                  id="Rectangle"
                  width="100"
                  height="30"
                  fill="#8BE5AD"
                  rx="20"
                />
                <text
                  id="Content"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="33" y="21">
                    End
                  </tspan>
                </text>
              </g>
              <g
                id="ep-elements"
                className="ep-svg-block"
                transform="translate(86 903)"
              >
                <rect
                  id="Rectangle"
                  width="155"
                  height="64"
                  fill="#8BE5AD"
                  rx="37"
                />
                <text
                  id="Elements-of-Design"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="38" y="28">
                    Payment
                  </tspan>
                  <tspan x="35" y="50">
                    Withheld
                  </tspan>
                </text>
              </g>
              <g
                id="ep-principles"
                className="ep-svg-block"
                transform="translate(355 903)"
              >
                <rect
                  id="Rectangle"
                  dashed="true"
                  width="155"
                  height="64"
                  fill="#8BE5AD"
                  rx="37"
                />
                <text
                  id="Principles-of-Organi"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="40" y="28">
                    Executes
                  </tspan>
                  <tspan x="40" y="50">
                    payment
                  </tspan>
                </text>
              </g>
              <g
                id="ep-elements"
                className="ep-svg-block"
                transform="translate(70 1010)"
              >
                <rect
                  id="Rectangle"
                  width="200"
                  height="64"
                  fill="#8BE5AD"
                  rx="37"
                />
                <text
                  id="Elements-of-Design"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="50" y="28">
                    Go to Direct
                  </tspan>
                  <tspan x="25" y="50">
                    Payment Workflow
                  </tspan>
                </text>
              </g>
              <g
                id="ep-principles"
                className="ep-svg-block"
                transform="translate(328 1010)"
              >
                <rect
                  id="Rectangle"
                  dashed="true"
                  width="200"
                  height="64"
                  fill="#8BE5AD"
                  rx="37"
                />
                <text
                  id="Principles-of-Organi"
                  fill="#586075"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  letterSpacing="1"
                >
                  <tspan x="27" y="28">
                    Place for Payment
                  </tspan>
                  <tspan x="27" y="50">
                    Place of Business
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        </svg>
      </Layout>
    </>
  );
};

export default ExecutionDetail;
