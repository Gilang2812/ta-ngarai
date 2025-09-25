"use client";

import React, { Fragment, useEffect } from "react";
import { SingleContentWrapper } from "./SingleContentWrapper";
import { Table } from "./Table";
import { useDirectionStore } from "@/stores/DirectionStore";

const DirectionInstruction = ({ className }: { className?: string }) => {
  const { response } = useDirectionStore();
  useEffect(() => {
    console.log(response);
  }, [response]);
  return (
    response && (
      <SingleContentWrapper className={className}>
        <header className="text-center text-lg py-4 mb-4 border-b">
          <h2>Directions</h2>
          <Table>
            <thead>
              <tr>
                <th>Distance (m)</th>
                <th>Step</th>
              </tr>
            </thead>
            <tbody className="font-normal text-sm text-left">
              {response?.routes?.[0]?.legs.map((leg, legIndex) => (
                <Fragment key={legIndex}>
                  <tr>
                    <td className="text-center">0</td>
                    <td>
                      {`point ${legIndex }`} &rarr; Point {legIndex + 1}{" "}
                      &mdash;&nbsp;
                      {leg?.distance?.text}
                    </td>
                  </tr>
                  {leg.steps.map((step, index) => (
                    <tr key={index}>
                      <td className="text-center">{step?.distance?.text}</td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: step.instructions,
                        }}
                      ></td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </Table>
        </header>
      </SingleContentWrapper>
    )
  );
};

export default DirectionInstruction;
