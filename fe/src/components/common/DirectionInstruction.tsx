"use client";

import React, { Fragment } from "react";
import { SingleContentWrapper } from "./SingleContentWrapper";
import { Table } from "./Table";
import { useDirectionStore } from "@/stores/DirectionStore";

const DirectionInstruction = ({ className }: { className?: string }) => {
  const { response } = useDirectionStore();

  return (
    response && (
      <SingleContentWrapper className={className}>
        <header className="text-center text-lg py-4 mb-4 border-b leading-loose" >
          <h2>Directions</h2>
          <Table>
            <thead>
              <tr>
                <th>Distance (m)</th>
                <th>Step</th>
              </tr>
            </thead>
            <tbody className="font-normal text-lg text-left">
              {response?.routes?.[0]?.legs.map((leg, legIndex) => (
                <Fragment key={legIndex}>
                  <tr>
                    <td className="text-center">0</td>
                    <td>
                      {`point ${String.fromCharCode(65 + legIndex).toUpperCase()}`} &rarr; Point {String.fromCharCode(65 + legIndex + 1).toUpperCase()}{" "}
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
